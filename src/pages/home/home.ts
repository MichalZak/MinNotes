import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { select, } from 'ng2-redux';

import { NoteDetailPage } from '../note-detail';
//import { NoteActions } from '../../actions/note-actions';
import { DocActions } from '../../actions/doc-actions';
import { Note } from '../../models';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, 
              public modalCtrl: ModalController, 
              //public ngRedux: NgRedux<IAppState>,
              //public noteActions: NoteActions,
              public docActions: DocActions) {

  }

  @select(['notes']) notes$: Observable<Array<Note>>;
  


  ionViewDidLoad(){
    console.log('Home-> ionViewDidLoad');
  }

  addItem(){
    console.log('HomePage -> addItem');

    //this.noteActions.test();

    let n:Note = {_id: this.docActions.generateId('note'), title:"New Note", type:'note', note:"", date:new Date()};
    this.docActions.save(n);
  }

  viewItem(note){
    let addModal = this.modalCtrl.create(NoteDetailPage, {note:note});

    addModal.onDidDismiss((res)=>{
      if(res){
        if(res.action === 'save')
          this.docActions.save(res.data);

        if(res.action === 'remove')
          this.docActions.remove(res.data);
      }
    });

    addModal.present();
  }



}
