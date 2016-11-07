import { Component } from '@angular/core';
import { ViewController, NavParams, AlertController  } from 'ionic-angular';
import {NgForm } from '@angular/forms';

import { Note } from '../../models';


@Component({
  selector: 'page-note-detail',
  templateUrl: 'note-detail.html'
})
export class NoteDetailPage {

  note:Note;

  constructor(public view: ViewController,
              public alertCtrl: AlertController,
              public params: NavParams) {

      this.note = Object.assign({}, params.get('note'));

  }

  ionViewDidLoad() {
    console.log('NoteDetailPage -> ionViewDidLoad');
  }

  submitForm(form:NgForm){
    (form.dirty)?this.view.dismiss({data: this.note, action:'save'}):this.view.dismiss();
  }

  remove():void{
    let prompt = this.alertCtrl.create({
      title: 'Remove Note',
      message: "Are you sure you want to remove this note?",
      buttons: [
        {
          text: 'Cancel',
          handler: data=>{
            //do nothing, we canceled
          }
        },
        {
          text: 'Remove',
          handler: data => {
            this.view.dismiss({data:this.note, action:'remove'});
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
