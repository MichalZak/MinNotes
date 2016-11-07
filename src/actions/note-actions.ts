import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';

import { IAppState } from '../store';
//import { Note } from '../models'

//import PouchDB from 'pouchdb';


@Injectable()
export class  NoteActions {

 //   private _db;

    static LOAD_NOTES: string = 'LOAD_NOTES';
    static REMOVE_NOTE: string = 'REMOVE_NOTE';
    static SAVE_NOTE: string = 'SAVE_NOTE';


    constructor (private ngRedux: NgRedux<IAppState>) {
        this.initDB();
    }

    initDB(){
        //this._db = new PouchDB('todos');
    }

    test():void{
        this.ngRedux.dispatch({type:'test'});
    }


    /*
    save(note:Note):void{
       console.log('NoteActions-> save');
       if(note._id == null|| note._id == '') note._id = this.generateId();
       if(note.type == null || note.type == '') note.type = 'note';
       this.ngRedux.dispatch({type: NoteActions.SAVE_NOTE, data:note});
    }

    remove(note:Note):void{
       this.ngRedux.dispatch({type:NoteActions.REMOVE_NOTE, data:note});
    }


    generateId():string{
        return 'note/'+ Date.now().toString();
    }
    */



}