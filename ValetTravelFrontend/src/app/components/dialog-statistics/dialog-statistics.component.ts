import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {BookingService} from "../../services/booking.service";
import {HttpClientModule} from "@angular/common/http";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Booking} from "../../models/Booking";
import { Chart, registerables } from 'chart.js';
import {CanvasJSAngularChartsModule} from "@canvasjs/angular-charts";
Chart.register(...registerables);

@Component({
  selector: 'app-dialog-statistics',
  standalone: true,
  imports: [HttpClientModule, CanvasJSAngularChartsModule],
  providers:[BookingService],
  templateUrl: './dialog-statistics.component.html',
  styleUrl: './dialog-statistics.component.css'
})
export class DialogStatisticsComponent implements OnInit{
  bookings:Booking[] = []
  location: string = ""
  myDataPoints:{"label": string, "y":number}[] = []
  months = ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  chartOptions = {
    title: {
      text: "Bookings " + this.location
    },
    theme: "light2",
    animationEnabled: false,
    exportEnabled: true,
    axisY: {
      includeZero: true,
      valueFormatString: "#####"
    },
    data: [{
      type: "area", //change type to bar, line, area, pie, etc
      yValueFormatString: "#####",
      color: "#ff7a30",
      dataPoints: this.myDataPoints
    }]
  }
  constructor(private bookingService: BookingService,  @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.location = this.data.location
    let date = new Date()
    this.bookingService.getByDestinationId(this.data.id).subscribe((bookings:Booking[]) => {
      let i = 0
      for(let booking of bookings) {
        this.bookings[i] = booking
        i++
      }

      let statistics = new Array(12).fill(0);

      bookings.forEach(booking => {
        let booking_date = new Date(booking.date_start)
        if(date.getFullYear() == booking_date.getFullYear()) {
          const luna = booking_date.getMonth();
          statistics[luna]++;
        }
      });


      for(let i = 0; i < statistics.length; i++) {
        this.myDataPoints[i] = {"label": this.months[i], "y":statistics[i]}
      }

      let newChart = {
        title: {
          text: "Bookings " + this.location
        },
        theme: "light2",
        animationEnabled: true,
        exportEnabled: true,
        axisY: {
          includeZero: true,
          valueFormatString: "#####"
        },
        data: [{
          type: "area", //change type to bar, line, area, pie, etc
          yValueFormatString: "#####",
          color: "#ff7a30",
          dataPoints: this.myDataPoints
        }]
      }
      this.chartOptions = newChart


    })
  }

}
