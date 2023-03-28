import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    headers: HttpHeaders;
    constructor(
        public http: HttpClient,
    ) {
        this.headers = new HttpHeaders();
        this.headers.append("Accept",'application/json');
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Access-Control-Allow-Origin', '*');
    }

    addUser(data) {
        return this.http.post('http://localhost/create.php', data);
    }
    getUsers() {
        return this.http.get('http://localhost/getUsers.php');
    }
    getFood(id, date) {
        return this.http.get('http://localhost/getFood.php?id='+id+'&date='+date);
    }
    getFoodItem(id) {
        return this.http.get('http://localhost/getFoodItem.php?id='+id);
    }
    deleteFoodItem(id, date) {
        return this.http.delete('http://localhost/deleteFood.php?id='+id+'&date='+date);
    }
    getFoodIngridients(food_id) {
        return this.http.get('http://localhost/getFoodIngridients.php?food_id='+food_id);
    }
    getDiet(){
        return this.http.get('http://localhost/getDiet.php');
    }
    getOwnDiet(category_id){
        return this.http.get('http://localhost/getOwnDiet.php?category_id='+category_id);
    }
    getDietItem(id) {
        return this.http.get('http://localhost/getDietItem.php?id='+id);
    }
    getDietFood(diet_id) {
        return this.http.get('http://localhost/getDietFood.php?diet_id='+diet_id);
    }
    getDietFoodConf(user_id, diet_id, food_id, date){
        return this.http.get('http://localhost/getDietFoodConf.php?user_id='+user_id+'&diet_id='+diet_id+'&food_id='+food_id+'&date='+date);
    }
    sendDietFoodConf(data){
        return this.http.post('http://localhost/sendDietFoodConf.php', data);
    }
    getUserFoodStat(user_id, date){
        return this.http.get('http://localhost/getUserFoodStat.php?user_id='+user_id+'&date='+date);
    }
    getUserFoodIngridientsStat(food_id){
        return this.http.get('http://localhost/getUserFoodIngridientsStat.php?food_id='+food_id);
    }
    getTrainings(){
        return this.http.get('http://localhost/getTrainings.php');
    }
    getOwnTraining(category_id){
        return this.http.get('http://localhost/getOwnTrainings.php?category_id='+category_id);
    }
    getTrainingItem(id) {
        return this.http.get('http://localhost/getTrainingItem.php?id='+id);
    }
    getTrainingGyms(training_id) {
        return this.http.get('http://localhost/getTrainingGyms.php?training_id='+training_id);
    }
    login(data) {
        return this.http.post('http://localhost/login.php', data, {reportProgress: true, responseType: 'json'});
    }
    getUser(id) {
        return this.http.get('http://localhost/getUser.php?id='+id);
    }
}
