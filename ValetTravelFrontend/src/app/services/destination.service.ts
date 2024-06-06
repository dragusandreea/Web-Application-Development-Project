import {Injectable} from '@angular/core';
import {Destination} from "../models/Destination";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class DestinationService {
  baseURL: string = "http://127.0.0.1:5000/destinations";

  constructor(private httpClient: HttpClient) {
  }

  addDestination(destination: Destination): Observable<Destination> {
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
    return this.httpClient.post<Destination>(this.baseURL + "/create", destination, {headers: header});
  }

  updateDestination(destination: Destination): Observable<Destination> {
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')

    return this.httpClient.put<Destination>(this.baseURL + "/update", destination, {headers: header});
  }

  deleteDestinationById(id: string): Observable<Response> {
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')

    return this.httpClient.delete<Response>(this.baseURL + "/delete/" + id, {headers: header});
  }

  getAllDestinations(): Observable<Destination[]> {
      let header = new HttpHeaders()
        .set('Content-Type', 'application/json')
      return this.httpClient.get<Destination[]>(this.baseURL + "/get_all",{headers: header});
  }
}
