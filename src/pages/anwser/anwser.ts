import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { PagesAnwserFilterPipe } from '../../pipes/pages-anwser-filter/pages-anwser-filter';
import {
  FormGroup,
  FormControl
} from '@angular/forms';
import { HomePage } from '../home/home';
import { DatabaseProvider } from '../../providers/database/database';
import * as firebase from 'firebase';
/**
 * Generated class for the AnwserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export interface DATA {
  answers: Array<any>,
  author: any,
  name: string,
  surveyUid: string

}
export interface History {
  key?:string,
  userId:string,
  surveyUid: string
}
export interface ANSWER {
  answer?: string,
  count?: number,
  surveyUid?: string,
  answerUid?: string
}

@IonicPage({
  name: 'answer-page'
})

@Component({
  selector: 'page-anwser',
  templateUrl: 'anwser.html',
})
export class AnwserPage {
  
  theanswer: ANSWER;
  result: any[];
  resultId:string;
  answerForm;
  listanswer;
  nameSurvey:string;
  survey: Array<object>;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public firestore: AngularFirestore) {
    this.answerForm = new FormGroup({
      "listanswer": new FormControl({ value: 'rust', disabled: false })
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AnwserPage');
    this.nameSurvey = this.navParams.get('name');
    this.resultId = this.navParams.get('id');
    console.log(this.nameSurvey);
    
    const firestores = this.firestore.collection<ANSWER>('RESULT');
    firestores.valueChanges().subscribe(res => {
      this.result = res.filter(ele => ele.surveyUid == this.resultId)
      console.log(this.result);

    })
  }

  addAnswer(tAnswer: ANSWER) {
    let userId = firebase.auth().currentUser.uid;
    if (tAnswer.count === undefined) {
      tAnswer.count = 1;
    }
    else {
      tAnswer.count += 1;
    }
    let tempHistory:History = {
      userId: userId,
      surveyUid: tAnswer.surveyUid
    }
    this.firestore.collection('HISTORY').add(tempHistory);
    this.firestore.doc(`RESULT/${tAnswer.answerUid}`).update(tAnswer);

  }
  getValueradio(dataAnswer: DATA[], surveyId: string) {
    let sourceAnswer = new Array<DATA>();
    dataAnswer.forEach(e => {
      sourceAnswer.push(e);
    });

    sourceAnswer = sourceAnswer.filter(ans => ans.surveyUid === surveyId)

    // console.log(surveyId, sourceAnswer[0].answers);
    return sourceAnswer[0].answers;
  }
    




}
