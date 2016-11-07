import { Component } from '@angular/core';
import { ViewController, NavParams, AlertController  } from 'ionic-angular';
import {NgForm } from '@angular/forms';
import * as moment from 'moment';

import { Call } from '../../models';


@Component({
  selector: 'page-call-detail-page',
  templateUrl: 'call-detail-page.html'
})
export class CallDetailPage {

  call:Call;
  myDate;
  startDate;

  constructor(public view: ViewController,
              public alertCtrl: AlertController,
              public params: NavParams) {

    this.call = Object.assign({}, params.get('call'));
    
    this.myDate = this.call.date == null?moment(moment().format(), moment.ISO_8601).format():this.call.date;
    console.log('myDate: '+this.myDate);
  }

  ionViewDidLoad() {
    console.log('Hello CallDetailPage Page');
  }

  onDateFocus(e){
    console.log('CallDetailPage->dateSelected e: '+JSON.stringify(e));
    //make sure that we don't have a blank date 
    if(this.call.date == null)
    {
      this.call.date == new Date();
    }
  }

  submitForm(form:NgForm){
    (form.dirty)?this.view.dismiss({data:this.call, action:'save'}):this.view.dismiss();
  }

  remove():void{
    let prompt = this.alertCtrl.create({
      title: 'Remove Call',
      message: "Are you sure you want to remove this call?",
      buttons: [
        {
          text: 'Cancel',
          handler: data=>{}//do nothing, just leave
        },
        {
          text: 'Remove',
          handler: data => {
            this.view.dismiss({data:this.call, action:'remove'});
          }
        }
      ]
    });
    prompt.present();
  }

  close(){
    this.view.dismiss();
  }

}
