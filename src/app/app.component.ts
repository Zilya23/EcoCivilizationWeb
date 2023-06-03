import { Component } from '@angular/core';
import { ConfigService } from './config/config.service';
import { Router } from  '@angular/router';
import { ListApplicationComponent } from './list-application/list-application.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ConfigService],
})
export class AppComponent {
  title = 'EcoCivilization';
  searchBoxText = '';

  constructor(private router: Router) {
    document.addEventListener('DOMContentLoaded', () => {
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
    });
  }

  exit() {
    localStorage.removeItem('AUTH_TOKEN');
    localStorage.removeItem('USER_IDENTIFIER');
    this.router.navigateByUrl('/auth');
  }
}
