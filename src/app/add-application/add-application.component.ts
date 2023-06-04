import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from  '@angular/router';
import { ConfigService } from '../config/config.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-add-application',
  templateUrl: './add-application.component.html',
  styleUrls: ['./add-application.component.css'],
})

export class AddApplicationComponent {
  addForm: FormGroup | any;
  isSubmitted  =  false;
  cities: any[] = [];
  photos: any[] = [];
  mainPhoto = null;
  minDate: any;
  maxDate: any;
  time? = new Date();

  constructor(private router: Router, private formBuilder: FormBuilder, private configService: ConfigService ) {
    if(localStorage.getItem('AUTH_TOKEN') == null) {
      this.router.navigateByUrl('/auth');
    }
    this.configService.getCities()
      .subscribe((cities:any[])=>{
        cities.forEach(city =>{
        this.cities.push(city)
      })
    })
    this.minDate = new Date();
    this.maxDate = new Date('2023-12-31T12:00');

    document.addEventListener('DOMContentLoaded', () => {
      var dd = this.minDate.getDate(); //Current day
      var mm = this.minDate.getMonth() + 1; //January is 0!
      var yyyy = this.minDate.getFullYear(); //(Year is 2022)
      if (dd < 10) {
          dd = '0' + dd;
      } 
      if (mm < 10) {
          mm = '0' + mm;
      }
      var today_min = yyyy + '-' + mm + '-' + dd + "T08:00";
      var maxdd = this.maxDate.getDate(); //Current day
      var maxmm = this.maxDate.getMonth() + 1; //January is 0!
      var maxyyyy = this.maxDate.getFullYear(); //(Year is 2022)
      var today_max = maxyyyy + '-' + maxmm + '-' + maxdd + "T20:00";
      console.log(today_min);
      console.log(today_max);
      document.getElementById("dateTime")!.setAttribute("min", today_min);
      document.getElementById("dateTime")!.setAttribute("max", today_max);
    });
   }

    url: any = '';
    onFileSelected(event: any) {
      const files: FileList = event.target.files;
      for (let i = 0; i < files.length; i++) {
        if(i < 5) {
          console.log(i);
          const f = files.item(i);
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.photos.push({ url: e.target.result });
          };
          reader.readAsDataURL(f!);
        }
        else
        {

        }
      }
    }

   ngOnInit() {
    this.addForm  =  this.formBuilder.group({
        name:['', Validators.required],
        description:['', Validators.required],
        date:['', Validators.required],
        place:['', Validators.required],
        city : ['', Validators.required],
        countPart : ['', Validators.required],
    });
  }

  deleteImg(image: any) {
    this.photos = this.photos.filter(obj => obj !== image);
  }

  get formControls() { return this.addForm.controls; }

   addApplication() {
    this.isSubmitted = true;

    if(this.addForm.invalid){
      return;
      
    }

    if(this.photos.length === 0) {
      alert("Добавьте хотя бы одно фото");
    } 
    else if(this.photos.length > 5) {
      alert("Максимум 5 фото!");
    }
    else{
      var name = this.addForm.value.name.toString();
      var description = this.addForm.value.description.toString();
      var date = this.addForm.value.date;
      var place = this.addForm.value.place.toString();
      var idCity = this.addForm.value.city;
      var countPart = this.addForm.value.countPart;

      this.configService.addApplication(localStorage.getItem('AUTH_TOKEN'), name, description,
                                        idCity, place, date, countPart, 
                                        localStorage.getItem('USER_IDENTIFIER')).subscribe(response => {
            for(let photo of this.photos){
              this.configService.addPhoto(response.id, photo.url).subscribe(responses =>{
                console.log(responses)
              });
            }
                                          
            alert("Успешно!");
            this.router.navigateByUrl('/applications');
          }, error =>
          {
            if(error.status === 401){
              alert("Для начала авторизуйтесь!")
              this.router.navigateByUrl('/auth');
            }
            else{
              alert("Ошибка! Попробуйте еще раз")
            }
          }
        );
    }
  }
}
