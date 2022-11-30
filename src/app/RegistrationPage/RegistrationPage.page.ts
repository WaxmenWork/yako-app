import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides, IonTextarea } from '@ionic/angular';
import { alertController } from '@ionic/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-RegistrationPage',
  templateUrl: 'RegistrationPage.page.html',
  styleUrls: ['RegistrationPage.page.scss']
})
export class RegistrationPage {
  @ViewChild('slides')  slides: IonSlides;
  username: any;
  email: any;
  password: any;
  date: any;
  weight: any;
  height: any;
  category_id: any;

  constructor(
    public _apiService: ApiService,
    private router: Router
  ) { 
  }

  slideOpts = {
    allowTouchMove: false
  };

  async next() {
    if (this.username == undefined || this.email == undefined || this.password == undefined) {
      const alert = alertController.create({
        header: 'Ошибка ввода',
        message: 'Заполните все поля',
        buttons: ['Ок'],
      });

      (await alert).present();
    } 
    else {
     this.slides.slideNext();
     console.log(this.username, this.email, this.password)
    }
  }

  async register() {
    if (this.date == undefined || this.weight == undefined || this.height == undefined || this.category_id == undefined) {
      const alert = alertController.create({
        header: 'Ошибка ввода',
        message: 'Заполните все поля',
        buttons: ['Ок'],
      });

      (await alert).present();
    } 
    else {
     let data = {
       username: this.username,
       email: this.email,
       password: this.password,
       date: this.date,
       weight: this.weight,
       height: this.height,
       category_id: this.category_id
     }
     console.log(data);
     this._apiService.addUser(data).subscribe((res:any) => {
      console.log("SUCCESS ===", res);
      this.username = '';
      this.email = '';
      this.password = '';
      this.date = '';
      this.weight = '';
      this.height = '';
      this.category_id = '';
      this.router.navigateByUrl('/FirstEntry', {replaceUrl: true});
    },(error: any) => {
      console.log("ERROR ===", error );
    });
    }
  }
}