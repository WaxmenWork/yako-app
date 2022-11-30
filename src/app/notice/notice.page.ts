import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.page.html',
  styleUrls: ['./notice.page.scss'],
})
export class NoticePage implements OnInit {
  userdata: any = [];
  notises: any = [];
  imgurl: any = [];
  ntid: any = [];
  constructor(public authService: AuthentificationService,
    public apiService: ApiService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.userdata = [];
    this.notises = []
    this.imgurl = [];
    this.ntid = [];
    this.userData();
  }

  agree(i){
    this.authService.userRequests(this.ntid[i], this.userdata[0]['id']).subscribe((res:any)=>{
      window.location.reload();
    });
  }

  disAgree(i){
    this.authService.deleteRequest(this.ntid[i], this.userdata[0]['id']).subscribe((res:any)=>{
      window.location.reload();
    });
  }

  showNotice(){
    this.authService.showNotices(this.userdata[0]['id']).subscribe((res:any)=>{
      console.log(res);
      if (res){
      for (let i = 0; i < res.length; i++){
        this.apiService.getUser(res[i]['user_id']).subscribe((res1:any)=>{
          this.ntid.push(res1[0]['id'])
          this.notises.push(res1[0]);
          this.authService.getImgById(res[i]['user_id']).subscribe((res2:any)=>{
            console.log(res2);
            this.imgurl.push({
              'background': 'url(http://178.49.124.232/' + res2['photo'] + ')',
              'background-size': 'cover',
              'background-repeat': 'no-repeat',
              'background-position': 'center'
              })
          })
        })
    }
  }
  })
  }
  async userData(){
    this.authService.getUserByToken().subscribe((res:any) => {
      this.userdata = res;
      this.showNotice();
    },(error: any) => {
    });};
    refresh(): void {
      window.location.reload();
  }
}
