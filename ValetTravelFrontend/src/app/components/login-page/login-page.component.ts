import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {HttpClientModule} from "@angular/common/http";
import {User} from "../../models/User";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [UserService],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  username: string = ""
  password: string = ""
  constructor(private userService: UserService) {
  }

  login(){
    let user: User = new User()
    user.username = this.username
    user.password = this.password
    this.userService.login(user).subscribe((user: User)  => {
      console.log(user)
      sessionStorage.setItem('username', JSON.stringify(user.username))
      sessionStorage.setItem('user_type', JSON.stringify(user.user_type))
      location.href='/destinations-page'
    }, error => {alert("Invalid credentials")})
  }

}
