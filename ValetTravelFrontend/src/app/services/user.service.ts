import { Injectable } from '@angular/core';
import {User} from "../models/User";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUsersURL: string = "http://127.0.0.1:5000/users";
  baseURL: string = "http://127.0.0.1:5000/auth";

  constructor(private httpClient: HttpClient) { }
  register(user: User): Observable<User> {
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
    return this.httpClient.post<User>(this.baseURL + "/register", user, {headers: header});
  }

  login(user: User): Observable<User | any> {
    let header = new HttpHeaders()
    .set('Content-Type', 'application/json')
    return this.httpClient.post<User>(this.baseURL + "/login", user, {headers: header});
  }

  get_by_username(username: String|null): Observable<User> {
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
    if(username !=null) {
      username = username.slice(1, -1)
    }
    return this.httpClient.get<User>(this.baseUsersURL + "/get_by_username/" + username, {headers: header});
  }
}
