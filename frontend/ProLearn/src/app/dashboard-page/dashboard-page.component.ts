import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from '../api.service';
import { timeout, catchError } from 'rxjs';
import { throwError } from 'rxjs';
interface Course 
{
  courseId:number;
  name: string;
  description: string;
  category: string;
  rating: number;
  isEnrolled:boolean
}
interface Enrollment
{
  enrollmentId:number;
  studentId:number;
  courseId:number;
}
interface Assignment 
{
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  status: string;
}
interface EnrolledCourse 
{
  name: string;
  description: string;
  status: string;
  progress: number;
  showFeedback?: boolean;
  feedbackText?: string;
}
interface Feedback
{
  name:string;
  feedbackDescription:string;
}
@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit{
constructor(private ApiService:ApiService){}
  studentId:any;
  course:any;
  currentView: string = 'courses';
  searchTerm: string = '';
  selectedCategory: string = '';
  selectedRating: string = '';
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  uniqueCategories: string[] = [];
  enrolledCourses:Course[]=[];

  ngOnInit(): void {
    this.loadCourses();
    this.getEnrolledCourses();
    this.studentId = this.ApiService.getStudentId();
}

loadCourses(): void {
    // Check if courses are already in local storage
    const storedCourses = localStorage.getItem('courses');
    
    if (storedCourses) {
        // Load from local storage if available
        this.courses = JSON.parse(storedCourses);
        this.filteredCourses = this.courses;
        this.enrolledCourses = this.courses.filter(course => course.isEnrolled);
        this.uniqueCategories = this.getUniqueCategories(this.courses);
    } else {
        // Otherwise, fetch from API
        this.ApiService.getAllCourses().subscribe({
            next: (courses) => {
                this.courses = courses;

                // Store courses in local storage
                localStorage.setItem('courses', JSON.stringify(courses));

                // Set filtered and enrolled courses
                this.filteredCourses = this.courses;
                this.enrolledCourses = this.courses.filter(course => course.isEnrolled);
                this.uniqueCategories = this.getUniqueCategories(this.courses);
            },
            error: (err) => {
                console.error('Error fetching courses: ', err);
            }
        });
    }
}

// ngDoCheck(): void {
//   this.getEnrolledCourses();
// }
 
  getUniqueCategories(filteredCourses: Course[]): string[] {
    return Array.from(new Set(this.courses.map(course => course.category)));
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
    this.filteredCourses = this.courses;
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

  // onFileSelected(event: Event, assignment: Assignment): void {
  //   const fileInput = event.target as HTMLInputElement;
  //   if (fileInput && fileInput.files && fileInput.files.length > 0) {
  //     const file = fileInput.files[0];
  //     console.log(`File selected for assignment ${assignment.title}: ${file.name}`);
  //   }
  // }

  enroll(courseId: number): void {
    this.ApiService.enrollStudent(this.studentId, courseId).subscribe(
        response => {
            console.log('Enrolled successfully:', response);

            // Find the course to enroll in
            let courseToEnroll = this.courses.find(course => course.courseId === courseId);
            
            if (courseToEnroll) {
                console.log(courseToEnroll);

                // Check if the course is already in enrolledCourses
                if (!this.isEnrolled(courseToEnroll.courseId)) {
                    // Add the course to the enrolledCourses array
                    this.enrolledCourses.push(courseToEnroll);
                    alert(`You have been successfully enrolled in: ${courseToEnroll.name}`);
                } else {
                    alert('You are already enrolled in this course.');
                }
            }

            console.log(this.enrolledCourses);
        },
        error => {
            console.error('Error enrolling:', error);
            alert('Error: Unable to enroll. Please try again later.');
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

  
  
  // getEnrolledCourses(): void 
  // {
  //   this.ApiService.getEnrolledCourses(this.studentId).subscribe({
  //       next: (enrollments: Enrollment[]) => {
  //           this.enrolledCourses = enrollments.map((enrollment) => ({
  //               courseId: enrollment.courseId,
  //               name: `Course Name ${enrollment.courseId}`,
  //               description: `Description for course ${enrollment.courseId}`,
  //               category: 'Category for course',
  //               rating: 4,
  //               isEnrolled: true
  //           }));
  //       },
  //       error: (err) => {
  //           console.error('Error fetching enrolled courses: ', err);
  //       }
  //   });
  //   }
 
  
  // 
  getEnrolledCourses(): void {
    const TIMEOUT_DURATION = 100; // Timeout in milliseconds (10 seconds)
  
    this.ApiService.getEnrolledCourses(this.studentId).subscribe({
      next: (enrollments: Enrollment[]) => {
        const storedCourses = localStorage.getItem('courses');
  
        if (storedCourses) {
          const courses: Course[] = JSON.parse(storedCourses);  // Define courses type as Course[]
  
          // Map enrolled courses with detailed information
          this.enrolledCourses = enrollments.map((enrollment) => {
            // Find the course in the stored courses using courseId
            const courseDetails = courses.find((course: Course) => course.courseId === enrollment.courseId);  // Specify type for 'course'
  
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
    console.log("you assignment got submitted successfully",this.file)
    if (this.file) {
      this.ApiService.submitAssignment(this.file)
        .subscribe(
          (response)=> 
          {
            this.success=true;
            this.message='Assignment submitted successfully!';
            console.log("you assignment got submitted successfully",this.file)
          },
          (error)=> 
          {
            this.success=false;
            this.message='Error submitting assignment: ' + error.error.message;
          }
        );
    } else {
      this.success=false;
      this.message='Please fill in all the fields.';
    }
  }

  feedback = {
    name: '',
    feedbackDescription: ''
  };
  
  submitFeedbackForm(): void {
    console.log('Feedback submitted:', this.feedback);
    
    // Call the API to submit the feedback
    this.ApiService.submitFeedback(this.feedback).subscribe(
      (response) => {
        // On successful submission, log the response
        console.log("Your feedback is successfully added", response);
  
        // Show an alert to the user indicating successful feedback submission
        alert('Thank you! Your feedback has been submitted successfully.');
  
        // Clear the form by resetting the feedback object after the alert
        this.feedback = {
          name: '',
          feedbackDescription: ''
        };
  
      },
      (error) => {
        // Log any errors during submission
        console.log("There is an error while adding your feedback", error);
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

  submitFeedbackCourses() {
    // Handle the feedback submission logic here
    console.log('Feedback submitted for', this.selectedCourse.name);
    console.log('Rating:', this.feedbackCourses.rating);
    console.log('Feedback:', this.feedbackCourses.feedbackText);

    // Close the form after submission
    this.closeFeedbackForm();
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
}
