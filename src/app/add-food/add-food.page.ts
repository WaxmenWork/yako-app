import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { isEmpty } from 'rxjs/operators';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthentificationService } from '../services/authentification.service';
import { FormGroup, FormBuilder,FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

const IMAGE_DIR = 'stored-images';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.page.html',
  styleUrls: ['./add-food.page.scss'],
})
export class AddFoodPage implements OnInit {

  items: any = [];
  food: any = {};
  ingridients: any;
  image: any;
  userdata: any = [];
  formData: FormData;
  pipe: DatePipe = new DatePipe('en-US');
  constructor( 
    private loadingCtrl: LoadingController, 
    private alertController: AlertController,
    private authService: AuthentificationService
    ) {
      this.userData();
    }

  ngOnInit() {
    this.items = ['item'];
  }

  async userData() {
    this.authService.getUserByToken().subscribe((res:any) => {
      //console.log("SUCCESS ===", res);
      this.userdata = res;
    },(error: any) => {
      //console.log("ERROR ===", error );
    });};

  async loadFiles(event) {
    const loading = await this.loadingCtrl.create();
    this.formData = new FormData ();
    await loading.present();
    this.image = event.target.files[0];
    if (this.image['type'] != "image/jpeg" && this.image['type'] != "image/png"){
      const alert = this.alertController.create({
        header: 'Ошибка ввода',
        message: 'Допустимые форматы файлов: jpeg, png',
        buttons: ['Ок'], 
      });
      await loading.dismiss();
      (await alert).present();

    }
    else{
      await loading.dismiss();
      console.log(this.image);
      this.formData.append('image', this.image);
  }
}

  addItem() {
    this.items.push('item');
  }
  
  submit(myForm: NgForm) {
    this.food = {
      title: myForm.value['title'],
      calories: myForm.value['calories'],
      category_id: myForm.value['category_id'],
      user_id: this.userdata[0]['id'],
      date: this.pipe.transform(Date.now(), 'dd.MM.yyyy'),
      ingridients: []
    }
    for(var i = 0; i < this.items.length; i++) {
      let ingridient = 'ingridient_' + i;
      let fats = 'fats_' + i;
      let proteins = 'proteins_' + i;
      let carbohydrates = 'carbohydrates_' + i;
      this.food['ingridients'].push({
        ingridient: myForm.value[ingridient],
        fats: myForm.value[fats],
        proteins: myForm.value[proteins],
        carbohydrates: myForm.value[carbohydrates]
      });
    }
    console.log(JSON.stringify(this.food));
    this.authService.createFood(this.formData, this.food);
  }

}
