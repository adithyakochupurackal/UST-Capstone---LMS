import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

interface Course {
  courseId: number;
  name: string;
  description: string;
  category: string;
  rating: number;
  isEnrolled: boolean;
}

interface CourseFeedback {
  courseFeedback: string;
  courseId: number;
  name: string;
  courseRating: number;
}

export interface Student {
  studentName: string;
  studentEmail: string;
  studentPassword: string;
}

interface Enrollment {
  enrollmentId: number;
  studentId: number;
  courseId: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private getallurlcourse = 'http://localhost:8081/course/getAll';
  private enrollurl = 'http://localhost:8081/enrollment/enroll';
  private enrollstudentUrl = 'http://localhost:8081/enrollment/student';
  private feedbackUrl = 'http://localhost:8081/feedback/addFeedback';
  private assignmentUrl = 'http://localhost:8081/assignment/submit';
  private coursefeedbackUrl = 'http://localhost:8081/feedbackcourses/addFeedback';
  private registerurl = 'http://localhost:8081/api/addStudent';
  private loginurl = 'http://localhost:8081/api/token';

  constructor(private http: HttpClient, private router: Router) {}

  token: string = '';
  private getHeaders() {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
  }

  getAllCourses(): Observable<Course[]> {
    const headers = this.getHeaders();
    return this.http.get<Course[]>(this.getallurlcourse, { headers });
  }

  enrollStudent(studentId: number, courseId: number): Observable<any> {
    const headers = this.getHeaders();
    const enrollmentData = { "studentId": studentId, "courseId": courseId };
    return this.http.post<any>(this.enrollurl, enrollmentData, { headers });
  }

  getEnrolledCourses(studentId: number): Observable<Enrollment[]> {

    const headers = this.getHeaders();

    // Corrected string interpolation with backticks
    return this.http.get<Enrollment[]>(`${this.enrollstudentUrl}/${localStorage.getItem("studentId")}`, { headers });
  }

  submitFeedback(f: { name: string, feedbackDescription: string }): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(this.feedbackUrl, f, { headers });
  }

  submitAssignment(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('enrollmentID', '1');  // You can replace '1' with dynamic data
    const headers = new HttpHeaders();
    return this.http.post(this.assignmentUrl, formData, { headers, responseType: 'text' });
  }

  submitCourseFeedback(f: {
    courseFeedback: string, courseId: number, courseName: string, courseRating: number
  }): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(this.coursefeedbackUrl, f, { headers });
  }

  register(student: { studentName: string, studentEmail: string, studentPassword: string }): Observable<any> {
    return this.http.post(this.registerurl, student);
  }

  login(s: { studentEmail: string, studentPassword: string }): Observable<any> {
    return this.http.post<any>(this.loginurl, s);
  }

  saveToken(token: string): void {
    localStorage.setItem("JWTtoken", token);
    this.token = token;
  }

  getToken(): string | null {
    return localStorage.getItem("JWTtoken");
  }

  logout(): void {
    localStorage.removeItem("JWTtoken");
    localStorage.clear();
    sessionStorage.clear();
    this.token = '';
    console.log("User logged out and all data cleared.");
    alert("Logout is Successful!");
    this.router.navigate(['/login']);
  }
  saveStudentId(studentId:string): void{
    localStorage.setItem("studentId",studentId);
  }
}
