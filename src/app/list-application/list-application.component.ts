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
  cities: any[] = [];
  cityForm: FormGroup | any;

  constructor(private router: Router, private data: ConfigService, private formBuilder: FormBuilder) {
    this.data.getCurrentApplicationList()
    .subscribe(applications => {
      this.applications = applications;
      this.applications.reverse();
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

    this.data.getCities()
      .subscribe((cities:any[])=>{
        cities.forEach(city =>{
        this.cities.push(city)
      })
    })
  }

  ngOnInit() {
    this.cityForm  =  this.formBuilder.group({
        city : ['', Validators.required],
    });
  }

  filter() {
    var searchBoxText = (<HTMLInputElement>document.getElementById("searchBox")).value;
    var idCity = this.cityForm.value.city;

    if(idCity === '' && searchBoxText === '' ) {
      this.data.getCurrentApplicationList()
      .subscribe(applications => {
        this.applications = applications;
      });  
    }
    else {
      if(idCity === '') {
        idCity = 0;
      }
      this.data.getFilteredApplication(idCity, searchBoxText).subscribe(response =>{
        this.applications = response;
      });
    }
    
    if(this.applications.length > 0) {
      this.applications.reverse();
    }
  }
}

