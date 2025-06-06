import { Component, ElementRef, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as bootstrap from 'bootstrap';
export interface User {
  userId: number;
  name: string;
  email: string;
  password: string;
  role: number;
  phoneNumber: string;
}

@Component({
  selector: 'app-profile',
  imports: [CommonModule,FormsModule ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  constructor(private elementRef: ElementRef) {}

  role:number=Number(sessionStorage.getItem('role'));
  userid:number=Number(sessionStorage.getItem('userId'));
  isTeacher:boolean=false;
  http=inject(HttpClient);
  user: User = {
    userId: 0,
    name: '',
    email: '',
    password: '',
    role: 0,
    phoneNumber: ''}
  currentPassword:string='';
  newPassword:string='';
  errorMessage: string='';
  grades: Grade[] = [];
  openEditProfileModal:boolean=false;
  openChangePasswordModal:boolean=false;

  readonly subjects = {
    1: 'Math',
    2: 'Physics',
    3: 'Chemistry',
    4: 'English',
    5: 'Biology',
    6: 'IT',
    7: 'History',
    8: 'Geography',
    9: 'Physical Education',
    10: 'Literature',
    11: 'Philosophy',
    12: 'Sociology',
    13: 'Astrophysics',
    14: 'Environmental Science'
  };


  ngOnInit() {
    this.loadUserProfile();
    if(this.role==2){
      this.isTeacher=true;
    }
    else{
      this.loadGrades();
    }
  

  }
  loadUserProfile(): void {
    this.http.post<User>('https://localhost:7042/api/User/GetUserInformationById', this.userid)
      .subscribe({
        next: (user) => {
          
          console.log('User loaded:', user);
          this.user = user;
          
        },
        error: (error) => {
          console.error('Error loading profile:', error);
          
        }
      });
  }
  openEditProfile(): void {
    this.openEditProfileModal = true;
    
  }
  updateProfile(): void {
    const userToUpdate = {
      UserId: this.userid,
      Name: this.user.name,
      Email: this.user.email,
      Password: this.user.password,
      Role: this.role,
      PhoneNumber: this.user.phoneNumber
    };
  
    this.http.post<User>('https://localhost:7042/api/User/UpdateUserInformation', userToUpdate)
      .subscribe({
        next: (user) => {
          console.log('User updated:', user);
          this.user = user;
          this.loadUserProfile();
          
        
          const modal = this.elementRef.nativeElement.querySelector('#editProfileModal');
          const modalInstance = bootstrap.Modal.getInstance(modal);
          if (modalInstance) {
            modalInstance.hide();
          }
        },
        error: (error) => {
          console.error('Error updating profile:', error);
        }
      });
  }
  openChangePassword(): void {
    this.openChangePasswordModal = true;
  }
  changePassword(): void {
    const userToChangePassword = {
      UserId: this.userid,
      Password: this.currentPassword,
      Role: this.role,  
    };
    this.http.post('https://localhost:7042/api/User/CheckPassword', userToChangePassword)
    .subscribe({
      next: () => {
        const updatePasswordData = {
          UserId: this.userid,
          Password: this.newPassword,
          Role: this.role
        };
        
        this.http.post('https://localhost:7042/api/User/UpdatePassword', updatePasswordData)
          .subscribe({
            next: () => {
              console.log('Password updated successfully');
            
              this.currentPassword = '';
              this.newPassword = '';
              this.errorMessage = '';
              
              
              const modal = this.elementRef.nativeElement.querySelector('#changePasswordModal');
              const modalInstance = bootstrap.Modal.getInstance(modal);
              if (modalInstance) {
                modalInstance.hide();
              }
            },
            error: (error) => {
              console.error('Error updating password:', error);
              this.errorMessage = 'Failed to update password';
            }
          });
      },
      error: (error) => {
        console.error('Error checking password:', error);
        this.errorMessage = 'Current password is incorrect';
      }
    });
}

  loadGrades(): void {
    this.http.post<Grade[]>('https://localhost:7042/api/Class/GetGradeByUserId', this.userid)
      .subscribe({
        next: (grades) => {
          console.log('Grades loaded:', grades);
          this.grades = grades;
        },
        error: (error) => {
          console.error('Error loading grades:', error);
          this.errorMessage = 'Failed to load grades';
        }
      });
  }



  getSubjectName(subjectId: number): string {
    return this.subjects[subjectId as keyof typeof this.subjects] || 'Unknown Subject';
  }
  calculateAverage(): string {
    if (!this.grades || this.grades.length === 0) {
      return 'N/A';
    }
    
    const sum = this.grades.reduce((acc, grade) => acc + grade.score, 0);
    const average = sum / this.grades.length;
    return average.toFixed(1);
  }


}




export interface Grade {
  gradeId: number;
  studentId: number;
  classId: number;
  subjectId: number;
  score: number;
}




