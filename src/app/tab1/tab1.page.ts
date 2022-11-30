import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { AuthentificationService } from '../services/authentification.service';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  userdata: any = [];
  id: any;
  title: any;
  photo: any;
  imgurl: any = [];
  food: any = [];
  circledata: any = 0; // круг.  диаграмма
  fats: any = 0; // жиры в расчетах
  protein: any = 0; // белки в расчетах
  crbd: any = 0; // углеводы в расчетах
  caloriesInDay: any;
  fatsInDay: any;
  proteinsInDay: any;
  carbohydratesInDay: any;
  circledata_cur: any = 0;
  fats_cur: any = 0;
  protein_cur: any = 0;
  crbd_cur: any = 0;
  pipe: DatePipe = new DatePipe('en-US');

  constructor(
    public _apiService: ApiService,
    public navCtrl: NavController,
    public authService: AuthentificationService
  ) {
    //this.userData();
  }

  ionViewDidEnter() {
    this.userData();
}

  async userData() {
    this.authService.getUserByToken().subscribe((res:any) => {
      //console.log("SUCCESS ===", res);
      this.userdata = res;
      this.id = this.userdata[0]['id'];
      this.getFood(this.id);
      this.getUserStats(this.id, this.userdata[0]['date'], this.userdata[0]['height'], this.userdata[0]['weight'], this.userdata[0]['category_id']);
    },(error: any) => {
      //console.log("ERROR ===", error );
    });
  };

  async getUserStats(user_id, user_date, height, weight, category_id){
    this._apiService.getUserFoodStat(user_id ,this.pipe.transform(Date.now(), 'dd.MM.yyyy')).subscribe((res:any) => {
      console.log(res);
      this.fats_cur = 0;
      this.protein_cur = 0;
      this.crbd_cur = 0;
      this.circledata_cur = 0;
      let abc = 0;
      for(var i = 0; i < res.length; i++){
        this.fats_cur += res[i]['fats'];
        this.protein_cur += res[i]['proteins'];
        this.crbd_cur += res[i]['carbohydrates'];
        if (res[i]['id'] != abc){
          this.circledata_cur += res[i]['calories'];
        }
        abc = res[i]['id']
      }
      var BD = new Date(user_date);
      var Now = new Date();
      var y = BD.getFullYear() - Now.getUTCFullYear();
      var tmp = (655 +(9.6 * weight) + (1.8 * height) - (4.7 * y));
      if (category_id == 'hard' || category_id == 'normal') {
        tmp = (tmp * 1.375) - (tmp/100)*20;
      }
      else {
        tmp = (tmp * 1.375) + (tmp/100)*20;
      }
      this.caloriesInDay = Math.round(tmp);
      this.circledata = Math.round((this.circledata_cur / this.caloriesInDay) * 78);
      this.fatsInDay = Math.round(0.8 * weight);
      this.proteinsInDay = Math.round(1.2 * weight);
      this.carbohydratesInDay = Math.round(3 * weight);
      this.fats = Math.round((this.fats_cur / this.fatsInDay) * 100);
      this.protein = Math.round((this.protein_cur / this.proteinsInDay) * 100);
      this.crbd = Math.round((this.crbd_cur / this.carbohydratesInDay) * 100);
    })
  }
  check() { // ненужная функция для проверки
    this.circledata += 2;
  }

  check1(p){ // ненужная функция для проверки
    if (p == 0){
      this.fats+=5;
      console.log(this.fats);
    }
    else if( p == 1){
      this.protein+=5;
      console.log(this.protein);
    }
    else{
      this.crbd+=5;
      console.log(this.crbd);
    }
  }

  getFood(id){
    this._apiService.getFood(id, this.pipe.transform(Date.now(), 'dd.MM.yyyy')).subscribe((res:any) => {
      this.food = res;
      console.log(res);
      for(var i = 0; i < this.food.length; i++){
        this.imgurl.push({
          'background': 'url(http://178.49.124.232/' + res[i]['photo'] + ')',
          'background-size': 'cover',
          'background-repeat': 'no-repeat'
          })
      }
    }, (error:any) => {
      console.log(error);
    })
  }
}