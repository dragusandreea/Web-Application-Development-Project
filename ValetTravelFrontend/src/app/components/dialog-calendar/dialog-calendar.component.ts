import {Component, Inject, OnInit} from '@angular/core';
import {MatCard} from "@angular/material/card";
import {
  MatCalendar,
  MatCalendarCellClassFunction,
  MatDatepicker,
  MatDatepickerInput
} from "@angular/material/datepicker";
import {provideNativeDateAdapter} from "@angular/material/core";
import {HttpClientModule} from "@angular/common/http";
import {BookingService} from "../../services/booking.service";
import {MatInput} from "@angular/material/input";
import {Booking} from "../../models/Booking";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-dialog-calendar',
  standalone: true,
  imports: [
    MatCard,
    MatCalendar,
    HttpClientModule,
    MatDatepicker,
    MatDatepickerInput,
    MatInput,
    NgIf
  ],
  providers: [provideNativeDateAdapter(), BookingService],
  templateUrl: './dialog-calendar.component.html',
  styleUrl: './dialog-calendar.component.css'
})
export class DialogCalendarComponent implements OnInit {
  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    return '';
  };
  bookings: Booking[] = []

  constructor(private bookingService: BookingService, @Inject(MAT_DIALOG_DATA) public data: any) {
  }
  ngOnInit(): void {
    this.bookingService.getByDestinationId(this.data.id).subscribe((bookings: Booking[]) => {
      let i = 0
      for(let booking of bookings) {
        this.bookings[i] = booking
        i++
      }
    })
    let dateClass2: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
      if (view === 'month') {
        const startOfDayCellDate = new Date(cellDate.setHours(0, 0, 0, 0));

        for (let i = 0; i < this.bookings.length; i++) {
          let bookingDateStart = new Date(this.bookings[i].date_start);
          let bookingDateEnd = new Date(this.bookings[i].date_end);
          bookingDateStart.setHours(0, 0, 0, 0);
          bookingDateEnd.setHours(0, 0, 0, 0);
          if (startOfDayCellDate >= bookingDateStart && startOfDayCellDate <= bookingDateEnd) {
            return 'example-custom-date-class';
          }
        }

      }
      return '';
    };

    this.dateClass = dateClass2
  }

}
