import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ConfigService } from '../config/config.service';

@Component({
  selector: 'app-list-application',
  templateUrl: './list-application.component.html',
  styleUrls: ['./list-application.component.css']
})
export class ListApplicationComponent {
  applications:any[] = [];

  constructor(private router: Router, private data: ConfigService) {
    this.data.getApplicationList()
    .subscribe((applications:any[])=>{
      
      applications.forEach(application =>{
      this.applications.push(application)

      this.applications.reverse();
    })
  })
}
}
