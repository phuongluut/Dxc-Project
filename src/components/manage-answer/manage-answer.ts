import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'manage-answer',
  templateUrl: 'manage-answer.html'
})
export class ManageAnswerComponent {
  _ref: any;
  text: string;
  answer: string;

  constructor() {
    console.log('Hello ManageAnswerComponent Component');
    this.text = 'Hello World';
  }
  
  removeAnswer() {
    this._ref.destroy();
  }

}
