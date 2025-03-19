import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EligibilityService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  checkEligibility(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/aboutyou`, payload, {  
      headers: { 'Content-Type': 'application/json' }
    });
  }

  submitAddress(addressData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/address`, addressData);
  }
} 
