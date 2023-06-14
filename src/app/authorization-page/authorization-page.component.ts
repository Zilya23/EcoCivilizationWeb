import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from  '@angular/router';
import { ConfigService } from '../config/config.service';

@Component({
  selector: 'app-authorization-page',
  templateUrl: './authorization-page.component.html',
  styleUrls: ['./authorization-page.component.css']
})
export class AuthorizationPageComponent {
  authForm: FormGroup | any;
  isSubmitted  =  false;

  constructor(private router: Router, private formBuilder: FormBuilder, private configService: ConfigService ) {
    var obj = document.getElementById("account");
    var auth_obj = document.getElementById("authoriz");
    var admin_obj = document.getElementById("admin");

    if(localStorage.getItem('AUTH_TOKEN') == null) {
      obj!.style.display = "none";
      auth_obj!.style.display = "block";
      admin_obj!.style.display = "none";
    }
    else {
      obj!.style.display = "block";
      auth_obj!.style.display = "none";
    }
   }

  ngOnInit() {
    this.authForm  =  this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    });
  }

  get formControls() { return this.authForm.controls; }

  signIn(){
    console.log("redfg");
    
    var email = this.authForm.value.email;
    var password = this.authForm.value.password;
    this.configService.authorization(email, password).subscribe(response =>
      {
        localStorage.setItem("AUTH_TOKEN", response.token);
        this.configService.getUserIdentifier(localStorage.getItem('AUTH_TOKEN')).subscribe( resp => {
          localStorage.setItem("USER_IDENTIFIER", resp);
          this.configService.GetUser(resp).subscribe(x=> {
            if(x.isBanned) {
              alert("Ваш аккаунт был забанен");
              localStorage.removeItem('AUTH_TOKEN');
              localStorage.removeItem('USER_IDENTIFIER');
            }
            if(x.idRole == 1)
            localStorage.setItem("USER_Role", "1");
            this.router.navigateByUrl('/adminApplications');
          })
      });
        this.router.navigateByUrl('/applications');
      }, error => {
        alert("Неверный логин или пароль!");
      });
  }
}
