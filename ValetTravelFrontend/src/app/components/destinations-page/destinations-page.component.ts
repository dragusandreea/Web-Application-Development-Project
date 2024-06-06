import {Component, OnInit} from '@angular/core';
import {DestinationService} from "../../services/destination.service";
import {Destination} from "../../models/Destination";
import {NgFor, NgIf, NgOptimizedImage} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {provideNativeDateAdapter, MatOption} from '@angular/material/core';
import {MatInputModule} from "@angular/material/input";
import {MatSelect} from "@angular/material/select";
import {HttpClientModule} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {FormDialogComponent} from "../form-dialog/form-dialog.component";
import {FormDeleteDialogComponent} from "../form-delete-dialog/form-delete-dialog.component";
import {FallbackSrcDirective} from "../../fallback-src.directive";
import {GeolocationService} from "../../services/geolocation.service";
import {Booking} from "../../models/Booking";
import {BookingService} from "../../services/booking.service";
import {UserService} from "../../services/user.service";
import {User} from "../../models/User";
import {DialogBookingsComponent} from "../dialog-bookings/dialog-bookings.component";
import {DialogCalendarComponent} from "../dialog-calendar/dialog-calendar.component";
import {DialogStatisticsComponent} from "../dialog-statistics/dialog-statistics.component";

@Component({
  selector: 'app-destinations-page',
  standalone: true,
  providers: [provideNativeDateAdapter(), DestinationService, FormDialogComponent, BookingService, UserService],
  imports: [NgFor, NgIf, MatFormFieldModule, MatInputModule, MatDatepickerModule, ReactiveFormsModule, FormsModule, MatOption, MatSelect, HttpClientModule, ReactiveFormsModule, MatDialogModule, NgOptimizedImage, FallbackSrcDirective],
  templateUrl: './destinations-page.component.html',
  styleUrl: './destinations-page.component.css'
})
export class DestinationsPageComponent implements OnInit {
  destinations: Destination[] = []
  bookings: Booking[] = []
  destinationsOffers: Destination[] = []
  destinationsByLocation: Destination[] = []
  startDate: Date | undefined
  endDate: Date | undefined
  location: string = ''
  user_type: string = ""
  todayDate: Date = new Date()
  constructor(private destinationService: DestinationService, private fb: FormBuilder, private route: ActivatedRoute,
              public dialog: MatDialog, private geolocationService: GeolocationService, private bookingService: BookingService,
              private userService: UserService) {

  }

