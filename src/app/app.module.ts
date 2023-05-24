import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import {NgxMatIntlTelInputComponent} from 'ngx-mat-intl-tel-input';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

import { ApplicationInfoComponent } from './application-info/application-info.component';
import { AuthorizationPageComponent } from './authorization-page/authorization-page.component';
import { AddApplicationComponent } from './add-application/add-application.component';
import { ListApplicationComponent } from './list-application/list-application.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ApplicationInfoComponent,
    AuthorizationPageComponent,
    AddApplicationComponent,
    ListApplicationComponent,
    RegistrationPageComponent,
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMatIntlTelInputComponent,
    NgxIntlTelInputModule,
    BrowserAnimationsModule,
    NgSelectModule, 
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
