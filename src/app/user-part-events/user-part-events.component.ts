import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ConfigService } from '../config/config.service';

@Component({
  selector: 'app-user-part-events',
  templateUrl: './user-part-events.component.html',
  styleUrls: ['./user-part-events.component.css']
})
export class UserPartEventsComponent {
  userPartApplications:any[] = [];

  constructor(private router: Router, private data: ConfigService) {
    this.data.getUserPartApplication(localStorage.getItem('USER_IDENTIFIER'), localStorage.getItem('AUTH_TOKEN'))
    .subscribe((applications:any[])=>{
      applications.forEach(application =>{
      this.userPartApplications.push(application)

      this.userPartApplications.reverse();
      })
    })
    var search_obj = document.getElementById("search");
    search_obj!.style.display = "block";
  }
}
