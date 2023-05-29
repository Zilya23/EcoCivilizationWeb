import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListApplicationComponent } from './list-application/list-application.component';
import { ApplicationInfoComponent } from './application-info/application-info.component';
import { AuthorizationPageComponent } from './authorization-page/authorization-page.component'; 
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { AddApplicationComponent } from './add-application/add-application.component';
import { UserCreatedEventsComponent } from './user-created-events/user-created-events.component';
import { UserPartEventsComponent } from './user-part-events/user-part-events.component';
import { EditApplicationComponent } from './edit-application/edit-application.component';

const routes: Routes = [
  { path: '', redirectTo: '/applications', pathMatch: 'full' },
  { path: 'auth', component: AuthorizationPageComponent },
  { path: 'applications', component: ListApplicationComponent},
  { path: 'application/:id', component: ApplicationInfoComponent},
  { path: 'registration', component: RegistrationPageComponent},
  { path: 'add', component: AddApplicationComponent},
  { path: 'yourEvents', component: UserCreatedEventsComponent},
  { path: 'yourPart', component: UserPartEventsComponent},
  { path: 'edit/:id', component: EditApplicationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
