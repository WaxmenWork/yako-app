import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
userdata: any = [];
dietItems: any = [];
dietUserItems: any = [];
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
      this.getUserDiet(this.userdata[0]['category_id']);
      this.getRecDiet();
    },(error: any) => {
      //console.log("ERROR ===", error );
    });};

  async getRecDiet() {
    this._apiService.getDiet().subscribe((res:any) => {
      this.dietItems = res;
      for(var i = 0; i < this.dietItems.length; i++){
        this.imgurlREC.push({
          'background': 'url(http://178.49.124.232/' + res[i]['photo'] + ')',
          'background-size': 'cover',
          'background-repeat': 'no-repeat'
          })
      }
      console.log('SUCCESREC === ' + res);
    },(error:any) => {
      console.log('ERRORREC === ' + error);
    })
  }
  async getUserDiet(category_id) {
    this._apiService.getOwnDiet(category_id).subscribe((res:any) => {
      this.dietUserItems = res;
      for(var i = 0; i < this.dietUserItems.length; i++){
        this.imgurlUSER.push({
          'background': 'url(http://178.49.124.232/' + res[i]['photo'] + ')',
          'background-size': 'cover',
          'background-repeat': 'no-repeat'
          })
          console.log('PHOTO === ' + res[i]['photo']);
      }
      
      //console.log('SUCCESOWN === ' + res);
    },(error:any) => {
      //console.log('ERROROWN === ' + error);
    })
  }
}
