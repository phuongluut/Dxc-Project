import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { DashboardPage } from '../dashboard/dashboard';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public authProvider: AuthProvider) {

  }
  logoutUser(){
    // console.log('sơn');
    this.authProvider.logoutUser();
    return LoginPage;
  }
  goDashboard() {
    this.navCtrl.push(DashboardPage);
  }
}
