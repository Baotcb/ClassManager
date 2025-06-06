// home.component.ts
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
})
export class HomeComponent {
  httpClient = inject(HttpClient);
  countweek: number = 0;
  timeSlots: string[] = [];
  daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  scheduleMatrix: (ScheduleDto | null)[][] = [];

  ScheduleViewModel = {
    StudentId: 0,
    WeekStart: new Date(),
    WeekEnd: new Date(),
  };
  Schedule: ScheduleDto[] = [];
  Classes: ClassDto[] = [];

  initializeMatrix() {
    // Extract unique time slots from schedule
    this.timeSlots = [...new Set(this.Schedule.map(item => 
      `${new Date(item.startTime).toLocaleTimeString()} - ${new Date(item.endTime).toLocaleTimeString()}`
    ))].sort();

    // Initialize empty matrix
    this.scheduleMatrix = Array(this.timeSlots.length).fill(null)
      .map(() => Array(this.daysOfWeek.length).fill(null));

    // Fill matrix with schedule items
    this.Schedule.forEach(scheduleItem => {
      const timeSlot = `${new Date(scheduleItem.startTime).toLocaleTimeString()} - ${new Date(scheduleItem.endTime).toLocaleTimeString()}`;
      const timeIndex = this.timeSlots.indexOf(timeSlot);
      const dayIndex = this.daysOfWeek.indexOf(scheduleItem.dayOfWeek);
      
      if (timeIndex !== -1 && dayIndex !== -1) {
        this.scheduleMatrix[timeIndex][dayIndex] = scheduleItem;
      }
    });
  }

  getWeek(): void {
    const current = new Date();
    current.setDate(current.getDate() + (this.countweek * 7));

    this.ScheduleViewModel.WeekStart = new Date(current);
    const dayOfWeek = current.getDay();
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    this.ScheduleViewModel.WeekStart.setDate(current.getDate() + diff);
    
    this.ScheduleViewModel.WeekEnd = new Date(this.ScheduleViewModel.WeekStart);
    this.ScheduleViewModel.WeekEnd.setDate(this.ScheduleViewModel.WeekStart.getDate() + 5);
  
    console.log('Week offset:', this.countweek);
    console.log('Monday:', this.ScheduleViewModel.WeekStart.toISOString().split('T')[0]);
    console.log('Saturday:', this.ScheduleViewModel.WeekEnd.toISOString().split('T')[0]);
    
    if (Number(sessionStorage.getItem('role')) == 3) {
      this.getStudentSchedule();
    } else {
      this.getTeacherSchedule();
    }
  }
 
  nextWeek(): void {
    this.countweek++;
    this.getWeek();
  }
  
  previousWeek(): void {
    this.countweek--;
    this.getWeek();
  }
  
  currentWeek(): void {
    this.countweek = 0;
    this.getWeek();
  }

  ngOnInit() {
    this.ScheduleViewModel.StudentId = Number(sessionStorage.getItem('userId'));
    console.log('StudentId:', this.ScheduleViewModel.StudentId);

    this.currentWeek();
    
    if (Number(sessionStorage.getItem('role')) == 3) {
      this.GetClassesByStudentId();
    } else {
      this.GetClassByTeacherId();
    }
  }

  getStudentSchedule() {
    let apiUrl: string = 'https://localhost:7042/api/Schedule/GetSchedule';
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'my-auth-token',
        'Content-Type': "application/json"
      })
    }
    this.httpClient.post<ScheduleDto[]>(apiUrl, this.ScheduleViewModel, httpOptions).subscribe({
      next: (response: ScheduleDto[]) => {
        if (response) {
          this.Schedule = response;
          this.initializeMatrix();
          console.log('Schedule Matrix:', this.scheduleMatrix);
        }
      },
      error: (error: any) => {
        console.log('Error:', error);
      }
    });
  }

  getTeacherSchedule() {
    let apiUrl: string = 'https://localhost:7042/api/Schedule/GetScheduleTeacher';
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'my-auth-token',
        'Content-Type': "application/json"
      })
    }
    this.httpClient.post<ScheduleDto[]>(apiUrl, this.ScheduleViewModel, httpOptions).subscribe({
      next: (response: ScheduleDto[]) => {
        if (response) {
          this.Schedule = response;
          this.initializeMatrix();
          console.log('Schedule Matrix:', this.scheduleMatrix);
        }
      },
      error: (error: any) => {
        console.log('Error:', error);
      }
    });
  }

  GetClassesByStudentId(): void {
    let apiUrl: string = 'https://localhost:7042/api/Class/GetClassesByStudentId';
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'my-auth-token',
        'Content-Type': "application/json"
      })
    }
    this.httpClient.post<ClassDto[]>(apiUrl, Number(sessionStorage.getItem('userId')), httpOptions).subscribe({
      next: (response: ClassDto[]) => {
        if (response) {
          this.Classes = response;
          console.log('Classes:', this.Classes);
        }
      },
      error: (error: any) => {
        console.log('Error:', error);
      }
    });
  }

  GetClassByTeacherId(): void {
    let apiUrl: string = 'https://localhost:7042/api/Class/GetClassByTeacherId';
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'my-auth-token',
        'Content-Type': "application/json"
      })
    }
    this.httpClient.post<ClassDto[]>(apiUrl, Number(sessionStorage.getItem('userId')), httpOptions).subscribe({
      next: (response: ClassDto[]) => {
        if (response) {
          this.Classes = response;
          console.log('Classes:', this.Classes);
        }
      },
      error: (error: any) => {
        console.log('Error:', error);
      }
    });
  }
}

interface ScheduleDto {
  scheduleDayId: number;
  dayOfWeek: string;
  startTime: Date;
  endTime: Date;
  classId: number;
  className: string;
  subjectName: string;
  teacherName: string;
}

interface ClassDto {
  classId: number;
  name: string;
  beginAt?: Date;
  endAt?: Date;
  teacherName: string;
}