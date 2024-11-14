import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  credentials = {
    studentEmail: "",
    studentPassword: ""
  };

  constructor(private router: Router, private apiService: ApiService) {}

  onLogin() {
    this.apiService.login(this.credentials).subscribe({
      next: (response: {token:string,studentId:number}) => {
        // Successfully logged in
        console.log("User successfully logged in");

        // Save the JWT token to localStorage via the ApiService
        this.apiService.saveToken(response.token);
        this.apiService.saveStudentId(response.studentId.toLocaleString());

        // Redirect to the dashboard page
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        // Handle failed login attempt
        console.log("Login NOT successful");
        console.error(error);

        // Show an alert to the user about incorrect credentials
        alert("Incorrect Credentials");

      // Set a timeout to show the second alert after 1.4 seconds (1400 milliseconds)
      setTimeout(() => {
        alert("Try again");
      }, 400);
        // Clear the credentials to reset the input fields
        this.credentials = {
          studentEmail: "",
          studentPassword: ""
        };
      }
    });
  }
}
