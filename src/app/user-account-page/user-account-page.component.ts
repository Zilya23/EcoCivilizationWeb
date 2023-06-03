import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from  '@angular/router';
import { ConfigService } from '../config/config.service';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { FormControl} from '@angular/forms';

@Component({
  selector: 'app-user-account-page',
  templateUrl: './user-account-page.component.html',
  styleUrls: ['./user-account-page.component.css']
})
export class UserAccountPageComponent {
  profilForm: FormGroup | any;
  isSubmitted  =  false;
  cities: any[] = [];
  separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
	phoneForm = new FormGroup({
		phone: new FormControl(undefined, [Validators.required])
	});
  selectedSimpleItem = '';
  unamePattern = (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/);
  user: any;
  idCity: any;

  constructor(private router: Router, private formBuilder: FormBuilder, private configService: ConfigService ) { 
    this.configService.getCities()
      .subscribe((cities:any[])=>{
        cities.forEach(city =>{
        this.cities.push(city)
      })
    });

    this.configService.GetUser(localStorage.getItem('USER_IDENTIFIER')).subscribe( response =>{
      this.user = response;
      this.profilForm.controls['name'].setValue(response.name);
      this.profilForm.controls['surname'].setValue(response.surname);
      this.profilForm.controls['telephone'].setValue(response.telephone);
      this.profilForm.controls['gender'].setValue(response.idGender);
      this.profilForm.controls['city'].setValue(response.idCityNavigation.name);
      this.profilForm.controls['email'].setValue(response.email);
      this.idCity = response.idCityNavigation.id;
    });
  }

  ngOnInit() {
    this.profilForm  =  this.formBuilder.group({
        name:['', Validators.required],
        surname:['', Validators.required],
        telephone:['', Validators.required],
        email: ['', Validators.required, Validators.email],
        password: ['', Validators.required],
        newPassword: ['', Validators.required, Validators.pattern(
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/),],
        gender : ['', Validators.required],
        city : ['', Validators.required],
    });
  }

  get formControls() { return this.profilForm.controls; }

  signIn(){
    this.isSubmitted = true;
    
    if(this.profilForm.invalid){
      return;
    }

    var email = this.profilForm.value.email.toString();
    var password = this.profilForm.value.password.toString();
    var name = this.profilForm.value.name.toString();
    var surname = this.profilForm.value.surname.toString();
    var telephone = this.profilForm.value.telephone.number;
    var idGender = this.profilForm.value.gender;
    var newPassword = this.profilForm.value.newPassword.toString();

    if(isNaN(Number(this.profilForm.value.city))){ }
      else {this.idCity = this.profilForm.value.city;}
    
      console.log(this.idCity);
      
//Проверить совпадает ли пароль из формы с паролем в бд
// Проверить не совпадают ли старый пароль и новый пароль
//Проверить нет ли уже такой же почты и телефона


    // if(password === repeatPassword) {
    //   this.configService.registration(name, surname, telephone, 
    //                 idCity, idGender, email, password).subscribe(response => {
    //     alert("Успешно!");
    //     this.router.navigateByUrl('/auth');
    //     }, error => {
    //       if(error.status === 404)
    //       {
    //         this.profilForm.controls['email'].setErrors({'incorrect' : true});
    //         this.profilForm.controls['telephone'].setErrors({'incorrect' : true});
    //       }
    //       else{
    //         alert("Ошибка! Попробуйте еще раз")
    //       }
    //     }
    //   );
    // }
    // this.profilForm.controls['repeatPassword'].setErrors({'incorrect' : true});
  }
}
