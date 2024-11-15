import { Component, OnInit } from '@angular/core';
import { Chart, ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  
  // Sample data
  marksData: { [month: string]: number } = {
    'January': this.getRandomMarks(),
    'February': this.getRandomMarks(),
    'March': this.getRandomMarks(),
    'April': this.getRandomMarks(),
    'May': this.getRandomMarks(),
    'June': this.getRandomMarks(),
    'July': this.getRandomMarks(),
    'August': this.getRandomMarks(),
    'September': this.getRandomMarks(),
    'October': this.getRandomMarks(),
    'November': this.getRandomMarks(),
    'December': this.getRandomMarks()
};

// Helper function to generate random marks between 70 and 100
getRandomMarks(): number {
    return Math.floor(Math.random() * (100 - 70 + 1)) + 70;
}


  // Labels and data for the chart
  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        label: 'Marks',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',  // Set color with opacity
        borderColor: 'rgba(75, 192, 192, 1)',         // Border color
        borderWidth: 1
      }
    ]
  };

  // Chart configuration
  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100  // Marks are out of 100
      }
    }
  };

  ngOnInit() {
    // Dynamically set labels and data from marksData
    this.barChartData.labels = Object.keys(this.marksData);
    this.barChartData.datasets[0].data = Object.values(this.marksData);
  }
}
