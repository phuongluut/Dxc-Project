'use strict'
import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { DatabaseProvider } from '../../providers/database/database';
import { Result } from './answer.interface';
import * as firebase from 'firebase';
import { ManageAnswerComponent } from "../../components/manage-answer/manage-answer";
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
export class ManageSurveyPage implements OnInit {
  @ViewChild('answer', { read: ViewContainerRef })
  container: ViewContainerRef;

  public form: FormGroup;
  public records: any;
  public name: string = '';
  public author: string = '';
  public docID: string = '';
  public timeStart: any;
  public timeEnd: any;
  // public answers: any;
  public isEditable: boolean = false;
  private isDisappear: boolean = false;
  public title: string = "";
  private _COLL: string = "";
  private surveyUid: string;
  private userUid: string;
  private answerUid: string;
  filterItems: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public _FB: FormBuilder,
    public _DB: DatabaseProvider,
    private _ALERT: AlertController, private _cfr: ComponentFactoryResolver) {
    this.timeStart = this.calculateTime('+7');
    this.timeEnd = this.calculateTime('+7');
    this._COLL = "SURVEY";  
  }

  calculateTime(offset: any) {
    // create Date object for current location
    let d = new Date();

    // create new Date object for different city
    // using supplied offset
    let nd = new Date(d.getTime() + (3600000 * offset));

    return nd.toISOString();
  }

  // Determine if the client uses DST
  stdTimezoneOffset(today: any) {
    let jan = new Date(today.getFullYear(), 0, 1);
    let jul = new Date(today.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
  }

  dst(today: any) {
    return today.getTimezoneOffset() < this.stdTimezoneOffset(today);
  }

  ngOnInit(): void {
    // throw new Error("Method not implemented.");
    this.form = this._FB.group({
      'name': ['', Validators.required],
      'author': [firebase.auth().currentUser.email, Validators.required],
      'timeStart': ['', Validators.required],
      'timeEnd': ['', Validators.required],
      // 'answers': this._FB.group({
      //   answer: ['', Validators.required]
      // })
    });
  }

  // initAnswer() {
  //   return this._FB.group({
  //     answer: ['', Validators.required]
  //   })
  // }

  addAnswer() {
    var comp = this._cfr.resolveComponentFactory(ManageAnswerComponent);
    var manageAnswerComponent = this.container.createComponent(comp);
    manageAnswerComponent.instance._ref = manageAnswerComponent;
  }

  // removeAnswer(i: number) {
  //   const control = <FormArray>this.form.controls['answers'];
  //   control.removeAt(i);
  // }
  
  saveSurvey(value: any, id: number): void {
    let getValue = {
      name: this.form.controls["name"].value,
      author: this.form.controls["author"].value,
      timeStart:  this.form.controls["timeStart"].value,
      timeEnd: this.form.controls["timeEnd"].value
    }    
      this._DB.addDocument(this._COLL, getValue)
        .then((data) => {
          data.set({
            userUid: firebase.auth().currentUser.uid,
            surveyUid: data.id,
            name: getValue.name,
            author: getValue.author,
            timeStart: getValue.timeStart,
            timeEnd: getValue.timeEnd
          })
          this.clearForm();
          this.displayAlert('SURVEY ADDED', 'The survey ' + getValue.name + ' was successfully added');
        })
        .catch((error) => {
          this.displayAlert('Adding survey failed', error.message);
        });
  }

  displayAlert(title: string,
    message: string): void {
    this.title = "ADD A NEW SURVEY";
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
    this.timeStart = '';
    this.timeEnd = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManageSurveyPage');
  }

}
