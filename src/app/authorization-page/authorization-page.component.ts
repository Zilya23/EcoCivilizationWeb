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

    if(localStorage.getItem('AUTH_TOKEN') == null) {
      obj!.style.display = "none";
      auth_obj!.style.display = "block";
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
    this.isSubmitted = true;
    if(this.authForm.invalid){
      return;
    }
    
    var email = this.authForm.value.email;
    var password = this.authForm.value.password;
    this.configService.authorization(email, password).subscribe(response =>
      {
        localStorage.setItem("AUTH_TOKEN", response.token);
        this.configService.getUserIdentifier(localStorage.getItem('AUTH_TOKEN')).subscribe( resp =>
          localStorage.setItem("USER_IDENTIFIER", resp)
        );
        this.router.navigateByUrl('/applications');
      }, error => {
        this.authForm.controls['email'].setErrors({'incorrect' : true});
        this.authForm.controls['password'].setErrors({'incorrect' : true});
      });
  }
}
