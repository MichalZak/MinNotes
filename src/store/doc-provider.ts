import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';  
import PouchDB from 'pouchdb';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mapTo';

import { DocActions } from '../actions/doc-actions';
import { Doc } from '../models';

@Injectable()
export class DocProvider {

  private db;
  changedDocs$;
  private changes;

  constructor(private platform: Platform,
              private docActions: DocActions ) {
    console.log('DataProvider Created');
  }


  //setup our effects
  //loadDocs$ = this.db.getAll().map(res=>({type:DocActions.LOAD_SUCCESS, data:res}));
       

  
   /*    
  public docEpics$ = Observable.concat(this.loadDocs$, this.changedDocs$);
  */
   /*     
 public testEpic$ = action$ =>
    action$.filter(action=>action.type === 'test')
    .delay(1000)
    .mapTo({type: 'test2111111'});
*/



  public addDoc$ = action$ => 
        action$.filter(action=>action.type === DocActions.SAVE)
        .do(res => console.log("addDoc$: "+JSON.stringify(res)))
        .do(res =>this.save(Object.assign({},res.data)))
        .mapTo( {type:'DOC_SAVE_INITIATED'});

  public removeDoc$ = action$ =>
        action$.filter(action => action.type === DocActions.REMOVE)
        .do(res => console.log("removeDoc$: "+JSON.stringify(res)))
        .do(res=>this.remove(res.data))
        .mapTo( {type:'DOC_REMOVE_INITIATED'});
        

  initDB():Promise<any> {
    console.log('DataProvider->initDB');
    return this.platform.ready().then(()=>{
      this.db = new PouchDB('notes');
      window['PouchDB'] = PouchDB;//make it visible for chrome extension
      this.getChanges();
    });
  }


  getAll() {
    console.log('DataProvider->getAll 222222222222222222222');
    this.initDB()
        .then(()=>{
          this.db.allDocs({include_docs: true, attachments: true})
            .then(res =>{
              this.docActions.loadSuccess(res.rows.map(res=>res.doc));
            })
            .catch(err =>{
              console.log("DocProvider->getAll Error: "+JSON.stringify(err));
            });
        })
  }

  getChanges(){
    console.log('DocProvider-> getChanges!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    this.changes = this.db.changes({
      since: 'now',
      live: true,
      include_docs: true
    }).on('change', (change) => {
      console.log('!!!!!!!!!!!!!!!!!!!!!!!! change: '+JSON.stringify(change));

      if (change['_deleted']) {
            this.docActions.removeSuccess(change.doc);
      } 
      else {
        //lets just make sure that our doc doesn't have deleted flag
        //we check for this twice, once above
        if (change.doc['_deleted'])
          this.docActions.removeSuccess(change.doc)
        else
          this.docActions.saveSuccess(change.doc);        
      }
    }).on('complete', function(info) {
      console.log('Get Pouch Changes -> Complete');
    }).on('error', function (err) {
      console.log('Get Pouch Changes ERROR: '+JSON.stringify(err));
    });
  }


  save(doc:Doc): Promise<Doc>{
    //debugger;
    console.log('DataProvider->save doc: '+JSON.stringify(doc));
    return this.db.put(doc);
  }

  remove(doc:Doc): Promise<Doc>{
    console.log('DataProvider-> remove doc: '+ JSON.stringify(doc));
    return this.db.put(Object.assign(doc,{_deleted:true}));
  }

}
