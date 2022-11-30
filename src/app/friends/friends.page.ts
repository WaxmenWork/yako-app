import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {
  userdata: any = [];
  findName: any;
  foundUser: any;
  imgurl: any = [];
  imgurlfr: any = [];
  yourFriends: any = [];
  colorb: any;
  constructor(
    public authService: AuthentificationService,
    public apiService: ApiService
    
    ) { 
  }

  ionViewWillEnter() {
    this.imgurl = [];
    this.imgurlfr = [];
    this.yourFriends = [];
    this.foundUser = [];
    this.userData();
  }

  ngOnInit() {
  }


  showProfile(i){
    console.log(this.yourFriends);
  }

  friendReq(i){
    let canReq = false;
    if (!this.yourFriends){
      canReq = false;
    }
    else{
      canReq = true;
    }
    for (let n = 0; n < this.yourFriends.length; n++){
      if (this.foundUser[i]['id'] != this.yourFriends[n]['id']){
        canReq = false;
        this.colorb = "danger";
      }
    }
    if (canReq){
      this.authService.friendActivity(this.userdata[0]['id'], "request", this.foundUser[i]['id']).subscribe((res:any)=>{
      })
    }
  }

  findUser(){
    this.authService.getUserByName(this.findName).subscribe((res:any)=>{
      this.foundUser = [];
      this.imgurl = [];
      if (res){
        for (let i = 0; i < res.length; i++){
          if (res[i]['id'] != this.userdata[0]['id']){
            this.authService.getImgById(res[i]['id']).subscribe((res1:any)=>{
              console.log(res1);
              this.imgurl.push({
                'background': 'url(http://178.49.124.232/' + res1['photo'] + ')',
                'background-size': 'cover',
                'background-repeat': 'no-repeat',
                'background-position': 'center'
                })
            })
            this.foundUser.push(res[i]);
          }
        }
      }
    })
    
  }

  showFriends(){
    this.authService.getFriendsById(this.userdata[0]['id']).subscribe((res:any)=>{
      
      for (let i = 0; i < res.length; i++){
        if (res[i]['friend_id'] != this.userdata[0]['id']){
          this.apiService.getUser(res[i]['friend_id']).subscribe((res1:any)=>{
            this.yourFriends.push(res1[0]);
            this.authService.getImgById(res[i]['friend_id']).subscribe((res2:any)=>{
              this.imgurlfr.push({
                'background': 'url(http://178.49.124.232/' + res2['photo'] + ')',
                'background-size': 'cover',
                'background-repeat': 'no-repeat'
                })
            })
          })
        }
      }
    },(error: any) => {
      console.log("ERROR ===", error );
    });
  }
  
  async userData() {
    this.authService.getUserByToken().subscribe((res:any) => {
      this.userdata = res;
      this.showFriends();
    },(error: any) => {
    });};
    refresh(): void {
      window.location.reload();
  }
}
