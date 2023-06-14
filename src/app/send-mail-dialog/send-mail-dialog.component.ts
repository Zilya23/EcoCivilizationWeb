import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ConfigService } from '../config/config.service';
import { FormBuilder, FormControl, FormGroup, Validators } from  '@angular/forms';

@Component({
  selector: 'app-send-mail-dialog',
  templateUrl: './send-mail-dialog.component.html',
  styleUrls: ['./send-mail-dialog.component.css']
})
export class SendMailDialogComponent {
  id: any;
  mailForm: FormGroup | any;
  isSubmitted  =  false;
  recipientEmail: any[] = [];


  constructor(private router: Router, private configService: ConfigService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    if(localStorage.getItem('AUTH_TOKEN') == null) {
      this.router.navigateByUrl('/auth');
    }

    if(localStorage.getItem('USER_Role') === "1") {
      this.router.navigateByUrl('/adminApplications');
    }

    this.id = this.route.snapshot.paramMap.get('id');
    configService.GetPartUser(this.id).subscribe( info => {
      this.recipientEmail = info;
    });
  }

  ngOnInit() {
    this.mailForm  =  this.formBuilder.group({
        theme: ['', Validators.required],
        mail_text: ['', Validators.required]
    });
  }

  get formControls() { return this.mailForm.controls; }

  sendMail(){
    this.isSubmitted = true;
    if(this.mailForm.invalid){
      return;
    }
    
    var theme = this.mailForm.value.theme;
    var mail_text = this.mailForm.value.mail_text;

    var subject = "Автор события, на которое вы подписались прислал информацию: " + theme;
    var body = mail_text + "\n" + "Ссылка на событие: " + "http://localhost:4200/application/" + this.id;

    for (let recip of this.recipientEmail) {
      this.configService.sendMail(localStorage.getItem('AUTH_TOKEN'), recip.idUserNavigation.email, subject, body)
      .subscribe(info => {
        this.router.navigateByUrl('/application/' + this.id);
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
    alert("В событии пока никто не участвует");
    this.router.navigateByUrl('/application/' + this.id);
  }
}
