import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ConfigService } from '../config/config.service';
import { FormBuilder, FormControl, FormGroup, Validators } from  '@angular/forms';

@Component({
  selector: 'app-application-admin-page',
  templateUrl: './application-admin-page.component.html',
  styleUrls: ['./application-admin-page.component.css']
})
export class ApplicationAdminPageComponent {
  applications: any[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private configService: ConfigService) { 
    if(localStorage.getItem('USER_Role') !== "1") {
      this.router.navigateByUrl('/applications');
    }

    this.configService.getApplicationList().subscribe(resp => {
      this.applications = resp;
      this.applications.reverse();
    })
  }
}
