import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Storage } from '@capacitor/storage';
import { LoadingController, AlertController } from '@ionic/angular';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { map, tap, switchMap} from 'rxjs/operators';

const TOKEN_KEY = 'my-token';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';

  constructor(private http: HttpClient,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router) {
    this.loadToken();
  }

  async loadToken() {
    const token = await Storage.get({key: TOKEN_KEY});
    if (token && token.value) {
      this.token = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }
  async deleteLogged() {
    return this.http.delete('http://178.49.124.232/deleteLogged.php?token='+this.token).subscribe((res:any) =>{
      console.log('SUCKYES ===', res);
    }, (error:any) =>{
      console.log('YEYO ===', error);
    });
}

  showNotices(id){
    return this.http.get('http://178.49.124.232/showNoticed.php?id='+id);
  }

  getFriendsById(id){
    return this.http.get('http://178.49.124.232/getUsersFriends.php?id='+id);
  }

  friendActivity(id, reason, frid){
    return this.http.get('http://178.49.124.232/friendsActivity.php?id='+id+'&reason='+reason+"&frid="+frid);
  }

  deleteFriend(idf, id){
    return this.http.get('http://178.49.124.232/deleteFriend.php?id='+id+"&frid="+idf);
  }

  getUserByName(name){
    return this.http.get('http://178.49.124.232/getUserByName.php?name='+name)
  }
  sendImage(image, id) {
    return this.http.post('http://178.49.124.232/getImage.php?id='+id, image)
  }

  async createFood(image, food) {
    const loading = await this.loadingController.create();
    await loading.present();
    let string = 'title='+food['title']+'&calories='+food['calories']+'&category_id='+food['category_id']+'&user_id='+food['user_id']+'&date='+food['date'];
    return this.http.post('http://178.49.124.232/createFood.php?'+string, image).subscribe(async (response:any) => {
      for(var i = 0; i < food['ingridients'].length; i++){
        let string2 = 'ingridient='+food['ingridients'][i]['ingridient']+'&fats='+food['ingridients'][i]['fats']+'&proteins='+food['ingridients'][i]['proteins']+'&carbohydrates='+food['ingridients'][i]['carbohydrates']+'&food_id='+response['id'];
        this.http.get('http://178.49.124.232/createIngridient.php?'+string2).subscribe( async (response:any) => {
        console.log(response);
        this.router.navigateByUrl('/tabs', {replaceUrl: true});
        await loading.dismiss();
        // const alert = await this.alertController.create({
        //   cssClass: 'secondary',
        //   header: 'Готово',
        //   message: 'Блюдо успешно добавлено!',
        //   buttons: [{
        //     text: 'Ок',
        //     handler: (placeholder) => {
        //       window.location.reload();
        //   }}]
        // });
      }, async (error:any) => {
        console.log("ERROR ===", error );
        await loading.dismiss();
        const alert = this.alertController.create({
        header: 'Ошибка',
        message: 'Введены неверные данные',
        buttons: ['Ок'],
      });
      (await alert).present();
      });
      }
    }, async (error:any) => {
        console.log("ERROR ===", error );
        await loading.dismiss();
        const alert = this.alertController.create({
        header: 'Ошибка',
        message: 'Введены неверные данные',
        buttons: ['Ок'],
      });
      (await alert).present();
      });
  }

  updateUser(userData){
    return this.http.post('http://178.49.124.232/updateUser.php', userData);
  }

  waterHistoryGet(date){
    return this.http.get('http://178.49.124.232/waterHistoryGet.php?date='+ date);
  }

  deleteWaterHistory(id){
    return this.http.get('http://178.49.124.232/deleteWaterHistory.php?id='+ id);
  }

  sendWaterHistory(waterData){
    return this.http.post('http://178.49.124.232/waterHistorySend.php', waterData);
  }

  userRequests(id, userid){
    return this.http.get('http://178.49.124.232/requestAg.php?id='+ id + "&uid=" + userid);
  }

  deleteRequest(id, userid){
    return this.http.get('http://178.49.124.232/deleteRequest.php?id='+ id + "&uid=" + userid);
  }

  getImgById(id){
    return this.http.get('http://178.49.124.232/getImgById.php?id='+id);
  }

  getUserByToken() {
    //console.log('super token: ' + this.token);
    return this.http.get('http://178.49.124.232/getUserByToken.php?token='+this.token);
}

  login(credentials: {email, password}): Observable<any> {
    return this.http.post('http://178.49.124.232/login.php', credentials, {reportProgress: true, responseType: 'json'}).pipe(
      map((data: any) => {
        let token = data.token;
        let id = data['0'].id;
        let post_data = {id: id, token: token}
        this.http.post('http://178.49.124.232/logged.php', post_data).subscribe((res:any) => {
          //console.log("SUCCESS1 ===", res);
        },(error: any) => {
          //console.log("ERROR1 ===", error );
        });
        return from(Storage.set({key: TOKEN_KEY, value: token}));
      }),
      tap(_ => {
        this.isAuthenticated.next(true);
      }),
    )
  }

  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    this.deleteLogged();
    return Storage.remove({key: TOKEN_KEY});
  }

}
