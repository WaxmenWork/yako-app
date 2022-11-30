import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Page } from '@ionic/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-show-food',
  templateUrl: './show-food.page.html',
  styleUrls: ['./show-food.page.scss'],
})
export class ShowFoodPage implements OnInit {
  id: any;
  title: any;
  calories: any;
  category_id: any;
  user_id: any;
  photo: any;
  imgurl: any;
  ingridients: any = [];
  pipe: DatePipe = new DatePipe('en-US');
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _apiService: ApiService,
    private loadingController: LoadingController,
    private alertController: AlertController,

  ) {
    this.route.params.subscribe((param:any) => {
      this.id = param.id;
      this.getItem(this.id);
    })
  }

  ngOnInit() {
  }

  async getItem(id) {
    this._apiService.getFoodItem(id).subscribe( async (res:any) => {
    let item = res[0];
    this.id = item.id;
    this.title = item.title;
    this.calories = item.calories;
    this.category_id = item.category_id;
    this.user_id = item.user_id;
    this.photo = item.photo;
    this.imgurl = {
      'background': 'url(http://178.49.124.232/' + this.photo + ')',
      'background-size': 'cover',
      'background-repeat': 'no-repeat'
    }
    this.getIngridients(this.id)
    }, async (error:any) => {
    console.log("ERROR ===", error );
    const alert = this.alertController.create({
      header: 'Ошибка',
      message: 'Блюдо не найдено',
      buttons: ['Ок'],
    });
    (await alert).present();
    });
  }

  async getIngridients(food_id) {
    this._apiService.getFoodIngridients(food_id).subscribe( async (res:any) => {
      this.ingridients = res;
    }, async (error:any) => {
      console.log("ERROR ===", error );
      const alert = this.alertController.create({
      header: 'Ошибка',
      message: 'Ингридиенты не найдены',
      buttons: ['Ок'],
    });
    (await alert).present();
  });
}

async deleteItem(food_id, date) {
  this._apiService.deleteFoodItem(food_id, date).subscribe( async (res:any) => {
    this.router.navigateByUrl('/tabs', {replaceUrl: true});
    const alert = await this.alertController.create({
      cssClass: 'secondary',
      header: 'Готово',
      message: 'Блюдо успешно удалено',
      buttons: [{
        text: 'Ок',
        handler: (placeholder) => {
          window.location.reload();
      }}]
    });
  
    await alert.present();
  })
}

async presentAlert(food_id) {
  const alert = await this.alertController.create({
    cssClass: 'secondary',
    header: 'Удаление',
    message: 'Вы точно хотите удалить блюдо?',
    buttons: [{
      text: 'Да',
      handler: (placeholder) => {
        let date = this.pipe.transform(Date.now(), 'dd.MM.yyyy');
        this.deleteItem(food_id, date);
    }},{
      text: 'Отмена'
    }]
  });

  await alert.present();
}

closeTab(){
  this.router.navigateByUrl('/tabs', {replaceUrl: true});
}

}
