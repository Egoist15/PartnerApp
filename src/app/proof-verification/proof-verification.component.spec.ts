import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProofVerificationComponent } from './proof-verification.component';

describe('ProofVerificationComponent', () => {
  let component: ProofVerificationComponent;
  let fixture: ComponentFixture<ProofVerificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProofVerificationComponent]
    });
    fixture = TestBed.createComponent(ProofVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
