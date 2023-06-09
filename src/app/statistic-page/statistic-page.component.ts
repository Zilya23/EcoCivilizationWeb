import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ConfigService } from '../config/config.service';

@Component({
  selector: 'app-statistic-page',
  templateUrl: './statistic-page.component.html',
  styleUrls: ['./statistic-page.component.css']
})
export class StatisticPageComponent {
  statistic: any;
  topUser: any[] = [];
  topCity: any[] = [];


  constructor(private router: Router, private configServices: ConfigService, private route: ActivatedRoute) {
    if(localStorage.getItem('AUTH_TOKEN') == null) {
      this.router.navigateByUrl('/auth');
    }

    if(localStorage.getItem('USER_Role') === "1") {
      this.router.navigateByUrl('/adminApplications');
    }
    
    this.configServices.GetStatistic(localStorage.getItem('AUTH_TOKEN'), localStorage.getItem('USER_IDENTIFIER')).subscribe(
      response => {
        this.statistic = response;
        this.topUser = response.usersTop;
        this.topCity = response.cityTop;
      }, error => {
        if(error.status === 401){
          this.router.navigateByUrl('/auth');
        }
        else
        {
          alert("Ошибка! Попробуйте еще раз")
        }
      }
    );
  }
}
