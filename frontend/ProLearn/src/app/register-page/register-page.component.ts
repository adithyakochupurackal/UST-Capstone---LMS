import { Component } from '@angular/core';
import { ApiService } from '../api.service';
 
  import { Router } from '@angular/router';
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  user={
    studentName:"",
    studentEmail:"",
    studentPassword:""
  };
  // user:any={}
  constructor(private apiService: ApiService, private router: Router) {}
  // onSubmit() {
  //   console.log('User registered:', this.user);
  //   this.apiService.registerStudent(this.user).subscribe(
  //     (response: any) => {
  //       console.log('Registration successful', response);
  //       this.router.navigate(['/login']);
  //     },
  //     (error: any) => {
  //       console.error('Registration failed', error);
  //     }
  //   );
  // }
  onSubmit() {
    this.apiService.register(this.user).subscribe(
      (response: any) => {
        console.log("User successfully registered", response);
        this.router.navigate(['/login']);
      },
      (error: any) => {
        console.error("User registration failed", error);
        alert("Registration failed. Please try again.");
      }
    );
  }
}