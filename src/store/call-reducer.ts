
//import { NoteActions } from '../actions/note-actions';
import { DocActions } from '../actions/doc-actions';
import { Call, Action } from '../models'
import { saveIntoArray } from '../util'

const INIT_STATE:Array<Call> = new Array<Call>();


export function callReducer(state:Array<Call> = INIT_STATE, action:Action):Array<Call>{
    //console.log('noteReducer -> action: '+JSON.stringify(action));
    switch(action.type){
        case DocActions.LOAD_SUCCESS:
            return action.data.filter(doc => doc.type == 'call');

        case DocActions.SAVE_SUCCESS:
            if(action.data.type !== 'call') return state;
            return saveIntoArray(action.data,state);

        case DocActions.REMOVE_SUCCESS:
            if(action.data.type !== 'call') return state;
            return state.filter(doc => doc._id !== action.data._id);

        default:
            return state;
    }


}