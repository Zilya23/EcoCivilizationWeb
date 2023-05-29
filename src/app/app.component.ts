import { Component } from '@angular/core';
import { ConfigService } from './config/config.service';
import { Router } from  '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ ConfigService],
})
export class AppComponent {
  title = 'EcoCivilization';

  constructor(private router: Router) {}

  exit() {
    localStorage.removeItem('AUTH_TOKEN');
    localStorage.removeItem('USER_IDENTIFIER');
    this.router.navigateByUrl('/auth');
  }
}
