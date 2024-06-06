import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DestinationService} from "../../services/destination.service";
import {HttpClientModule} from "@angular/common/http";
import {Destination} from "../../models/Destination";

@Component({
  selector: 'app-form-dialog',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers:[DestinationService],
  templateUrl: './form-dialog.component.html',
  styleUrl: './form-dialog.component.css'
})
export class FormDialogComponent implements OnInit{
  myForm: any
  id: string = ""
  location: string = ""
  description: string = ""
  price: number = 0
  available_seats: number = 0
  offer_percent: number = 0
  title: string = ""
  constructor(private fb: FormBuilder, private destinationService: DestinationService, public dialogRef: MatDialogRef<FormDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      location: [''],
      description: [''],
      price: [''],
      available_seats: [''],
      offer_percent: ['']
    });
    if(this.data.id == -99) {
      this.title = "Add new destination"
    } else {
      this.title = "Update: " + this.data.location
      this.myForm.patchValue(this.data)
    }
  }

  onSubmit(){
    if(this.data.id != -99) {
      this.id = this.data.id

      let destination = new Destination()
      destination.id = this.data.id
      destination.location = this.myForm.get('location').value;
      destination.description = this.myForm.get('description').value;
      destination.available_seats = this.myForm.get('available_seats').value;
      destination.price = this.myForm.get('price').value;
      destination.offer_percent = this.myForm.get('offer_percent').value;
      console.log(destination)

      this.destinationService.updateDestination(destination).subscribe((updatedDestination: Destination) => {
        console.log(updatedDestination)
      })
    } else {
      let destination = new Destination()
      destination.location = this.myForm.get('location').value;
      destination.description = this.myForm.get('description').value;
      destination.available_seats = this.myForm.get('available_seats').value;
      destination.price = this.myForm.get('price').value;
      destination.offer_percent = this.myForm.get('offer_percent').value;

      this.destinationService.addDestination(destination).subscribe((createdDestination: Destination) => {
        console.log(createdDestination)
      })

    }

    this.dialogRef.close()
  }


}
