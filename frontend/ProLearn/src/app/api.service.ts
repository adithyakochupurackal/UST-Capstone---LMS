import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
interface Course
{
  courseId: number;
  name: string;
  description: string;
  category: string;
  rating: number;
  isEnrolled: boolean;
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
  private getallurlcourse='http://localhost:8000/api/getAll';
  private geturlstudent='http://localhost:2255/api/addStudent';
  private enrollurl='http://localhost:8003/enrollment/enroll';
  private enrollstudentUrl='http://localhost:8003/enrollment/student/1';
  private feedbackUrl='http://localhost:8004/feedback/addFeedback';
  private assignmentUrl='http://localhost:8002/assignment/submit';
  constructor(private http: HttpClient){}
  getAllCourses(): Observable<Course[]>
  {
    return this.http.get<Course[]>(this.getallurlcourse);
  }
  registerStudent(student: { studentName: string, studentEmail: string, studentPassword: string }): Observable<any>
  {
    return this.http.post(this.geturlstudent,student);
  }
  enrollStudent(studentId:number, courseId:number): Observable<any>
  {
    console.log(studentId,courseId)
    const enrollmentData={"studentId":studentId,"courseId":courseId};
    return this.http.post<any>(this.enrollurl,enrollmentData);
  }
  getEnrolledCourses(studentId: number): Observable<Enrollment[]> 
  {
    return this.http.get<Enrollment[]>(this.enrollstudentUrl);
  }
  submitFeedback(f:{name:string,feedbackDescription:string}):Observable<any>
  {
    return this.http.post<any>(this.feedbackUrl,f);
  }
  submitAssignment(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('enrollmentID', '1'); 

    const headers = new HttpHeaders();
    return this.http.post(this.assignmentUrl, formData, { headers });
  }
}