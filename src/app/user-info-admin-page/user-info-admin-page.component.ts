import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ConfigService } from '../config/config.service';
import { FormBuilder, FormControl, FormGroup, Validators } from  '@angular/forms';

@Component({
  selector: 'app-user-info-admin-page',
  templateUrl: './user-info-admin-page.component.html',
  styleUrls: ['./user-info-admin-page.component.css']
})
export class UserInfoAdminPageComponent {
  user: any;
  userApplications: any[] = [];
  banned: any;
  id: any;
  recipientEmail: any[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private configService: ConfigService) { 
    if(localStorage.getItem('USER_Role') === "1") {
      var obj = document.getElementById("account");
      var admin_obj = document.getElementById("admin");
      obj!.style.display = "none";
      admin_obj!.style.display = "block";
    }
    if(localStorage.getItem('USER_Role') !== "1") {
      this.router.navigateByUrl('/applications');
    }
    this.id = this.route.snapshot.paramMap.get('id');

    configService.GetUser(this.id).subscribe(resp => {
      this.user = resp;
      if(this.user.isBanned) {
        this.banned = "Разбанить";
      }
      else {
        this.banned = "Забанить";
      }
      configService.getUserAllCreateApplication(this.id, localStorage.getItem('AUTH_TOKEN')).subscribe(x => {
        this.userApplications = x;
      })
    })
  }

  deleteUserPart() {
    this.configService.GetPartUser(this.id).subscribe( info => {
      this.recipientEmail = info;
    });

    var subject = "Событие, на которое вы были подписаны, удалено администрацией сайта";
    var body = "Проверьте список своих подписок, что бы оставаться в курсе!";

    for (let recip of this.recipientEmail) {
      this.configService.sendMail(localStorage.getItem('AUTH_TOKEN'), recip.idUserNavigation.email, subject, body)
      .subscribe(info => {}, error => {
        alert("Ошибка! Попробуйте еще раз")
      });
    }

    this.configService.DeletePartAdmin(localStorage.getItem('AUTH_TOKEN'), this.id).subscribe( resp => {
      console.log(resp);
    }, error => {
      console.log(error);
    })
  }

  bunnedApplication(idApplication: any) {
    this.configService.BannedApplication(localStorage.getItem('AUTH_TOKEN'), idApplication, true).subscribe(resp => {
      this.deleteUserPart();
    }, error => {
      alert(error);
    })
  }

  update() {
    if(this.user.isBanned) {
      this.banned = "Разбанить";
    }
    else {
      this.banned = "Забанить";
    }
    this.configService.getUserAllCreateApplication(this.id, localStorage.getItem('AUTH_TOKEN')).subscribe(x => {
      this.userApplications = x;
    })

    this.configService.getUserAllCreateApplication(this.id, localStorage.getItem('AUTH_TOKEN')).subscribe(x => {
      this.userApplications = x;
    })
  }

  bannedUser() {
    if(this.banned === "Разбанить") {
      this.configService.BannedUser(localStorage.getItem('AUTH_TOKEN'), this.id, false).subscribe(x=> {
        this.configService.GetUser(this.id).subscribe(resp => {
          this.user = resp;
          this.update();
        })
      })
    }
    else
    {
      this.configService.BannedUser(localStorage.getItem('AUTH_TOKEN'), this.id, true).subscribe(x=> {
        this.configService.GetUser(this.id).subscribe(resp => {
          this.user = resp;
          for(let app of this.userApplications) {
            this.bunnedApplication(app.id);
          }
          this.update();
        })
      })
    }
  }
}
