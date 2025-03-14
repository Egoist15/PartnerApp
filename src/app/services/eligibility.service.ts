import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EligibilityService {
  private apiUrl = 'http://localhost:8081/partnerapp/aboutyou';

  constructor(private http: HttpClient) {}

  checkEligibility(payload: any): Observable<any> {
    return this.http.post(this.apiUrl, payload, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  submitAddress(addressData: any): Observable<any> {
    return this.http.post('http://localhost:8081/partnerapp/address', addressData);
  }  
  
}
