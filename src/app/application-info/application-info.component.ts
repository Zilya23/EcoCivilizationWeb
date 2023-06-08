import { Component, Inject } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ConfigService } from '../config/config.service';
import { FormBuilder, FormControl, FormGroup, Validators } from  '@angular/forms';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-application-info',
  templateUrl: './application-info.component.html',
  styleUrls: ['./application-info.component.css']
})
export class ApplicationInfoComponent {
  partForm: FormGroup | any;
  id: any;
  applicationID: any;
  formattedTime: any;
  currentPhoto: any;
  partUser: any;
  participant: any;
  idPart: any;
  animal: any;
  name: any;
  bunned: any;

    constructor(private router: Router, private data: ConfigService, private route: ActivatedRoute) { 
      this.id = this.route.snapshot.paramMap.get('id');
      this.update();
    }

    picPhoto(photo: any) {
      this.currentPhoto = photo;
    }

    update() {
      this.data.getApplication(this.id)
      .subscribe((info:any) => {
        this.applicationID = info;
        this.currentPhoto = info.photoApplications[0].photo;
        this.partUser = this.applicationID.applicationUsers.length;
        this.formattedTime = this.applicationID.timeStart.slice(0, -3);        

        var partDate = new Date(this.applicationID.date);
        var dateNow = new Date();
        if(localStorage.getItem('USER_Role') === "1") {
          var mail_obj = document.getElementById("userButton");
          mail_obj!.style.display = "none";
          var mail_obj = document.getElementById("bunned");
          mail_obj!.style.display = "block";
          if(this.applicationID.isBanned) {
            this.bunned = "Разбанить"
          }
          else{
            this.bunned = "Забанить"
          }
        }
        else {
          if(this.diffDates(partDate, dateNow)) {
            if(this.applicationID.isDelete) {
              this.participant = 'Удалено';
            }
            else {
              if(localStorage.getItem('USER_IDENTIFIER') == this.applicationID.idUser) {
                this.participant = 'Редактировать';
                var mail_obj = document.getElementById("sendMailUsers");
                mail_obj!.style.display = "block";
                var mail_obj = document.getElementById("userButton");
                mail_obj!.style.display = "block";
              }
              else {
                this.data.partExists(this.applicationID.id, localStorage.getItem('USER_IDENTIFIER')).subscribe(exists =>
                  {this.participant = 'Отказаться';
                    this.idPart = exists.id;
                  }, error => {this.participant = 'Участвовать!'}
                );
              }
            }
          }
          else{
            this.participant = 'Событие завершено';
          }
        }
      });
    }

    bunnedApplication() {
      if(this.bunned === "Забанить") {
        this.data.BannedApplication(localStorage.getItem('AUTH_TOKEN'), this.applicationID.id, true).subscribe(resp => {
          this.bunned = "Разбанить";
        }, error => {
          alert(error);
        })
      }
      else {
        this.data.BannedApplication(localStorage.getItem('AUTH_TOKEN'), this.applicationID.id, false).subscribe(resp => {
          this.bunned = "Забанить";
        }, error => {
          alert(error);
        })
      }
    }

    diffDates(day_one: any, day_two: any) {
      return ((day_one - day_two) > 86400000);
    };

    partApplication() {
      if(localStorage.getItem('AUTH_TOKEN') != null)  {
        if(this.participant === 'Участвовать!') {
            this.data.partApplicationUser(this.applicationID.id, localStorage.getItem('AUTH_TOKEN'))
            .subscribe(response => {
              this.update();
          }, error => {
            if(error.status === 401){
              this.router.navigateByUrl('/auth');
            }
            else
            {
              alert("Ошибка! Попробуйте еще раз")
            }
          });
        }
        else if(this.participant === 'Отказаться') {
          this.data.deletePart(this.idPart, localStorage.getItem('AUTH_TOKEN'))
          .subscribe(response => {
            this.update();
          }, error => {
            if(error.status === 401){
              this.router.navigateByUrl('/auth');
            }
            else{
              alert("Ошибка! Попробуйте еще раз")
            }
          })
        }
        else if (this.participant === 'Событие завершено') {
          alert("Время записи истекло")
        }
        else if (this.participant === 'Редактировать') {
          this.router.navigateByUrl(`edit/${this.applicationID.id}`);
        }
      }
    else {
      this.router.navigateByUrl('/auth');
    }
  }
}
