import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EligibilityService } from '../services/eligibility.service';
import { format } from 'date-fns';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-about-you',
  templateUrl: './about-you.component.html',
  styleUrls: ['./about-you.component.css']
})
export class AboutYouComponent implements OnInit {
  aboutYouForm: FormGroup;
  productId: string = 'personal-loan';


  constructor(
    private fb: FormBuilder,
    private eligibilityService: EligibilityService,
    private router: Router,
    private route: ActivatedRoute

  ) {
    this.aboutYouForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      suffix: [''],
      dob: ['', Validators.required],
      citizenship: ['', Validators.required],
      ssn: ['', [Validators.required, Validators.pattern(/^\d{3}-\d{2}-\d{4}$/)]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('productId') || 'personal-loan';
   });
  }

  onContinue(): void {
    if (this.aboutYouForm.valid) {
      let formData = this.aboutYouForm.value;
  
      const formattedDob = this.formatDate(formData.dob);
  
      const requestPayload = {
        productId: this.productId,
        legalFirstName: formData.firstName,
        middleName: formData.middleName || null,
        legalLastName: formData.lastName,
        suffix: formData.suffix || null,
        dateOfBirth: formattedDob,
        citizenship: formData.citizenship,
        socialSecurityNumberOrITIN: formData.ssn.replace(/-/g, '') 
      };
  
      console.log('Final Payload:', requestPayload); 
  
      this.eligibilityService.checkEligibility(requestPayload, this.productId).subscribe(
        (response) => {
          console.log('Response from backend:', response);
  
          if (response.status === "200 OK") {
            this.router.navigate([`/${this.productId}/address`]);
          } else {
            alert(`Not eligible: ${response.errorDescription || 'Unknown error'}`);
          }
        },
        (error) => {
          console.error('Error:', error);
          if (error.status === 400 && error.error) {
            alert(`Not eligible: ${error.error.errorDescription}`);
          } else {
            alert('Something went wrong. Please try again.');
          }
        }
      );
    } else {
      alert('Please fill all required fields.');
    }
  } 

  formatDate(inputDate: string): string {
    return format(new Date(inputDate), 'yyyy-MM-dd');
  }

  cancelApplication(): void {
    this.aboutYouForm.reset();
  }
}