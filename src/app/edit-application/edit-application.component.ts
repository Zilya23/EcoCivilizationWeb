import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ConfigService } from '../config/config.service';
import { FormBuilder, FormControl, FormGroup, Validators } from  '@angular/forms';

@Component({
  selector: 'app-edit-application',
  templateUrl: './edit-application.component.html',
  styleUrls: ['./edit-application.component.css']
})
export class EditApplicationComponent {
  id: any;
  editApplicaton: any;
  editForm: FormGroup | any;
  isSubmitted  =  false;
  cities: any[] = [];
  photos: any[] = [];
  deletePhotos: any[] = [];
  mainPhoto = null;
  minDate: any;
  maxDate: any;
  idCity: any;
  recipientEmail: any[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private configService: ConfigService) { 
    if(localStorage.getItem('AUTH_TOKEN') == null) {
      this.router.navigateByUrl('/auth');
    }

    if(localStorage.getItem('USER_Role') === "1") {
      this.router.navigateByUrl('/adminApplications');
    }
  
    this.id = this.route.snapshot.paramMap.get('id');
    this.configService.getApplication(this.id)
    .subscribe((info:any) => {
      this.editApplicaton = info;

      this.editForm.controls['name'].setValue(info.name);
      this.editForm.controls['description'].setValue(info.description);
      this.editForm.controls['date'].setValue(info.date);
      this.editForm.controls['place'].setValue(info.place);
      this.editForm.controls['countPart'].setValue(info.countUser);
      this.editForm.controls['city'].setValue(info.idCityNavigation.name);
      this.idCity = info.idCityNavigation.id;
      this.photos = info.photoApplications;
      this.deletePhotos = structuredClone(info.photoApplications);
    });
    
    this.configService.getCities()
      .subscribe((cities:any[])=>{
        cities.forEach(city =>{
        this.cities.push(city)
      })
    });

    configService.GetPartUser(this.id).subscribe( info => {
      this.recipientEmail = info;
    });

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

      document.getElementById("dateTime")!.setAttribute("min", today_min);
      document.getElementById("dateTime")!.setAttribute("max", today_max);
    });
  }

  ngOnInit() {
    this.editForm  =  this.formBuilder.group({
        name:['', Validators.required],
        description:['', Validators.required],
        date:['', Validators.required],
        place:['', Validators.required],
        city : ['', Validators.required],
        countPart : ['', Validators.required],
    });
  }
  
  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      if(i < 5) {
        const f = files.item(i);
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.photos.push({ photo: e.target.result });
        };
        reader.readAsDataURL(f!);
      }
    }
    console.log(this.photos);
    console.log(this.deletePhotos);
  }

  deleteImg(image: any) {
    this.photos = this.photos.filter(obj => obj !== image);
    console.log(this.photos);
    console.log(this.deletePhotos);
  }

  get formControls() { return this.editForm.controls; }

  deleteEvent() {
    this.configService.deleteEvent(localStorage.getItem('AUTH_TOKEN'), this.id,).subscribe(resp =>{
      this.sendDeleteMail();
      console.log(resp);
    });
    alert("Событие удалено!");
    this.router.navigateByUrl('/applications');
  }

  editApplication() {
    this.isSubmitted = true;

    if(this.editForm.invalid){
      return;
    }

    if(this.photos.length === 0) {
      alert("Добавьте хотя бы одно фото");
    } 
    else if(this.photos.length > 5) {
      alert("Максимум 5 фото!");
    }
    else{
      var name = this.editForm.value.name.toString();
      var description = this.editForm.value.description.toString();
      var date = this.editForm.value.date;
      var place = this.editForm.value.place.toString();
      var countPart = this.editForm.value.countPart;
      
      if(isNaN(Number(this.editForm.value.city))){ }
      else {this.idCity = this.editForm.value.city;}

      this.configService.editApplication(localStorage.getItem('AUTH_TOKEN'), this.id, name, description,
                                        this.idCity, place, date, countPart, 
                                        localStorage.getItem('USER_IDENTIFIER')).subscribe(response => {
        for(let del of this.deletePhotos) {
          this.configService.deletePhoto(del.id).subscribe(resp => {
            console.log(resp);
          });
        }

        for(let photo of this.photos){
          this.configService.addPhoto(response.id, photo.photo).subscribe(resp => {
            console.log(resp);
          });
        }
        this.sendAuthoMail();              
        alert("Успешно!");
        this.router.navigateByUrl('/applications');
      }, error =>
      {
        if(error.status === 401){
          alert("Для начала авторизуйтесь!")
          this.router.navigateByUrl('/auth');
        }
        else{
          console.log(error);
          
          alert("Ошибка! Попробуйте еще раз")
        }
      });
    }
  }

  sendAuthoMail() {
    var subject = "Событие, на которое вы подписались было изменено";
    var body = "Возможно автор внес важные изменения в событие! Просмотрите их, что бы быть в курсе." + 
    "\n" + "Ссылка на событие: " + "http://localhost:4200/application/" + this.id;

    for (let recip of this.recipientEmail) {
      console.log(recip.idUserNavigation);
      this.configService.sendMail(localStorage.getItem('AUTH_TOKEN'), recip.idUserNavigation.email, subject, body)
      .subscribe(info => {
        console.log(info);
      }, error => {
        if(error.status === 401){
          this.router.navigateByUrl('/auth');
        }
        else
        {
          alert("Ошибка! Попробуйте еще раз")
        }
      });
    }
  }

  sendDeleteMail() {
    var subject = "Событие, на которое вы подписались было удалено";
    var body = "Событие из ваших подписок было отменено его автором! Просмотрите что это за событие, что бы быть в курсе."

    for (let recip of this.recipientEmail) {
      console.log(recip.idUserNavigation);
      this.configService.sendMail(localStorage.getItem('AUTH_TOKEN'), recip.idUserNavigation.email, subject, body)
      .subscribe(info => {
        console.log(info);
      }, error => {
        if(error.status === 401){
          this.router.navigateByUrl('/auth');
        }
        else
        {
          alert("Ошибка! Попробуйте еще раз")
        }
      });
    }
  }
}
