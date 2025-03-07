import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutYouComponent } from './about-you/about-you.component';

const routes: Routes = [
  { path: '', redirectTo: '/about-you', pathMatch: 'full' },
  { path: 'about-you', component: AboutYouComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
