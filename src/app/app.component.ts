import { Component } from '@angular/core';
import { ConfigService } from './config/config.service';
import { Router } from  '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ConfigService],
})
export class AppComponent {
  title = 'EcoCivilization';

  constructor(private router: Router) {
    // document.addEventListener('DOMContentLoaded', () => {
    //   var obj = document.getElementById("account");
    //   var auth_obj = document.getElementById("authoriz");

    //   if(localStorage.getItem('AUTH_TOKEN') == null) {
    //     obj!.style.display = "none";
    //     auth_obj!.style.display = "block";
    //   }
    //   else {
    //     obj!.style.display = "block";
    //     auth_obj!.style.display = "none";
    //   }
    // });
  }

  exit() {
    localStorage.removeItem('AUTH_TOKEN');
    localStorage.removeItem('USER_IDENTIFIER');
    localStorage.removeItem('USER_Role');
    this.router.navigateByUrl('/auth');
    var admin_obj = document.getElementById("goOut");
    admin_obj!.style.display = "none";
  }
}
