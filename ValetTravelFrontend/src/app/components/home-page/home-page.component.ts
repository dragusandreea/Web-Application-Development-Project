import { Component } from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {MatSelectModule} from "@angular/material/select";
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatSelectModule,
  ],
  providers: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
location: string = ''

  constructor(private router: Router, private fb: FormBuilder) {
  }
  search_by_location() {
    this.router.navigate(['/destinations-page'], {queryParams: {search: this.location}});
   }
}
