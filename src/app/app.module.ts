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
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {DropdownModule, SharedModule} from '@coreui/angular';
import { AlertModule } from '@coreui/angular';
import { MatIconModule } from '@angular/material/icon'


import { ApplicationInfoComponent } from './application-info/application-info.component';
import { AuthorizationPageComponent } from './authorization-page/authorization-page.component';
import { AddApplicationComponent } from './add-application/add-application.component';
import { ListApplicationComponent } from './list-application/list-application.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { UserCreatedEventsComponent } from './user-created-events/user-created-events.component';
import { UserPartEventsComponent } from './user-part-events/user-part-events.component';
import { EditApplicationComponent } from './edit-application/edit-application.component';

@NgModule({
  declarations: [
    AppComponent,
    ApplicationInfoComponent,
    AuthorizationPageComponent,
    AddApplicationComponent,
    ListApplicationComponent,
    RegistrationPageComponent,
    AppComponent,
    UserCreatedEventsComponent,
    UserPartEventsComponent,
    EditApplicationComponent,
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
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DropdownModule,
    SharedModule,
    AlertModule,
    MatIconModule,
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'ru-ru'},],
  bootstrap: [AppComponent]
})
export class AppModule { }
