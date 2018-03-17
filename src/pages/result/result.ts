import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { AngularFirestore } from 'angularfire2/firestore';
import { ANSWER, DATA } from '../anwser/anwser';
import { HomePage } from '../home/home';
/**
 * Generated class for the ResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */



@IonicPage({
  name: 'chart-page'
})
@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {
  @ViewChild('pieCanvas') pieCanvas;
  pieChart: any;
  resultId: string;
  result: ANSWER[];
  answer?: ANSWER[];
  nameSurvey: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private firestore: AngularFirestore) {
  }

  ionViewDidLoad() {
    this.resultId = this.navParams.get('id');
    this.nameSurvey = this.navParams.get('name');
    this.answer = this.navParams.get('answer');
    console.log(this.nameSurvey);

    const firestores = this.firestore.collection<ANSWER>('RESULT');
    firestores.valueChanges().subscribe(res => {
      this.result = res.filter(ele => ele.surveyUid == this.resultId);
      console.log(this.result);

      this.getPieChart(this.result);

    })


  }

  getChart(context, chartType, data, options?) {
    return new Chart(context, {
      type: chartType,
      data: data,
      options: options
    });
  }
  getPieChart(dataPie: ANSWER[]) {
    let sourceCount = new Array<number>();
    let sourceAnswer = new Array<string>();

    dataPie.forEach(e => {
      sourceAnswer.push(e.answer);
      sourceCount.push(e.count);
    });
    console.log(sourceCount)
    let data = {
      labels: sourceAnswer,
      datasets: [
        {
          data: sourceCount,
          backgroundColor: ["#FF6384", "#E84162", "#FF6354", "#36A2EB", "#FFEF49", "#FFCE56", "#000", "#FF8D47", "#2CF6DB", "#E85B4E"],
        }]
    };

    return this.getChart(this.pieCanvas.nativeElement, "pie", data);
  }
  goHome() {
    this.navCtrl.setRoot(HomePage);
  }

}
