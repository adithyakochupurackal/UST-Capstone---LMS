import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-tracker',
  templateUrl: './progress-tracker.component.html',
  styleUrls: ['./progress-tracker.component.css']
})
export class ProgressTrackerComponent implements OnInit {
  progress: number = 0;
  hovered: boolean = false;

  // Calculate the circumference of the circle for the stroke-dasharray and stroke-dashoffset


  constructor() { }

  ngOnInit(): void {
    this.updateProgress();
  }

  // Function to update the progress with a random value every 3 seconds
  updateProgress() {
    setInterval(() => {
      this.progress = Math.floor(Math.random() * 101); // Random percentage between 0 and 100
    }, 5000); // Update every 3 seconds
  }

  // Track hover state for showing percentage
  onHover() {
    this.hovered = true;
  }

  onLeave() {
    this.hovered = false;
  }
}
