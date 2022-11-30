import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Page } from '@ionic/core';
import { ApiService } from '../api.service';
import { AuthentificationService } from '../services/authentification.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-show-diet',
  templateUrl: './show-diet.page.html',
  styleUrls: ['./show-diet.page.scss'],
})

export class ShowDietPage implements OnInit {
  id: any;
  title: any;
  description: any;
  category_id: any;
  photo: any;
  imgurl: any;
  caloriesAll: any;
  food: any = [];
  btnStatuses: any = [];
  userdata: any = [];
  user_id: any;
  pipe: DatePipe = new DatePipe('en-US');
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
    this._apiService.getDietItem(id).subscribe( async (res:any) => {
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
    this.getFood(this.id)
    }, async (error:any) => {
    console.log("ERROR ===", error );
    const alert = this.alertController.create({
      header: 'Ошибка',
      message: 'Диета не найдена',
      buttons: ['Ок'],
    });
    (await alert).present();
    });
  }

  async getFood(diet_id) {
    this._apiService.getDietFood(diet_id).subscribe( async (res:any) => {
      this.food = res;
      this.caloriesAll = 0;
      let date = this.pipe.transform(Date.now(), 'dd.MM.yyyy');
      for(var i = 0; i < this.food.length;i++) {
        this.btnStatuses.push('danger');
        let food_id = this.food[i]['id'];
        this.caloriesAll+=this.food[i]['calories'];
        this.getStatus(this.user_id, diet_id, food_id, date, i);
      }
    }, async (error:any) => {
      console.log("ERROR ===", error );
      const alert = this.alertController.create({
      header: 'Ошибка',
      message: 'Блюда не найдены',
      buttons: ['Ок'],
    });
    (await alert).present();
  });
}

  async getStatus(user_id, diet_id, food_id, date, i){
    this._apiService.getDietFoodConf(user_id, diet_id, food_id, date).subscribe((res:any) => {
      if(res['status']==false){
        this.btnStatuses[i] = 'danger';
      }
      else {
        this.btnStatuses[i] = 'success';
      }
    })
  }

  async eat(food_id, i) {
    let date = this.pipe.transform(Date.now(), 'dd.MM.yyyy')
    let data = {
      'user_id': this.user_id,
      'diet_id': this.id,
      'food_id': food_id,
      'date': date
    }
    this._apiService.sendDietFoodConf(data).subscribe((res:any) => {
      this.getStatus(this.user_id, this.id, food_id, date, i)
    })
  }

// async presentAlert(food_id) {
//   const alert = await this.alertController.create({
//     cssClass: 'secondary',
//     header: 'Удаление',
//     message: 'Вы точно хотите удалить блюдо?',
//     buttons: [{
//       text: 'Да',
//       handler: (placeholder) => {
//         this.deleteItem(food_id);
//     }},{
//       text: 'Отмена'
//     }]
//   });

//   await alert.present();
// }
}
