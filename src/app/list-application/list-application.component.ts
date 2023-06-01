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
    this.data.getCurrentApplicationList()
    .subscribe((applications:any[])=>{
      
      applications.forEach(application =>{
      this.applications.push(application)

      this.applications.reverse();
      })
    });
    var obj = document.getElementById("account");
    var auth_obj = document.getElementById("authoriz");

    if(localStorage.getItem('AUTH_TOKEN') == null) {
      obj!.style.display = "none";
      auth_obj!.style.display = "block";
    }
    else {
      obj!.style.display = "block";
      auth_obj!.style.display = "none";
    }

    var menu_obj = document.getElementById("menu");

    menu_obj!.style.display = "block";
  }
}
