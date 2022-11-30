import { Component } from '@angular/core';
import { TextFieldTypes } from '@ionic/core';
import { AlertController } from '@ionic/angular';
import { IonDatetime } from '@ionic/angular';
import { AuthentificationService } from '../services/authentification.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})

export class Tab2Page {
  ml: any = 0;
  n: any = 0;
  activeValue: any = 330;
  historyOfDrinks: any = [];
  userdata: any = [];
  pipe: DatePipe = new DatePipe('en-US');
  needValue: any;
  disorno: any;
  poswater: any;
  st:any;
  constructor(
    private alertController: AlertController,
    public authService: AuthentificationService
  ) {
    this.userData();
    
  }
  async addWater(){
    if (this.activeValue == 0){
      this.activeValue = 330;
    }
    let tmp = {
      'time': String(new Date().getHours()) + ":" + String(new Date().getMinutes())+ ":" + String(new Date().getSeconds()),
      'historyValue': this.activeValue,
      'id': this.userdata[0]['id'],
      'date': this.pipe.transform(Date.now(), 'dd.MM.yyyy')
    }
    if (this.n < 100){
      this.authService.sendWaterHistory(tmp).subscribe((response:any)=>{
        this.changeForm("add");
      });
    }else{
      const alert = await this.alertController.create({
        cssClass: 'secondary',
        header: "Не пейте слишком много воды!",
        subHeader: "Это опасно!",
        buttons: [{ text: 'OK',}]
      });
  
      await alert.present();
    }
  }

  async deleteHistory(id, index){
    return this.authService.deleteWaterHistory(id).subscribe((response:any)=>{
      this.disorno = false;
      let volume = response['volume'];
      this.changeForm("delete", index, volume);
    });
  }

  async changeForm(reason, id = 0, volume = 0){
    this.authService.waterHistoryGet(this.pipe.transform(Date.now(), 'dd-MM-yyyy')).subscribe(async (response:any) =>{
      if (response['status'] != "DataBase is empty"){
        switch (reason){
          case 'delete': { 
            this.ml -= this.historyOfDrinks[id]['volume'];
            break;
          }
          case 'add': { 
            this.ml += this.activeValue; 
            break;
          }
          default: {
            this.historyOfDrinks = response;
            for (let i = 0; i < this.historyOfDrinks.length; i++){
              this.ml += this.historyOfDrinks[i]['volume'];
            }
          }
        }
        this.historyOfDrinks = response;
      }
      else if(response['status'] == "DataBase is empty" && reason != "check"){
        this.historyOfDrinks = [];
        this.ml -= volume;
      }
      this.n = (this.ml / (this.needValue/100)).toFixed(2);
      if (this.n > 100){
        this.n = 100;
      }
      this.st = { 
        'transform': "translate(0, " + Math.abs(150-Math.trunc((this.n / 100)*150)) + "px)"
      }
    })
  }

  changeValue(){
    this.presentAlert();
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'secondary',
      subHeader: "Введите объём выпитой воды",
      inputs: [
        {
          name: 'value',
          type: 'number',
          value: 0,
          placeholder: 'Введите объём выпитой воды',
          attributes: {
            inputmode: 'decimal'
          }
        }],
      buttons: [{
        text: 'OK',
        handler: (placeholder) => {
          this.activeValue = Number(placeholder['value']);
      }}]
    });

    await alert.present();
  }

  async userData() {
    this.authService.getUserByToken().subscribe((res:any) => {
      this.userdata = res;
      this.changeForm('check');
      this.needValue = ((this.userdata[0]['weight'] * 0.03 + 2 * 0.5) * 1000);
    },(error: any) => {
    });};
    refresh(): void {
      window.location.reload();
  }
}
