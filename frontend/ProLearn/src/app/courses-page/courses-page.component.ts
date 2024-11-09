// src/app/courses-page/courses-page.component.ts

import { Component, OnInit } from '@angular/core';

interface Course {
  name: string;
  description: string;
  category: string;  // New property for category
  rating: number;    // New property for rating
}

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.css']
})
export class CoursePageComponent implements OnInit {
  course: Course[] = [];

  ngOnInit(): void {
    // Hardcoded course data
    this.course = [
      { name: 'Angular Basics', description: 'Learn the fundamentals of Angular framework.', category: 'Programming', rating: 4.5 },
      { name: 'UI/UX Design Essentials', description: 'Introduction to user interface and user experience design.', category: 'Design', rating: 4.2 },
      { name: 'Digital Marketing 101', description: 'Basics of digital marketing strategies and tools.', category: 'Marketing', rating: 4.8 },
      { name: 'Data Structures in JavaScript', description: 'Explore data structures and algorithms using JavaScript.', category: 'Programming', rating: 4.7 }
    ];
  }

 
}
