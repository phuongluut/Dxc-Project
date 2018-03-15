import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { PropertyPage } from '../pages/property/property';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatabaseProvider } from '../providers/database/database';
import { HttpClientModule } from '@angular/common/http';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { LoginPage } from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { AuthProvider } from '../providers/auth/auth';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { SignupPage } from '../pages/signup/signup';
import { Validators, ReactiveFormsModule } from '@angular/forms';
import { auth } from 'firebase';
import { ManageSurveyPageModule } from '../pages/manage-survey/manage-survey.module';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { Facebook } from '@ionic-native/facebook';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AnwserPageModule } from '../pages/anwser/anwser.module';
import { ManageAnswerComponent } from '../components/manage-answer/manage-answer';
import { ResultPageModule } from '../pages/result/result.module';




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    PropertyPage,
    DashboardPage,
    ResetPasswordPage,
    SignupPage,
    ManageAnswerComponent
  ],
  imports: [ 
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    ManageSurveyPageModule,
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AnwserPageModule,
    ResultPageModule
  ],    
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    PropertyPage,
    DashboardPage,
    ResetPasswordPage,
    SignupPage,
    ManageAnswerComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider,
    AuthServiceProvider,
    AuthProvider,
    AngularFireAuth,
    Facebook
  ]
})
export class AppModule {}
