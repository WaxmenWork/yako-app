import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  userdata: any = [];
  trainingItems: any = [];
  trainingUserItems: any = [];
  imgurlUSER: any = [];
  imgurlREC: any = [];
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
      this.getUserTraining(this.userdata[0]['category_id']);
      this.getRecTraining();
    },(error: any) => {
      //console.log("ERROR ===", error );
    });};

  async getRecTraining() {
    this._apiService.getTrainings().subscribe((res:any) => {
      this.trainingItems = res;
      for(var i = 0; i < this.trainingItems.length; i++){
        this.imgurlREC.push({
          'background': 'url(http://178.49.124.232/' + res[i]['photo'] + ')',
          'background-size': 'cover',
          'background-repeat': 'no-repeat'
          })
      }
      //console.log('SUCCESREC === ' + res);
    },(error:any) => {
      //console.log('ERRORREC === ' + error);
    })
  }
  async getUserTraining(category_id) {
    this._apiService.getOwnTraining(category_id).subscribe((res:any) => {
      this.trainingUserItems = res;
      for(var i = 0; i < this.trainingUserItems.length; i++){
        this.imgurlUSER.push({
          'background': 'url(http://178.49.124.232/' + res[i]['photo'] + ')',
          'background-size': 'cover',
          'background-repeat': 'no-repeat'
          })
      }
      
      //.log('SUCCESOWN === ' + res);
    },(error:any) => {
      //console.log('ERROROWN === ' + error);
    })
  }
}
