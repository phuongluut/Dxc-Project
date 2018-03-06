import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
/**
 * Generated class for the PropertyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'page-property'
})
@Component({
  selector: 'page-property',
  templateUrl: 'property.html',
})
export class PropertyPage {
  private _COLL: string = 'SURVEY';
  private _DOC: string = 'Xy76Re34SdFR1';
  private _CONTENT: any;
  public surveys: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private _DB: DatabaseProvider, private _ALERT: AlertController) {
    this._CONTENT = {
      name: "CAR",
      author: "Jayn Malik"
    }
  }

  ionViewDidEnter() {
    this.retrieveCollection();
  }

  generateCollectionAndSurvey(): void {
    this._DB.createAndPopulateSurvey(this._COLL,
      this._DOC,
      this._CONTENT)
      .then((data: any) => {
        console.dir(data);
      })
      .catch((error: any) => {
        console.dir(error);
      });
  }

  retrieveCollection(): void {
    this._DB.getSurveys(this._COLL)
      .then((data) => {
        if (data.length === 0) {
          this.generateCollectionAndSurvey();
        }
        else {
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
    this.navCtrl.push('manage-survey', { record: params, isEdited: true });
  }

  // deleteSurvey(obj): void {
  //   this._DB.deleteSurvey(this._COLL,
  //     obj.id)
  //     .then((data: any) => {
  //       this.displayAlert('Success', 'The survey ' + obj.city + ' was successfully removed');
  //     })
  //     .catch((error: any) => {
  //       this.displayAlert('Error', error.message);
  //     });
  // }

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

}
