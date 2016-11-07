import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';

import { IAppState } from '../store';
//import { DocProvider } from '../store/doc-provider';
import { Doc } from '../models'

@Injectable()
export class DocActions {
    static LOAD: string = 'LOAD_DOCS';
    static REMOVE: string = 'REMOVE_DOC';
    static SAVE: string = 'SAVE_DOC';


    static LOAD_SUCCESS: string = 'LOAD_DOCS_SUCCESS';
    static REMOVE_SUCCESS: string = 'REMOVE_DOC_SUCCESS';
    static SAVE_SUCCESS: string = 'SAVE_DOC_SUCCESS';

    constructor(private ngRedux: NgRedux<IAppState>) {

    }
    
    generateId(type:string):string{
        return type+'/'+ Date.now().toString();
    }

    loadSuccess(docs:Array<Doc>):void{
        console.log('DocActions->LoadSuccess: ');
        this.ngRedux.dispatch({type:DocActions.LOAD_SUCCESS, data:docs});
    }

    saveSuccess(doc:Doc):void{
       console.log('DocActions-> saveSuccess doc: '+JSON.stringify(doc));
       this.ngRedux.dispatch({type: DocActions.SAVE_SUCCESS, data:doc});
    }

    removeSuccess(doc:Doc):void{
        console.log('DocActions-> removeSuccess doc: '+JSON.stringify(doc));
        this.ngRedux.dispatch({type:DocActions.REMOVE_SUCCESS, data:doc});
    }


    load():void{
        console.log('DocActions-> load');
        //this.docProvider.getAll();
        //this.ngRedux.dispatch({type: DocActions.LOAD});
    }

    save(doc:Doc):void{
       console.log('DocActions-> save');
       this.ngRedux.dispatch({type: DocActions.SAVE, data:doc});
    }

    remove(doc:Doc):void{
       this.ngRedux.dispatch({type:DocActions.REMOVE, data:doc});
    }

}

