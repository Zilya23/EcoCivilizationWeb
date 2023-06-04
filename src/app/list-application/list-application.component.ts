import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ConfigService } from '../config/config.service';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';

@Component({
  selector: 'app-list-application',
  templateUrl: './list-application.component.html',
  styleUrls: ['./list-application.component.css'],
})
export class ListApplicationComponent {
  applications: any[] = [];
  obj1: any;

  constructor(private router: Router, private data: ConfigService, private formBuilder: FormBuilder) {
    this.data.getCurrentApplicationList()
    .subscribe(applications => {
      this.applications = applications;
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

    if(this.applications.length > 0) {
      this.applications.reverse;
    }
  }

  filter() {
    var searchBoxText = (<HTMLInputElement>document.getElementById("searchBox")).value;
    if(searchBoxText === '' ) {
      this.data.getCurrentApplicationList()
      .subscribe(applications => {
        this.applications = applications;
      });  
    }

    if(searchBoxText != '' ) {
      this.applications = (Object.values(this.applications).filter(x => x.name.toLowerCase().indexOf(searchBoxText.toLowerCase())>= 0 
      || x.idCityNavigation.name.toLowerCase().indexOf(searchBoxText.toLowerCase())>= 0
      || x.description.toLowerCase().indexOf(searchBoxText.toLowerCase())>= 0));
    }
    
    if(this.applications.length > 0) {
      this.applications.reverse;
    }
  }
}

