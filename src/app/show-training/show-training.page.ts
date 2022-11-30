import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-show-training',
  templateUrl: './show-training.page.html',
  styleUrls: ['./show-training.page.scss'],
})
export class ShowTrainingPage implements OnInit {
  id: any;
  title: any;
  description: any;
  category_id: any;
  photo: any;
  imgurl: any;
  imgurlGyms: any = [];
  durationAll: any;
  duration: any = [];
  gyms: any = [];
  btnStatuses: any = [];
  userdata: any = [];
  user_id: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _apiService: ApiService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthentificationService
  ) {
    this.userData();
  }

  ngOnInit() {
  }

  async userData() {
    this.authService.getUserByToken().subscribe((res:any) => {
      //console.log("SUCCESS ===", res);
      this.userdata = res;
      this.user_id = this.userdata[0]['id'];
      this.route.params.subscribe((param:any) => {
        this.id = param.id;
        this.getItem(this.id);
      })
    },(error: any) => {
      //console.log("ERROR ===", error );
    });};

  async getItem(id) {
    this._apiService.getTrainingItem(id).subscribe( async (res:any) => {
    let item = res[0];
    this.id = item.id;
    this.title = item.title;
    this.description = item.description;
    this.category_id = item.category_id;
    this.photo = item.photo;

    this.imgurl = {
      'background': 'url(http://178.49.124.232/' + this.photo + ')',
      'background-size': 'cover',
      'background-repeat': 'no-repeat'
    }
    this.getGyms(this.id)
    }, async (error:any) => {
    //console.log("ERROR ===", error );
    const alert = this.alertController.create({
      header: 'Ошибка',
      message: 'Тренировка не найдена',
      buttons: ['Ок'],
    });
    (await alert).present();
    });
  }

  async getGyms(training_id) {
    this._apiService.getTrainingGyms(training_id).subscribe( async (res:any) => {
      this.gyms = res;
      this.durationAll = 0;
      for(var i = 0; i < this.gyms.length;i++) {
        // this.imgurlGyms.push({
        //   'background': 'url(http://178.49.124.232/' + res[i]['photo'] + ')',
        //   'background-size': 'cover',
        //   'background-repeat': 'no-repeat'
        //   })
        this.imgurlGyms.push('http://178.49.124.232/' + res[i]['photo'])
        if (!this.gyms[i]['isCnt']){
          this.durationAll+=this.gyms[i]['duration'];
          this.duration.push(this.gyms[i]['duration'] + ' мин');
        }
        else {
          this.durationAll+=3;
          this.duration.push(this.gyms[i]['duration'] + ' раз');
        }
      }
    }, async (error:any) => {
      //console.log("ERROR ===", error );
      const alert = this.alertController.create({
      header: 'Ошибка',
      message: 'Упражнения не найдены',
      buttons: ['Ок'],
    });
    (await alert).present();
  });
}
}
