import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { TermsConditionsPageComponent } from './terms-conditions-page/terms-conditions-page.component';
import { PrivacyPolicyPageComponent } from './privacy-policy-page/privacy-policy-page.component';
import { CoursePageComponent } from './courses-page/courses-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent }, 
  { path: 'dashboard', component: DashboardPageComponent },
   { path: 'about', component: AboutPageComponent },   // Route for the about page
  { path: 'contact', component: ContactPageComponent },
  { path: 'terms', component: TermsConditionsPageComponent }, // Terms and Conditions
  { path: 'privacy', component: PrivacyPolicyPageComponent },
  { path: 'courses', component: CoursePageComponent },
  { path: '**', redirectTo: '/login' },
  // { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
