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
  mainPhoto = null;
  minDate: any;
  maxDate: any;
  time? = new Date();
  url: any = '';

  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private configService: ConfigService) { 
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
      this.photos = info.photoApplications;
      console.log(info);
    });

    this.configService.getCities()
      .subscribe((cities:any[])=>{
        cities.forEach(city =>{
        this.cities.push(city)
      })
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
        console.log(i);
        const f = files.item(i);
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.photos.push({ url: e.target.result });
        };
        reader.readAsDataURL(f!);
      }
    }
  }

  deleteImg(image: any) {
    this.photos = this.photos.filter(obj => obj !== image);
  }

  get formControls() { return this.editForm.controls; }

  editApplication() {
    this.isSubmitted = true;

    if(this.editForm.invalid){
      return;
      
    }
  }
}
