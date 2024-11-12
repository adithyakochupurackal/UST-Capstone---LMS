import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { FormsModule } from '@angular/forms';
import { AboutPageComponent } from './about-page/about-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { PrivacyPolicyPageComponent } from './privacy-policy-page/privacy-policy-page.component';
import { TermsConditionsPageComponent } from './terms-conditions-page/terms-conditions-page.component';
import { CoursePageComponent } from './courses-page/courses-page.component';
import { AfterLoginHeaderComponent } from './after-login-header/after-login-header.component';

import { NgChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { ChatbotComponent } from './chatbot/chatbot.component';




NgChartsModule
@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    HeaderComponent,
    FooterComponent,
    DashboardPageComponent,
    AboutPageComponent,
    ContactPageComponent,
    PrivacyPolicyPageComponent,
    TermsConditionsPageComponent,
    CoursePageComponent,
    AfterLoginHeaderComponent,
    BarChartComponent,
    ChatbotComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgChartsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
