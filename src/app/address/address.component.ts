import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EligibilityService } from '../services/eligibility.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  addressForm: FormGroup;
  productId: string = 'personal-loan';


  constructor(
    private fb: FormBuilder,
    private eligibilityService: EligibilityService,
    private router: Router,
    private dialog: MatDialog

  ) {
    this.addressForm = this.fb.group({
      productId: [this.productId, Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.addressForm.valid) {
      let addressData = this.addressForm.value;
  
      const requestPayload = {
        productId: addressData.productId,
        street: addressData.street,
        city: addressData.city,
        state: addressData.state,
        zipcode: addressData.zipcode
      };
  
      console.log('Address Payload:', requestPayload); 
  
      this.eligibilityService.submitAddress(requestPayload).subscribe(
        (response) => {
          console.log('Response from backend:', response);
          if (response.status === "200 OK") {
            this.router.navigate([`/${this.productId}/proof-verification`]);
          } else {
            this.showErrorDialog(response.errorDescription || 'Unknown error');          }
        },
        (error) => {
          console.error('Error:', error);
          if (error.status === "400 BAD_REQUEST" && error.error) {
            this.showErrorDialog(error.error.errorDescription);
          } else {
            this.showErrorDialog('Something went wrong. Please try again.');
          }
        }
      );
    } else {
      alert('Please fill all required fields correctly.');
    }
  }
  
  cancelApplication(): void {
    this.addressForm.reset();
  }


  showErrorDialog(message: string): void {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '900px',
      height: '500px',
      data: { message: "The address is outside the U.S." }
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'cancel' || result === 'retry') {
        this.resetForm();
      }
    });
  }

  resetForm(): void {
    this.addressForm.reset();
  
    this.addressForm.setValue({
      productId: this.productId,
      street: '',
      city: '',
      state: '',
      zipcode: ''
    });
  
    this.addressForm.markAsPristine();
    this.addressForm.markAsUntouched();
  }  

}
