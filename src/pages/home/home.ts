import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { DashboardPage } from '../dashboard/dashboard';
import { Facebook } from '@ionic-native/facebook';
import { DatabaseProvider } from '../../providers/database/database';
import { AnwserPage, History } from '../anwser/anwser'; 
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';

export interface TemplateSurvey{
  name:string,
  surveyUid:string,
  userUid:string
}
export interface SURVEY{
  data: TemplateSurvey,
  author:string
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  users:any[];
  private _COLL: string = '';
  private _DOC: string = '';
  private _CONTENT: any;
  public surveys: any;
  filterItems: any;
  constructor(public navCtrl: NavController,
    public firestore: AngularFirestore, public navParams: NavParams, private _DB: DatabaseProvider, private _ALERT: AlertController) {
    this._COLL = "SURVEY";
    this._CONTENT = {
      name: "",
      timeStart: "",
      timeEnd: "",
      id: ""
    }
  }
  goAnswer(id,name) {
    
    console.log(name);
    let userId= firebase.auth().currentUser.uid;
    this.firestore.collection<History>('HISTORY').valueChanges().subscribe(res => {
      let filter = res.find(ele => {        
        if (ele.surveyUid.indexOf(id) > -1 && ele.userId == userId){
          return true;
        }
      });
      // console.log("dsadasfjklklwdjkjjklgh", filter, userId);
      if (filter){
        this.navCtrl.setRoot('chart-page', { id }); 
      }else{
        this.navCtrl.push('answer-page', { id, name });
      }
    })        
  }
  ionViewDidEnter() {
    this.getUsers();
    this.retrieveCollection();
  }

  //function search
  getItems(input: any) {
    let searchKeyword = input.target.value;
    if (searchKeyword != null) {
      this.filterItems = this.surveys.filter(survey => survey.name.toLowerCase().indexOf(searchKeyword.toLowerCase()) > -1);
      console.log(this.filterItems);

    }
    else {
      this.filterItems = this.surveys;
      console.log(this.filterItems);

    }
  }

  getUsers(){
    this.firestore.collection('USER').valueChanges().subscribe(users => {
      this.users = users;
      
    });
    
  }

  generateCollectionAndSurvey(): void {
    this._DB.createAndPopulateDocument(this._COLL,
      this._DOC, this._CONTENT)
      .then((data: any) => {
        console.dir(data);
      })
      .catch((error: any) => {
        console.dir(error);
      });
  }

  retrieveCollection(): void {
    this.firestore.collection<TemplateSurvey>('SURVEY').valueChanges().subscribe(surveys =>{
      let sourceSurveys:SURVEY[] = surveys.map(survey => {
        console.log("testing user", this.users);
        
        let author = this.users.find(user => {
          console.log(user.userUid.indexOf(survey.userUid) > -1)
          return user.userUid.indexOf(survey.userUid) > -1
        })
        return {data:survey,author:author}
      })
      this.filterItems = sourceSurveys;
      this.surveys = sourceSurveys;
      console.log(this.surveys);
      
    })
  }

  addSurvey(): void {
    this.navCtrl.push('manage-survey');
  }

  updateSurvey(obj): void {
    let params: any = {
      collection: this._COLL,
      survey: obj
    };
    this.navCtrl.push('answer', { record: params, isEdited: true });
  }

  deleteSurvey(obj): void {
    this._DB.deleteDocument(this._COLL,
      obj.id)
      .then((data: any) => {
        this.retrieveCollection();
        // this.displayAlert('Success', 'The survey ' + '"' + obj.name + '"' + ' was successfully removed');
      })
      .catch((error: any) => {
        this.displayAlert('Error', error.message);
      });
  }

  displayAlert(title: string, message: string): void {
    let alert: any = this._ALERT.create({
      title: title,
      subTitle: message,
      buttons: [{
        text: 'Got It!',
        handler: () => {
          this.retrieveCollection();
        }
      }]
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PropertyPage');
  }

  goDashboardPage() {
    this.navCtrl.push(DashboardPage);
  }
}
