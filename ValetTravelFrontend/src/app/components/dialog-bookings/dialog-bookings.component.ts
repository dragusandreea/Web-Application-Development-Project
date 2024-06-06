import {Component, Inject, OnInit} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {HttpClientModule} from "@angular/common/http";
import {BookingService} from "../../services/booking.service";
import {Booking} from "../../models/Booking";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-bookings',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    HttpClientModule
  ],
  providers:[BookingService],
  templateUrl: './dialog-bookings.component.html',
  styleUrl: './dialog-bookings.component.css'
})
export class DialogBookingsComponent implements OnInit{
  displayedColumns: string[] = ['id', 'destination_id', 'user_id', 'date_start', 'date_end', 'date_booking', 'total_cost'];
  bookings: Booking[] = []
  dataSource: Booking[] = [];

  constructor(private bookingService: BookingService,  @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.bookingService.getByDestinationId(this.data.id).subscribe((bookings:Booking[]) => {
      let i = 0
      for(let booking of bookings) {
        this.bookings[i] = booking
        i++
      }
      this.dataSource = this.bookings
    })
  }

}
