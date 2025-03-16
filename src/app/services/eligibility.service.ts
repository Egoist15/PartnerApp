import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EligibilityService {
  private baseUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  checkEligibility(payload: any, productId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${productId}/partnerapp/aboutyou`, payload, {  
      headers: { 'Content-Type': 'application/json' }
    });
  }

  submitAddress(addressData: any, productId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${productId}/partnerapp/address`, addressData);
  }
}
