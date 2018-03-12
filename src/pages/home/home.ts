import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { DashboardPage } from '../dashboard/dashboard';
import { Facebook } from '@ionic-native/facebook';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  // isLoggedIn: boolean = false;
  // users: any;
  constructor(public navCtrl: NavController, public authProvider: AuthProvider, public fb: Facebook) 
  {
    // fb.getLoginStatus()
    //   .then(res => {
    //     console.log(res.status);
    //     if (res.status === "connect") {
    //       this.isLoggedIn = true;
    //     } else {
    //       this.isLoggedIn = false;
    //     }
    //   })
    //   .catch(e => console.log(e));
  }
  logoutUser(){
    // console.log('sơn');
    this.authProvider.logoutUser();
    return LoginPage;
  }
  goDashboard() {
    this.navCtrl.push(DashboardPage);
  }
  //Login FB2

  // login() {
  //   this.fb.login(['public_profile', 'user_friends', 'email'])
  //     .then(res => {
  //       if (res.status === "connected") {
  //         this.isLoggedIn = true;
  //         this.getUserDetail(res.authResponse.userID);
  //       } else {
  //         this.isLoggedIn = false;
  //       }
  //     })
  //     .catch(e => console.log('Error logging into Facebook', e));
  // }
  // logout() {
  //   this.fb.logout()
  //     .then(res => this.isLoggedIn = false)
  //     .catch(e => console.log('Error logout from Facebook', e));
  // }

  // getUserDetail(userid) {
  //   this.fb.api("/" + userid + "/?fields=id,email,name,picture,gender", ["public_profile"])
  //     .then(res => {
  //       console.log(res);
  //       this.users = res;
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // }

  //End
}
