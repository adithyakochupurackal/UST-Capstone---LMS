import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
interface Course
{
  courseId: number;
  name: string;
  description: string;
  category: string;
  rating: number;
  isEnrolled: boolean;
}
interface CourseFeedback
{
  courseFeedback:string,
  courseId:number,
  name:string,
  courseRating:number
}
export interface Student
{
  studentName: string;
  studentEmail: string;
  studentPassword: string;
}interface Enrollment
{
  enrollmentId:number,
  studentId:number,
  courseId:number
}
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private getallurlcourse='http://localhost:8081/course/getAll';
  //private geturlstudent='http://localhost:8001/api/addStudent';
  private enrollurl='http://localhost:8081/enrollment/enroll';
  private enrollstudentUrl='http://localhost:8081/enrollment/student/1';
  private feedbackUrl='http://localhost:8081/feedback/addFeedback';
  private assignmentUrl='http://localhost:8081/assignment/submit';
  private coursefeedbackUrl='http://localhost:8081/feedbackcourses/addFeedback';
  private registerurl='http://localhost:8081/api/addStudent';
  private loginurl='http://localhost:8081/api/token';
  constructor(private http: HttpClient,private router: Router){}
 
  token:string=''
  private getHeaders() {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
  }
  getAllCourses(): Observable<Course[]>
  {
    const headers = this.getHeaders();
    //console.log("headers   :",headers)
    //console.log("token   :",this.getToken())
    return this.http.get<Course[]>(this.getallurlcourse,{headers});
  }
  enrollStudent(studentId:number, courseId:number): Observable<any>
  {
    const headers=this.getHeaders();
    console.log(studentId,courseId)
    const enrollmentData={"studentId":studentId,"courseId":courseId};
    return this.http.post<any>(this.enrollurl,enrollmentData,{headers});
  }
  getEnrolledCourses(studentId:number): Observable<Enrollment[]>
  {
    const headers=this.getHeaders();
    return this.http.get<Enrollment[]>(this.enrollstudentUrl);
  }
  submitFeedback(f:{name:string,feedbackDescription:string}):Observable<any>
  {
    const headers=this.getHeaders();
    return this.http.post<any>(this.feedbackUrl,f,{headers});
  }
  submitAssignment(file:File):Observable<any>
  {
    const formData=new FormData();
    formData.append('file',file,file.name);
    formData.append('enrollmentID','1');
    const headers=new HttpHeaders();
    return this.http.post(this.assignmentUrl,formData,{headers,responseType:'text'});
  }
  submitCourseFeedback(f:{
    courseFeedback:string,courseId:number,courseName:String,courseRating:number}):Observable<any>
  {
    const headers=this.getHeaders();
    return this.http.post<any>(this.coursefeedbackUrl,f,{headers});
  }
  register(student:{studentName:string,studentEmail:string,studentPassword:string}):Observable<any>
  {
    return this.http.post(this.registerurl,student)
  }
  login(s:{studentEmail:string,studentPassword:string}):Observable<any>
  {
    console.log("in service api",this.http.post<any>(this.loginurl,s))
    return this.http.post<any>(this.loginurl,s)
  }
  saveToken(token:string)
  {
    localStorage.setItem("JWTtoken",token)
    console.log("Token   :",token);
    this.token=token;
  }
  getToken():String|null
  {
    return localStorage.getItem("JWTtoken");
  }

  logout(): void {
    // Clear the JWT token from localStorage
    localStorage.removeItem("JWTtoken");
  
    // Optional: Clear all items in localStorage (this will remove everything stored in localStorage)
    localStorage.clear();
  
    // Optionally, clear sessionStorage if any data is stored there
    sessionStorage.clear();
  
    // Reset token in the service
    this.token = '';  // Clear the token in the service
  
    // Optionally, reset other state variables or services
    // For example, if you have user-related data in a service, reset them
    // this.userService.clearUserData();  // Reset any user-related data
  
    console.log("User logged out and all data cleared.");
    alert("Logout is Sucessfull!")
  
    // Navigate to the login page
    this.router.navigate(['/login']);
  }
  saveStudentId(studentId: number): void {
    // Save the studentId to localStorage
    localStorage.setItem("StudentId", studentId.toString());  // LocalStorage stores data as strings
    console.log("StudentId:", studentId);  // Log the studentId
  }
  
  getStudentId(): number | null {
    // Retrieve the studentId from localStorage and return as a number
    const studentId = localStorage.getItem("StudentId");
    return studentId ? parseInt(studentId, 10) : null;  // Parse it to number or return null if not found
  }
}  