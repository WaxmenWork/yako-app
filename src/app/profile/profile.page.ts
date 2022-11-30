import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthentificationService } from '../services/authentification.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  id:any;
  userdata:any = {};
  userdatamy:any = {};
  username:any;
  imgurl:any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _apiService: ApiService,
    public authService: AuthentificationService
  ) {
    this.route.params.subscribe((param:any) => {
      this.id = param.id;
      this.userData(this.id);
    })
   }

  ngOnInit() {
  }

  async getImgId(id){
    this.authService.getImgById(id).subscribe((res:any) => {
      this.imgurl = {
        'background': 'url(http://178.49.124.232/' + res['photo'] + ')',
        'background-size': 'cover',
        'background-repeat': 'no-repeat'
    };
    });
  }

  deleteFriend(){
    this.authService.deleteFriend(this.userdatamy['id'], this.userdata['id']).subscribe((res:any)=>{
      console.log(res);
    }),(error: any) => {
      console.log("ERROR ===", error );
    };
  }

  userData(id){
    this._apiService.getUser(id).subscribe((res:any)=>{
      this.userdata = res[0];
      this.username = this.userdata['name'];
      this.getImgId(id);
    })
    this.authService.getUserByToken().subscribe((res:any) => {
      this.userdatamy = res[0];
    },(error: any) => {
    });};
    refresh(): void {
      window.location.reload();
    }
  }
