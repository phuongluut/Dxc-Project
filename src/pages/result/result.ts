import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { AngularFirestore } from 'angularfire2/firestore';
import { ANSWER } from '../anwser/anwser';
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
  result:ANSWER[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private firestore: AngularFirestore) {
  }

  ionViewDidLoad() {
    this.resultId = this.navParams.get('id');

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

    dataPie.forEach(e => {
      sourceCount.push(e.count);
    });
    console.log(sourceCount)
    let data = {
      labels: ["Red", "Blue", "Yellow"],
      datasets: [
        {
          data: sourceCount,
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
        }]
    };

    return this.getChart(this.pieCanvas.nativeElement, "pie", data);
  }

}
