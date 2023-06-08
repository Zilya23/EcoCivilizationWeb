import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ConfigService } from '../config/config.service';
import { FormBuilder, FormControl, FormGroup, Validators } from  '@angular/forms';

@Component({
  selector: 'app-users-admin-page',
  templateUrl: './users-admin-page.component.html',
  styleUrls: ['./users-admin-page.component.css']
})
export class UsersAdminPageComponent {
  users: any[] =[];

  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private configService: ConfigService) { 
    if(localStorage.getItem('USER_Role') !== "1") {
      this.router.navigateByUrl('/applications');
    }

    this.configService.getUsers().subscribe(resp=> {
      this.users = resp;
    })
  }
}
