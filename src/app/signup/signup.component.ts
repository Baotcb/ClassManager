import { Component,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class SignupComponent {
  router = inject(Router);
  httpClient = inject(HttpClient)
  isSlide = false;
  isDark = false;
  message:string = '';
  IsValidEmail:boolean = true;
  IsValidPhoneNumber:boolean = true;

User={
  userId: 0,
  Name:'',
  Email:'',
  Password:'',
  PhoneNumber:'',
  Role:3
}


  onSignUp() {
    this.isSlide = true;
    if (!this.isDark) {
      this.isDark = true;
    }
  }

  onSignIn() {
    this.isSlide = false;
    if (this.isDark) {
      this.isDark = false;
    }
  }
  checkEmail():void {
    const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail.com$/;
    this.IsValidEmail = gmailPattern.test(this.User.Email);
  }

  checkPhoneNumber():void {
    const phoneNumberPattern = /^[0-9]{10}$/;
    this.IsValidPhoneNumber = phoneNumberPattern.test(this.User.PhoneNumber);
  }
  SummitLogin():void {
    this.checkEmail();
    if (!this.IsValidEmail) {
    console.log('Form submitted', this.User);
    let apiUrl:string = 'https://localhost:7042/api/User/CheckLogin';
    
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'my-auth-token',
        'Content-Type': "application/json"
      })
    }

    this.httpClient.post<IUser>(apiUrl, this.User, httpOptions).subscribe({
      next: (response: IUser) => {
        if (response && response.userId) {
        
          const userForStorage = { ...response };
          delete userForStorage.password;
          delete userForStorage.email;
          delete userForStorage.phoneNumber;
          
          
          
          try {
            sessionStorage.setItem('currentUser', JSON.stringify(userForStorage));
            sessionStorage.setItem('userId', userForStorage.userId.toString());
            sessionStorage.setItem('role', userForStorage.role.toString());
            sessionStorage.setItem('name', userForStorage.name);
            console.log('Login success:', userForStorage);
            this.router.navigate(['/home']);
          } catch (error) {
            console.error('Session storage error:', error);
          }
        }
      },
      error: (error) => {
        console.error('Login error:', error);
        this.message = 'Login failed';
      }
    });
  }
  else{
    this.message = 'Invalid Email';
  }
  }

  SummitSignUp():void {
    this.checkEmail();
    this.checkPhoneNumber();
    if (this.IsValidEmail && this.IsValidPhoneNumber) {
      console.log('Form submitted', this.User);
    let apiUrl:string = 'https://localhost:7042/api/User/SignUp';
    
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'my-auth-token',
        'Content-Type': "application/json"
      })
    }

    this.httpClient.post<IUser>(apiUrl, this.User, httpOptions).subscribe({
      next: (response: IUser) => {
        if (response && response.role!==1) {
         
          response.password = '';
          response.email = '';
          response.phoneNumber = '';
          console.log('Login success:', response);
          this.router.navigate(['/home']);
        } else {
          this.message = 'Invalid User';
        }
      },
      error: (error) => {
        this.message = 'Login failed';
        console.error('Login error:', error);
      }
    });
    }
    else{
      this.message = 'Invalid Email or Phone Number';
    }
  }





}
export interface IUser {
  userId: number;
  name: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
  role: number;
}