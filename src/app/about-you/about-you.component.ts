import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EligibilityService } from '../services/eligibility.service';
import { format } from 'date-fns';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';


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
    private dialog: MatDialog

  ) {
    this.aboutYouForm = this.fb.group({
      productId: [this.productId, Validators.required],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      suffix: [''],
      dob: ['', Validators.required],
      citizenship: ['', Validators.required],
      ssn: ['', [Validators.required, Validators.pattern(/^\d{3}-\d{2}-\d{4}$/)]]
    });
  }

  ngOnInit(): void {}

  onContinue(): void {
    if (this.aboutYouForm.valid) {
      let formData = this.aboutYouForm.value;
  
      const formattedDob = this.formatDate(formData.dob);
  
      const requestPayload = {
        productId: formData.productId,
        legalFirstName: formData.firstName,
        middleName: formData.middleName || null,
        legalLastName: formData.lastName,
        suffix: formData.suffix || null,
        dateOfBirth: formattedDob,
        citizenship: formData.citizenship,
        socialSecurityNumberOrITIN: formData.ssn.replace(/-/g, '') 
      };
  
      console.log('Final Payload:', requestPayload); 
  
      this.eligibilityService.checkEligibility(requestPayload).subscribe(
        (response) => {
          console.log('Response from backend:', response);
  
          if (response.status === "200 OK") {
            this.router.navigate([`/${this.productId}/address`]);
          } else {
            this.showErrorDialog(response.errorDescription || 'Unknown error');
          }
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
      alert('Please fill all required fields.');
    }
  } 

  formatDate(inputDate: string): string {
    return format(new Date(inputDate), 'yyyy-MM-dd');
  }

  cancelApplication(): void {
    this.aboutYouForm.reset();
  }

  showErrorDialog(message: string): void {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '900px',
      height: '500px',
      data: { message: "The minimum age requirement isn't met." }
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'cancel' || result === 'retry') {
        this.resetForm();
      }
    });
  }

  resetForm(): void {
    this.aboutYouForm.reset(); 
  
    this.aboutYouForm.setValue({
      productId: this.productId,
      firstName: '',
      middleName: '',
      lastName: '',
      suffix: '',
      dob: '',
      citizenship: '',
      ssn: ''
    });
  
    this.aboutYouForm.markAsPristine();
    this.aboutYouForm.markAsUntouched();
  }
}