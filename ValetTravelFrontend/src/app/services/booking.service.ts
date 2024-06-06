import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Booking} from "../models/Booking";

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  baseURL: string = "http://127.0.0.1:5000/bookings";

  constructor(private httpClient: HttpClient) {
  }

  addBooking(booking: Booking): Observable<Booking> {
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
    return this.httpClient.post<Booking>(this.baseURL + "/create", booking, {headers: header});
  }

  deleteBookingById(id: string): Observable<Response> {
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')

    return this.httpClient.delete<Response>(this.baseURL + "/delete/" + id, {headers: header});
  }

  getAllBookings(): Observable<Booking[]> {
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
    return this.httpClient.get<Booking[]>(this.baseURL + "/get_all", {headers: header});

  }

  getByDestinationId(destinationId: number): Observable<Booking[]> {
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
    return this.httpClient.get<Booking[]>(this.baseURL + "/get_by_destination_id/" + destinationId, {headers: header});
  }
}
