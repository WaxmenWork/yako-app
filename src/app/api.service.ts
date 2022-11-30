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
        return this.http.post('http://178.49.124.232/create.php', data);
    }
    getUsers() {
        return this.http.get('http://178.49.124.232/getUsers.php');
    }
    getFood(id, date) {
        return this.http.get('http://178.49.124.232/getFood.php?id='+id+'&date='+date);
    }
    getFoodItem(id) {
        return this.http.get('http://178.49.124.232/getFoodItem.php?id='+id);
    }
    deleteFoodItem(id, date) {
        return this.http.delete('http://178.49.124.232/deleteFood.php?id='+id+'&date='+date);
    }
    getFoodIngridients(food_id) {
        return this.http.get('http://178.49.124.232/getFoodIngridients.php?food_id='+food_id);
    }
    getDiet(){
        return this.http.get('http://178.49.124.232/getDiet.php');
    }
    getOwnDiet(category_id){
        return this.http.get('http://178.49.124.232/getOwnDiet.php?category_id='+category_id);
    }
    getDietItem(id) {
        return this.http.get('http://178.49.124.232/getDietItem.php?id='+id);
    }
    getDietFood(diet_id) {
        return this.http.get('http://178.49.124.232/getDietFood.php?diet_id='+diet_id);
    }
    getDietFoodConf(user_id, diet_id, food_id, date){
        return this.http.get('http://178.49.124.232/getDietFoodConf.php?user_id='+user_id+'&diet_id='+diet_id+'&food_id='+food_id+'&date='+date);
    }
    sendDietFoodConf(data){
        return this.http.post('http://178.49.124.232/sendDietFoodConf.php', data);
    }
    getUserFoodStat(user_id, date){
        return this.http.get('http://178.49.124.232/getUserFoodStat.php?user_id='+user_id+'&date='+date);
    }
    getUserFoodIngridientsStat(food_id){
        return this.http.get('http://178.49.124.232/getUserFoodIngridientsStat.php?food_id='+food_id);
    }
    getTrainings(){
        return this.http.get('http://178.49.124.232/getTrainings.php');
    }
    getOwnTraining(category_id){
        return this.http.get('http://178.49.124.232/getOwnTrainings.php?category_id='+category_id);
    }
    getTrainingItem(id) {
        return this.http.get('http://178.49.124.232/getTrainingItem.php?id='+id);
    }
    getTrainingGyms(training_id) {
        return this.http.get('http://178.49.124.232/getTrainingGyms.php?training_id='+training_id);
    }
    login(data) {
        return this.http.post('http://178.49.124.232/login.php', data, {reportProgress: true, responseType: 'json'});
    }
    getUser(id) {
        return this.http.get('http://178.49.124.232/getUser.php?id='+id);
    }
}
