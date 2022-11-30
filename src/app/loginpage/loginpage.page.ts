import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { alertController } from '@ionic/core';
import { ApiService } from '../api.service';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.page.html',
  styleUrls: ['./loginpage.page.scss'],
})
export class LoginpagePage implements OnInit {
  email: any;
  password: any;
  condition: boolean=false;
  credentials: FormGroup;

  constructor(
    public _apiService: ApiService,
    private authService: AuthentificationService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController
  ) { }

  async logging() {
    const loading = await this.loadingController.create();
    await loading.present();

    if (this.email == undefined || this.password == undefined) {
      await loading.dismiss();
      const alert = alertController.create({
        header: 'Ошибка ввода',
        message: 'Заполните все поля',
        buttons: ['Ок'],
      });

      (await alert).present();
    } 
    else {
      let data = {
       email: this.email,
       password: this.password
     }
      this.authService.login(data).subscribe(async (res:any) => {
      console.log("SUCCESS ===", res);
      await loading.dismiss();
      this.email = '';
      this.password = '';
      this.condition = true;
      this.router.navigateByUrl('/tabs', {replaceUrl: true});
      window.location.reload();
    }, async (error: any) => {
      console.log("ERROR ===", error );
      await loading.dismiss();
      const alert = alertController.create({
        header: 'Ошибка входа',
        message: 'Введены неверные данные',
        buttons: ['Ок'],
      });
      (await alert).present();
    });
    }
  }

  ngOnInit() {

  }

}
