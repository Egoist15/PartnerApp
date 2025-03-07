import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-about-you',
  templateUrl: './about-you.component.html',
  styleUrls: ['./about-you.component.css']
})
export class AboutYouComponent implements OnInit {
  aboutYouForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.aboutYouForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      suffix: [''],
      dob: ['', Validators.required],
      citizenship: ['', Validators.required],
      ssn: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onContinue(): void {
    if (this.aboutYouForm.valid) {
      console.log('Form Submitted', this.aboutYouForm.value);
    }
  }

  cancelApplication(): void {
    this.aboutYouForm.reset();
  }
}