  ngOnInit(): void {
    const value = sessionStorage.getItem('user_type');
    if (value) {
       this.user_type = JSON.parse(value);
    }

    this.destinationService.getAllDestinations().subscribe((destinations: Destination[]) => {
      let i = 0
      for(let destination of destinations) {
        this.destinations[i] = destination
        i++
      }
      this.destinationsOffers = this.destinations.filter(destination => destination.offer_percent > 0);
    })


    this.bookingService.getAllBookings().subscribe((bookings: Booking[]) => {
      let i = 0
      for(let booking of bookings) {
        this.bookings[i] = booking
        i++
      }
    })

    this.route.queryParams.subscribe(params => {
      this.search_by_location(params['search'])
      this.location = params['search']
      // Use this.searchQuery to filter your destinations
    });

    this.geolocationService.getLocation().then(position => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      console.log(`Latitude: ${lat}, Longitude: ${lng}`)
      localStorage.setItem('latitude', lat.toString());
      localStorage.setItem('longitude', lng.toString());
    })

  }

  openDialog(destination: Destination): void {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '300px',
      panelClass: 'mat-dialog-container',
      data: {
        id: destination.id,
        location: destination.location,
        description: destination.description,
        price: destination.price,
        available_seats: destination.available_seats,
        offer_percent: destination.offer_percent}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.destinations = []
      this.destinationsOffers = []
      this.destinationService.getAllDestinations().subscribe((destinations: Destination[]) => {
        let i = 0
        for(let destination of destinations) {
          this.destinations[i] = destination
          i++
        }
        this.destinationsOffers = this.destinations.filter(destination => destination.offer_percent > 0);
      })
    });
  }

  openDeleteDialog(destination: Destination): void {
    const dialogRef = this.dialog.open(FormDeleteDialogComponent, {
      width: '250px',
      panelClass: 'mat-dialog-container',
      data: {
        id: destination.id,
        location: destination.location,
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.destinations = []
      this.destinationsOffers = []
      this.destinationService.getAllDestinations().subscribe((destinations: Destination[]) => {
        let i = 0
        for(let destination of destinations) {
          this.destinations[i] = destination
          i++
        }
        this.destinationsOffers = this.destinations.filter(destination => destination.offer_percent > 0);
      })
    });
  }


  selectStartDate() {
    this.destinations = this.destinations.filter(destination => {
      const bookingsCount = this.bookings.filter(booking => {
        return booking.destination_id === destination.id &&
          !(this.endDate != undefined && this.endDate < new Date(booking.date_start) ||
            this.startDate != undefined && this.startDate > new Date(booking.date_end));
      }).length;
      return destination.available_seats > bookingsCount;
    });
  }

  selectEndDate() {
    this.destinations = this.destinations.filter(destination => {
      const bookingsCount = this.bookings.filter(booking => {
        return booking.destination_id === destination.id &&
          !(this.endDate != undefined && this.endDate < new Date(booking.date_start) ||
            this.startDate != undefined && this.startDate > new Date(booking.date_end));
      }).length;
      return destination.available_seats > bookingsCount;
    });
  }

  selectDestination(value: any) {
    console.log('DESTINATION SELECTED ' + value)
  }

  search_by_location(location_param: string) {
    this.destinationService.getAllDestinations().subscribe((destinations: Destination[]) => {
      let i = 0
      for(let destination of destinations) {
        this.destinations[i] = destination
        i++
      }
      this.destinationsByLocation= this.destinations.filter(destination => destination.location.includes(this.location));
      location.href = "/destinations-page#search-results"
    })

  }

  addNewDestination() {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '300px',
      panelClass: 'mat-dialog-container',
      data: {
        id: -99,
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.destinations = []
      this.destinationsOffers = []
      this.destinationService.getAllDestinations().subscribe((destinations: Destination[]) => {
        let i = 0
        for(let destination of destinations) {
          this.destinations[i] = destination
          i++
        }
        this.destinationsOffers = this.destinations.filter(destination => destination.offer_percent > 0);
      })
    });
  }

  getImgSrc(destination: Destination) {
    if(destination.id!= undefined &&  parseInt(destination.id) <= 6) {
      return 'assets/images/recommended/offers' + destination.id + '.png'
    } else {
      return 'assets/images/recommended/offers-coming-soon.png'
    }
  }

  calculateNightsBetweenDates(startDate: Date, endDate: Date): number {
    const msPerDay = 1000 * 60 * 60 * 24;
    const differenceInMs = endDate.getTime() - startDate.getTime();
    const nights = differenceInMs / msPerDay;
    return Math.floor(nights);
  }


  booking(destination: Destination) {
    let booking: Booking = new Booking()
    booking.destination_id = destination.id
    if(this.startDate != undefined && this.endDate != undefined) {
      const newStartDate = new Date(this.startDate);
      newStartDate.setDate(this.startDate.getDate() + 1);
      booking.date_start = newStartDate.toISOString().substring(0, 10);

      const newEndDate = new Date(this.endDate);
      newEndDate.setDate(this.endDate.getDate() + 1);
      booking.date_end = newEndDate.toISOString().substring(0, 10);
    }
    booking.date_booking = new Date().toISOString().substring(0, 10)
    booking.total_cost = this.calculateNightsBetweenDates(new Date(booking.date_start), new Date(booking.date_end)) * destination.price
    let user: User
    this.userService.get_by_username(sessionStorage.getItem('username')).subscribe((res:any) => {
      user = res
      booking.user_id = user.id
      this.bookingService.addBooking(booking).subscribe((result:any) => {
        console.log(result)
      })
    })
  }

  openBookingDialog(destination: Destination) {
    const dialogRef = this.dialog.open(DialogBookingsComponent, {
      width: '1000px',
      panelClass: 'mat-dialog-container',
      data: {
        id: destination.id,
        location: destination.location}
    });
  }

  openCalendar(destination: Destination) {
    const dialogRef = this.dialog.open(DialogCalendarComponent, {
      width: '300px',
      panelClass: 'mat-dialog-container',
      data: {
        id: destination.id,
        location: destination.location}
    });
  }

  openStatistics(destination: Destination) {
    const dialogRef = this.dialog.open(DialogStatisticsComponent, {
      width: '1500px',
      panelClass: 'mat-dialog-container',
      data: {
        id: destination.id,
        location: destination.location}
    });
  }
}
