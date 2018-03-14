import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { DashboardPage } from '../dashboard/dashboard';
import { Facebook } from '@ionic-native/facebook';
import { DatabaseProvider } from '../../providers/database/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private _COLL: string = '';
  private _DOC: string = '';
  private _CONTENT: any;
  public surveys: any;
  filterItems: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private _DB: DatabaseProvider, private _ALERT: AlertController) {
    this._COLL = "SURVEY";
    this._CONTENT = {
      name: "",
      author: "",
      timeStart: "",
      timeEnd: ""
    }
  }

  ionViewDidEnter() {
    this.retrieveCollection();
  }

  //function search
  getItems(input: any) {
    let searchKeyword = input.target.value;
    if (searchKeyword != null) {
      this.filterItems = this.surveys.filter(survey => survey.author.toLowerCase().indexOf(searchKeyword.toLowerCase()) > -1);
      console.log(this.filterItems);

    }
    else {
      this.filterItems = this.surveys;

    }
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
    this._DB.getDocuments(this._COLL)
      .then((data) => {
        if (data.length === 0) {
          this.generateCollectionAndSurvey();
        }
        else {
          this.filterItems = data;
          this.surveys = data;
        }
      })
      .catch();
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
