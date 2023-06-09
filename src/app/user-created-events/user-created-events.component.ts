import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ConfigService } from '../config/config.service';

@Component({
  selector: 'app-user-created-events',
  templateUrl: './user-created-events.component.html',
  styleUrls: ['./user-created-events.component.css']
})
export class UserCreatedEventsComponent {
  userApplications:any[] = [];

  constructor(private router: Router, private data: ConfigService) {
    if(localStorage.getItem('AUTH_TOKEN') == null) {
      this.router.navigateByUrl('/auth');
    }

    if(localStorage.getItem('USER_Role') === "1") {
      this.router.navigateByUrl('/adminApplications');
    }
    
    this.data.getUserCreateApplication(localStorage.getItem('USER_IDENTIFIER'), localStorage.getItem('AUTH_TOKEN'))
    .subscribe((applications:any[])=>{
      applications.forEach(application =>{
      this.userApplications.push(application)

      this.userApplications.reverse();
      })
    })
  }
}
