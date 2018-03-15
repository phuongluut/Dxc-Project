import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { PropertyPage } from '../pages/property/property';

import { environment } from '../environments/environment';
import firebase from 'firebase';
import { LoginPage } from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { ManageSurveyPage} from '../pages/manage-survey/manage-survey';
import { ResultPage } from '../pages/result/result';


@Component({
  selector: 'page-app',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(private menu: MenuController,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Quickpoll', component: ManageSurveyPage},
      { title: 'Logout', component: LoginPage }
    ];
    //1
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.rootPage = LoginPage;
        unsubscribe();
      } else {
        this.rootPage = HomePage;
        unsubscribe();
      }
    });
  }
  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    firebase.initializeApp(environment.firebase);
  }

  // openPage(page) {
  //   // Reset the content nav to have just this page
  //   // we wouldn't want the back button to show in this scenario
  //   this.nav.setRoot(page.component);
  // }
  goSurvey(){
    this.nav.setRoot(PropertyPage);
    this.menu.close();
    this.menu.swipeEnable(false);
    
  }
  goLogin() {
    this.nav.push(LoginPage);
    this.menu.close();
    this.menu.swipeEnable(false);
  }
}
