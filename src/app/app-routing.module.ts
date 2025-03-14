import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutYouComponent } from './about-you/about-you.component';
import { AddressComponent } from './address/address.component';
import { ProofVerificationComponent } from './proof-verification/proof-verification.component';

const routes: Routes = [
  { path: '', redirectTo: '/about-you', pathMatch: 'full' },
  { path: 'about-you', component: AboutYouComponent },
  { path: 'address', component: AddressComponent },
  { path: '', redirectTo: '/about-you', pathMatch: 'full' },
  { path: 'proofVerification', component: ProofVerificationComponent },
  { path: '**', redirectTo: 'proofVerification' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
