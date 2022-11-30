import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service'
import { AlertController, LoadingController } from '@ionic/angular';
import { alertController } from '@ionic/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  imgurl:any;
  userdata:any [];
  name: any;
  height: any;
  weight: any;
  email: any;
  constructor(
    private authService: AuthentificationService,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private router : Router
  ) {
    this.userData();
   }

  ngOnInit() {
  }

  async confirmData() {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    let newUserData = {
      'username': this.name,
      'weight': Number(this.weight),
      'height': Number(this.height),
      'email': this.email,
      'id': this.userdata[0]['id']
    }
    return this.authService.updateUser(newUserData).subscribe((response:any)=>{
      //this.router.navigateByUrl('/tabs/tab5', {replaceUrl: true});
      console.log(response);
      loading.dismiss();
      window.location.reload();
    }, async (error:any) => {
      console.log("ERROR ===", error );
      loading.dismiss();
      const alert = alertController.create({
        header: "Ошибка!",
        message: error['error']['status'],
        buttons: ['Ок'],
      });
      (await alert).present();
    });
  }

  async userData() {
    this.authService.getUserByToken().subscribe((res:any) => {
      this.userdata = res;
      this.name = this.userdata[0]['username'];
      this.weight = this.userdata[0]['weight'];
      this.height = this.userdata[0]['height'];
      this.email = this.userdata[0]['email'];
    },(error: any) => {
    });};
}
