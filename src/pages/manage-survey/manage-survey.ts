'use strict'
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, DateTime } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the ManageSurveyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'manage-survey'
})
@Component({
  selector: 'page-manage-survey',
  templateUrl: 'manage-survey.html',
})
export class ManageSurveyPage {
  netscapeReleased = '1994-12-15T13:47:20.789';

  public form: any;
  public records: any;
  public name: string = '';
  public author: string = '';
  public docID: string = '';
  public timeStart: DateTime;
  public timeEnd: DateTime;
  public answer: string = '';
  public isEditable: boolean = false;
  private isDisappear: boolean = false;
  public title: string = "ADD A NEW SURVEY";
  private _COLL: string = "SURVEY";
  private answers: any = '';
  filterItems: any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public _FB: FormBuilder,
              public _DB: DatabaseProvider,
              private _ALERT: AlertController) {
    this.form = _FB.group({
      'name': ['', Validators.required],
      'author': ['', Validators.required]
    });

    if (navParams.get('isEdited')) {
      let record = navParams.get('record');

      this.name = record.survey.name;
      this.author = record.survey.author;
      this.docID = record.survey.id;
      this.isEditable = true;
      this.isDisappear = true;
      this.title = 'SURVEY INFOMATION';
    }

  }

  saveSurvey(value: any): void {
    let name: string = this.form.controls["name"].value,
      author: string = this.form.controls["author"].value;
    
    if (this.isEditable) {
      this._DB.updateDocument(this._COLL,
        this.docID,
        {
          name: name,
          author: author
        })
        .then((data) => {
          this.displayAlert('Success', 'The survey ' + name + ' was successfully updated');
        })
        .catch((error) => {
          this.displayAlert('Updating survey failed', error.message);
        });
    } else {
      this._DB.addDocument(this._COLL,
        {
          name: name,
          author: author
        })
        .then((data) => {
          this.clearForm();
          this.displayAlert('SURVEY ADDED', 'The survey ' + name + ' was successfully added');
        })
        .catch((error) => {
          this.displayAlert('Adding survey failed', error.message);
        });
    }
  }

  displayAlert(title: string,
    message: string): void {
    let alert: any = this._ALERT.create({
      title: title,
      subTitle: message,
      buttons: ['GOT IT!']
    });
    alert.present();
  }

  clearForm(): void {
    this.name = '';
    this.author = '';
  }

  // deleteSurvey(title: string, message: string): void {
  //   let alert: any = this._ALERT.create({
  //     title: 'DELETE SURVEY',
  //     message: 'Do you really want to delete this survey?',
  //     buttons: [{
  //       text: 'NO',
  //       handler: data => {
  //         console.log("No clicked!");
  //       }
  //     }, {
  //       text: 'YES',
  //       handler: () => {
  //         this._DB.deleteSurvey(this._COLL, this.docID)
  //         .then((data: any) => {
  //           this.displayAlert('Success', 'The survey ' + this.name + ' was successfully removed');
  //           this.clearForm();
  //         })
  //         .catch((error: any) => {
  //           this.displayAlert('Error', error.message);
  //         });
  //       }
  //     }]
  //   });
  //   alert.present();
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManageSurveyPage');
  }

}
