import { PropertyPage } from './../property/property';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheet } from 'ionic-angular';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { ActionSheetController } from 'ionic-angular/components/action-sheet/action-sheet-controller';
import * as $ from 'jquery';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  property: any;
  langs;
  langForm;

  item: any = this.navParams.get('item');

  constructor(public afd: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams,
    public toastCtrl: ToastController, public actionSheetCtrl: ActionSheetController) {
    // this.property = this.navParams.data;
    this.langForm = new FormGroup({
      "langs": new FormControl({ value: 'rust', disabled: false })
    });
  }
  doSubmit(event) {
    console.log('Submitting form', this.langForm.value);
    event.preventDefault();
  }
  goForm() {
    $('.createForm').toggleClass('showForm');
    $('.wrapper').addClass('showWrapper');
  }

  outForm() {
    $('.wrapper').removeClass('showWrapper');
    $('.createForm').removeClass('showForm');
  }

  
  }

