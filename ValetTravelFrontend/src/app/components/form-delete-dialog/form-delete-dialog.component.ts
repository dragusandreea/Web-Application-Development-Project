import {Component, Inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DestinationService} from "../../services/destination.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Destination} from "../../models/Destination";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-form-delete-dialog',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers:[DestinationService],
  templateUrl: './form-delete-dialog.component.html',
  styleUrl: './form-delete-dialog.component.css'
})
export class FormDeleteDialogComponent {
  id: string = ""
  constructor(private fb: FormBuilder, private destinationService: DestinationService, public dialogRef: MatDialogRef<FormDeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

  }

  proceedDelete(){
    this.id = this.data.id

    this.destinationService.deleteDestinationById(this.id).subscribe((str: Response) => {
      console.log(str)
    })

    this.dialogRef.close()
  }

  abortDelete(){
    this.dialogRef.close()
  }

}
