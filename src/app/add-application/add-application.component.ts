import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from  '@angular/router';
import { ConfigService } from '../config/config.service';

@Component({
  selector: 'app-add-application',
  templateUrl: './add-application.component.html',
  styleUrls: ['./add-application.component.css'],
})
export class AddApplicationComponent {
  addForm: FormGroup | any;
  isSubmitted  =  false;
  cities: any[] = [];
  minDate: any;
  maxDate: any;
  time? = new Date();

  constructor(private router: Router, private formBuilder: FormBuilder, private configService: ConfigService ) {
    this.configService.getCities()
      .subscribe((cities:any[])=>{
        cities.forEach(city =>{
        this.cities.push(city)
      })
    })
    this.minDate = new Date;
    this.maxDate = new Date('2023-12-31T12:00:00');
   }

   ngOnInit() {
    this.addForm  =  this.formBuilder.group({
        name:['', Validators.required],
        description:['', Validators.required],
        date:['', Validators.required],
        place:['', Validators.required],
        city : ['', Validators.required],
    });
  }

  get formControls() { return this.addForm.controls; }

   addApplication() {
    this.isSubmitted = true;
    
    if(this.addForm.invalid){
      return;
    }
   }
}
