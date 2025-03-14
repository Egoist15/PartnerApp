import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EligibilityService } from '../services/eligibility.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  addressForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private eligibilityService: EligibilityService,
    private router: Router
  ) {
    this.addressForm = this.fb.group({
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
            this.router.navigate(['/proofVerification']);
          } else {
            alert(`Error: ${response.errorDescription || 'Unknown error'}`);
          }
        },
        (error) => {
          console.error('Error:', error);
          
          if (error.error && error.error.status === "400") {
            alert(`Error: ${error.error.errorDescription || 'Invalid Address'}`);
          } else {
            alert('Something went wrong. Please try again.');
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
}
