import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

interface Course {
  courseId: number;
  name: string;
  description: string;
  category: string;
  rating: number;
  isEnrolled: boolean;
}
interface Enrollment {
  enrollmentId: number;
  studentId: number;
  courseId: number;
}
interface Assignment {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  status: string;
}
interface EnrolledCourse {
  name: string;
  description: string;
  status: string;
  progress: number;
  showFeedback?: boolean;
  feedbackText?: string;
}
interface Feedback {
  name: string;
  feedbackDescription: string;
}

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {

  studentId: number = 0; // Declare and initialize studentId
  course: any;
  currentView: string = 'courses';
  searchTerm: string = '';
  selectedCategory: string = '';
  selectedRating: string = '';
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  uniqueCategories: string[] = [];
  enrolledCourses: Course[] = [];

  constructor(private ApiService: ApiService) {}

  ngOnInit(): void {
    this.loadCourses();
    this.getEnrolledCourses();
    this.studentId=this.loadUserId();
    
    // Async call to get studentId
    // this.loadStudentId();
  }
  loadUserId(){
    const studId = localStorage.getItem("studentId");
    return studId ? + studId: 0;

  }
  // async loadStudentId() {
  //   try {
  //     const studentId = await this.ApiService.getStudentId().toPromise();
  //     this.k = studentId !== null ? Number(studentId) : 0; // Default to 0 if null
  //     console.log(this.k); // Logs the studentId (as number or 0).
  //   } catch (error) {
  //     console.error('Error fetching studentId:', error);
  //   }
  // }
  
  

  loadCourses(): void {
    const storedCourses = localStorage.getItem('courses');

    if (storedCourses) {
      this.courses = JSON.parse(storedCourses);
      this.filteredCourses = [...this.courses]; // Clone the courses array
      this.enrolledCourses = this.courses.filter(course => course.isEnrolled);
      this.uniqueCategories = this.getUniqueCategories(this.courses);
    } else {
      this.ApiService.getAllCourses().subscribe({
        next: (courses) => {
          this.courses = courses;
          localStorage.setItem('courses', JSON.stringify(courses));
          this.filteredCourses = [...this.courses];
          this.enrolledCourses = this.courses.filter(course => course.isEnrolled);
          this.uniqueCategories = this.getUniqueCategories(this.courses);
        },
        error: (err) => {
          console.error('Error fetching courses:', err);
        }
      });
    }
  }

  getUniqueCategories(courses: Course[]): string[] {
    return Array.from(new Set(courses.map(course => course.category)));
  }

  filterCourses(): void {
    this.filteredCourses = this.courses.filter(course => {
      const matchesSearch = this.searchTerm
        ? course.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(this.searchTerm.toLowerCase())
        : true;
      const matchesCategory = this.selectedCategory ? course.category === this.selectedCategory : true;
      const matchesRating = this.selectedRating ? course.rating >= +this.selectedRating : true;

      return matchesSearch && matchesCategory && matchesRating;
    });
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.selectedRating = '';
    this.filteredCourses = [...this.courses]; // Reset filters by cloning courses again
  }

  navigateTo(view: string): void {
    this.currentView = view;
  }

  submitAssignment(assignment: Assignment): void {
    console.log(`Submitted assignment: ${assignment.title}`);
  }

  addFeedback(): void {
    console.log('Adding feedback...');
    // Add feedback handling logic here
  }

  searchCourses(): void {
    this.filterCourses();
  }

  enroll(courseId: number): void {
    this.ApiService.enrollStudent(this.studentId, courseId).subscribe(
      response => {
        console.log('Enrolled successfully:', response);
  
        // Find the course to enroll in
        let courseToEnroll = this.courses.find(course => course.courseId === courseId);
        if (courseToEnroll) {
          if (!this.isEnrolled(courseToEnroll.courseId)) {
            this.enrolledCourses.push(courseToEnroll);
            alert(`You have been successfully enrolled in: ${courseToEnroll.name}`);
          } else {
            alert('You are already enrolled in this course.');
          }
        }
      },
      error => {
        // Handle specific error codes
        if (error.status === 500) {
          console.error("Internal Server Error: Something went wrong with the server.");
          alert('There was an issue enrolling you in the course. Please try again later.');
        } else if (error.status === 409) {
          // Handle Conflict error when student is already enrolled
          console.error("Conflict: You are already enrolled in this course.");
          alert('You are already enrolled in this course.');
        } else {
          console.error("An unexpected error occurred: ", error);
          alert('An unexpected error occurred. Please try again later.');
        }
      }
    );
  }
  
  isEnrolled(courseId: number): boolean {
    return this.enrolledCourses.some(course => course.courseId === courseId);
  }

  toggleFeedback(enrolled: EnrolledCourse): void {
    enrolled.showFeedback = !enrolled.showFeedback; // Toggle feedback textbox visibility
  }

  submitFeedback(enrolled: EnrolledCourse): void {
    console.log(`Feedback for ${enrolled.name}:`, enrolled.feedbackText);
    enrolled.feedbackText = '';
    enrolled.showFeedback = false;
  }

  getEnrolledCourses(): void {
    const TIMEOUT_DURATION = 10; // Timeout in milliseconds (10 seconds)

    this.ApiService.getEnrolledCourses(this.studentId).subscribe({
      next: (enrollments: Enrollment[]) => {
        const storedCourses = localStorage.getItem('courses');
        if (storedCourses) {
          const courses: Course[] = JSON.parse(storedCourses);  // Define courses type as Course[]

          this.enrolledCourses = enrollments.map((enrollment) => {
            const courseDetails = courses.find((course: Course) => course.courseId === enrollment.courseId);
            if (courseDetails) {
              return {
                courseId: courseDetails.courseId,
                name: courseDetails.name || `Course Name ${enrollment.courseId}`,
                description: courseDetails.description || `Description for course ${enrollment.courseId}`,
                category: courseDetails.category || 'Category for course',
                rating: courseDetails.rating || 4,
                isEnrolled: true
              };
            } else {
              console.warn(`Course with ID ${enrollment.courseId} not found in local storage.`);
              return {
                courseId: enrollment.courseId,
                name: `Course Name ${enrollment.courseId}`,
                description: `Description for course ${enrollment.courseId}`,
                category: 'Category for course',
                rating: 4,
                isEnrolled: true
              };
            }
          });
        } else {
          console.error('No courses found in local storage.');
        }
      },
      error: (err) => {
        console.error('Error fetching enrolled courses: ', err);
      }
    });
  }

  file: File | null = null;
  message: string = '';
  success: boolean = false;

  onFileSelected(event: any): void {
    this.file = event.target.files[0];
  }

  onSubmitAssignment(): void {
    console.log("Your assignment was submitted successfully", this.file);
    if (this.file) {
      this.ApiService.submitAssignment(this.file).subscribe(
        (response) => {
          this.success = true;
          this.message = 'Assignment submitted successfully!';
          console.log("Your assignment was submitted successfully", this.file);
        },
        (error) => {
          this.success = false;
          this.message = 'Error submitting assignment: ' + error.error.message;
        }
      );
    } else {
      this.success = false;
      this.message = 'Please fill in all the fields.';
    }
  }

  feedback = {
    name: '',
    feedbackDescription: ''
  };

  submitFeedbackForm(): void {
    console.log('Feedback submitted:', this.feedback);

    this.ApiService.submitFeedback(this.feedback).subscribe(
      (response) => {
        console.log("Your feedback is successfully added", response);
        alert('Thank you! Your feedback has been submitted successfully.');
        this.feedback = { name: '', feedbackDescription: '' };
      },
      (error) => {
        console.log("Error while adding your feedback", error);
        alert('Oops! Something went wrong. Please try again later.');
      }
    );
  }

  showFeedbackForm = false;
  selectedCourse: any = null;
  feedbackCourses = { rating: null, feedbackText: '' };

  openFeedbackForm(course: any) {
    this.selectedCourse = course;
    this.showFeedbackForm = true;
  }

  closeFeedbackForm() {
    this.showFeedbackForm = false;
    this.selectedCourse = null;
    this.feedbackCourses = { rating: null, feedbackText: '' };
  }

  randomProgress: number = 0;
  hoveredCourse: any = null;

  showProgress(enrolled: any) {
    this.randomProgress = Math.floor(Math.random() * 100) + 1; // Random percentage from 1 to 100
    this.hoveredCourse = enrolled;
  }

  hideProgress() {
    this.hoveredCourse = null;
  }

  getRandomProgress(enrolled: any) {
    return this.hoveredCourse === enrolled ? `${this.randomProgress}%` : '0%';
  }

  courseFeedback = {
    courseFeedback: '',
    courseId: 0,
    courseName: '',
    courseRating: 0
  };

  submitFeedbackCourses(courseId: number, courseName: string) {
    console.log('Feedback submitted for', this.selectedCourse.name);
    console.log(this.courseFeedback);
    alert('Thank you! Your feedback has been submitted successfully!');
    this.showFeedbackForm = false;
  }

  showRating(course: any) {
    const ratings = [1, 2, 3, 4, 5];
    return ratings.includes(course.rating);
  }
}
