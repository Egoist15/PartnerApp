
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutYouComponent } from './about-you/about-you.component';
import { AddressComponent } from './address/address.component';
import { ProofVerificationComponent } from './proof-verification/proof-verification.component';

const routes: Routes = [
  { path: '', redirectTo: '/personal-loan/about-you', pathMatch: 'full' },
  { path: ':productId/about-you', component: AboutYouComponent },
  { path: ':productId/address', component: AddressComponent },
  { path: ':productId/proof-verification', component: ProofVerificationComponent },
  { path: '**', redirectTo: '/personal-loan/proof-verification' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
