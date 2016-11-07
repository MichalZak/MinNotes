import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { select, } from 'ng2-redux';

import { CallDetailPage } from '../call/call-detail-page';
import { DocActions } from '../../actions/doc-actions';
import { Call } from '../../models';


@Component({
  selector: 'page-call-page',
  templateUrl: 'call-page.html'
})
export class CallPage {

  constructor(public navCtrl: NavController, 
              public modalCtrl: ModalController, 
              public docActions: DocActions) {}

  @select(['calls']) calls$: Observable<Array<Call>>;

  ionViewDidLoad() {
    console.log('Hello CallPage Page???????????????????');
  }

  addItem(){
    console.log('CallPage -> addItem');

    let c:Call = {_id: this.docActions.generateId('call'), name:"New Call", type:'call'};
    this.docActions.save(c);
  }

  viewItem(call){
    let addModal = this.modalCtrl.create(CallDetailPage, {call:call});

    addModal.onDidDismiss((res) => {
      if(res){
        if(res.action == 'save')
          this.docActions.save(res.data);

        if(res.action == 'remove')
          this.docActions.remove(res.data);
      }
    });

    addModal.present();
  }

}
