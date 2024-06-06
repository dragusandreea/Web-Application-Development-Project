import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {User} from "../../models/User";
import {HttpClientModule, HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule
  ],
  providers: [HttpClientModule, UserService],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  name: string = ""
  username: string =""
  password: string =""

  emailRegex = new RegExp('^[^@\\s]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,3}$');
  passwordRegex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[!@#$%^&*\.]).{10,}$');

  validUserName:boolean= false;
  validPassword:boolean = false;
  validName:boolean = false;
  constructor(private userService: UserService) {
  }

  register(){
    this.validUserName = this.emailRegex.test(<string>this.username);
    this.validPassword = this.passwordRegex.test(<string>this.password);
    this.validName = this.name != "";

    if(!this.validName) {
      alert("Name cannot be empty");
    }

    if(!this.validUserName) {
      alert("Please use valid email address for username")
    }

    if(!this.validPassword) {
      alert("Invalid Password");
    }

    if(this.validUserName && this.validName && this.validPassword) {
      let user: User = new User();
      user.id = undefined;
      user.name = this.name;
      user.username = this.username;
      user.password = this.password;
      user.user_type = 'client'
      this.userService.register(user).subscribe((user: User) => {
        console.log(user)
        location.href='/login-page'
      }, (error: HttpErrorResponse) => { alert("Could not create account")})

    }
  }

}
