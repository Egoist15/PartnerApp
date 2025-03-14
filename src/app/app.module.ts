import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutYouComponent } from './about-you/about-you.component';
import { HttpClientModule } from '@angular/common/http';
import { AddressComponent } from './address/address.component';
import { ProofVerificationComponent } from './proof-verification/proof-verification.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutYouComponent,
    AddressComponent,
    ProofVerificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
