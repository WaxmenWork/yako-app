import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertController, LoadingController } from '@ionic/angular';
import { alertController } from '@ionic/core';
import { AuthentificationService } from '../services/authentification.service';
import { Filesystem } from '@capacitor/filesystem';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})
export class Tab5Page {

  username: any;
  email: any;
  date: any;
  weight: any;
  height: any;
  userdata: any = [];
  imgurl: any;
  image: any;

  constructor(
    private authService: AuthentificationService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private router: Router,
    private http: HttpClient
  ) {
    //this.userData();
  }

  ionViewDidEnter() {
    this.userData();
}

  async selectedFile(event) {
    const loading = await this.loadingController.create();
    await loading.present();
    this.image = event.target.files[0];
    if (this.image['type'] != "image/jpeg" && this.image['type'] != "image/png"){
      const alert = alertController.create({
        header: 'Ошибка ввода',
        message: 'Допустимые форматы файлов: jpeg, png',
        buttons: ['Ок'], 
      });
      await loading.dismiss();
      (await alert).present();
    }
    else{
      const formData = new FormData();
      console.log(this.image);
      formData.append('image', this.image);
      
      this.authService.sendImage(formData, this.userdata[0]['id']).subscribe(async (response: any)=>{
        await loading.dismiss();
        window.location.reload();
      });
      // return this.http.post('http://178.49.124.232/getImage.php', formData).subscribe((response:any) => {
      //   this.authService.setImg(this.image['name'], this.userdata[0]['id']);
      //   console.log(response);
      // });
    };
  }

  async getImgId(id){
    
    this.authService.getImgById(id).subscribe((res:any) => {
      this.imgurl = {
        'background': 'url(http://178.49.124.232/' + res['photo'] + ')',
        'background-size': 'cover',
        'background-repeat': 'no-repeat'
    };
    });
  }
  

  OnClick() {
    console.log(this.userdata[0]['id']);
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', {replaceUrl: true});
  }

  async userData() {
    this.authService.getUserByToken().subscribe((res:any) => {
      //console.log("SUCCESS ===", res);
      this.userdata = res;
      let item = res[0];
      this.username = item.username;
      this.getImgId(this.userdata[0]['id']);
    },(error: any) => {
      //console.log("ERROR ===", error );
    });};

    refresh(): void {
      window.location.reload();
  }
}
