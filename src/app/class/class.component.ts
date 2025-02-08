import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-class',
  imports: [CommonModule, FormsModule],
  templateUrl: './class.component.html',
  styleUrl: './class.component.css'
})
export class ClassComponent {
  httpClient = inject(HttpClient)
  classinformation:any;
  role: number = 0;
  classid: number;
  liststudent:StudentDto[] = [];
  appearstudent:StudentDto[] = [];
  selectedSubject: Subject |null =  { subjectId: 1, name: "Math" };
  subjects: Subject[] = [
    { subjectId: 1, name: "Math" },
    { subjectId: 2, name: "Physics" },
    { subjectId: 3, name: "Chemistry" },
    { subjectId: 4, name: "English" },
    { subjectId: 5, name: "Biology" },
    { subjectId: 6, name: "IT" },
    { subjectId: 7, name: "History" },
    { subjectId: 8, name: "Geography" },
    { subjectId: 9, name: "Physical Education" },
    { subjectId: 10, name: "Literature" },
    { subjectId: 11, name: "Philosophy" },
    { subjectId: 12, name: "Sociology" },
    { subjectId: 13, name: "Astrophysics" },
    { subjectId: 14, name: "Environmental Science" }
  ];
constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      console.log(params['classid']); 
    });
    this.classid = this.route.snapshot.params['classid'];
}
filterStudents(subjectId: number): void {
  this.selectedSubject = this.subjects.find(s => s.subjectId === subjectId)||null;
  this.appearstudent = this.getFilteredStudents();
}
getFilteredStudents(): StudentDto[] {
  if (!this.selectedSubject) return this.liststudent;
  return this.liststudent.filter(student => student.subjectId === this.selectedSubject?.subjectId);
}



ngOnInit() {
  this.role = Number(sessionStorage.getItem('role')) || 0;
   let apiUrl:string = 'https://localhost:7042/api/Class/GetClassById/'+this.classid;
  this.httpClient.get(apiUrl).subscribe((res: any) => {
    console.log(res);
    this.classinformation = res;
  });

  if (this.role === 2) {
    apiUrl='https://localhost:7042/api/Class/GetEnrolledStudents/'+this.classid;
    this.httpClient.get(apiUrl).subscribe((res: any) => {
      console.log(res);
      this.liststudent = res;
      this.appearstudent = this.getFilteredStudents();
    });
   
  } 

}

SaveGrade(id:number): void {

  let studentgr: StudentDto | undefined = this.appearstudent.find(s => s.id === id);
  if (!studentgr || studentgr.newGrade === undefined) {
    console.error('Student not found or no grade entered');
    return;
  }
  const gradeRequest: GradeRequest = {
    studentId: studentgr.id,
    classId: this.classid,
    grade: studentgr.newGrade.toString(),
    subjectId: studentgr.subjectId
  };

  let apiUrl: string = 'https://localhost:7042/api/Class/GradeStudent';
  this.httpClient.put(apiUrl, gradeRequest).subscribe({
    next: (response) => {
      console.log('Grade saved successfully:', response);
      
      this.ngOnInit();
    },
    error: (error) => {
      console.error('Error saving grade:', error);
    }
  });
}


}
export interface StudentDto {
  id: number;
  name: string;
  subjectId: number;
  grade: number;
  newGrade?: number;
}

export interface Subject {
  subjectId: number;
  name: string;
}

export interface GradeRequest {
  studentId: number;
  classId: number;
  grade: string;
  subjectId: number;
}