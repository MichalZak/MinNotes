
//import { NoteActions } from '../actions/note-actions';
import { DocActions } from '../actions/doc-actions';
import { Note, Action } from '../models'
import { saveIntoArray } from '../util'

const INIT_STATE:Array<Note> = new Array<Note>();


export function noteReducer(state:Array<Note> = INIT_STATE, action:Action):Array<Note>{
    //console.log('noteReducer -> action: '+JSON.stringify(action));
    switch(action.type){
        case DocActions.LOAD_SUCCESS:
            return action.data.filter(doc => doc.type == 'note');

        case DocActions.SAVE_SUCCESS:
            if(action.data.type !== 'note') return state;
            return saveIntoArray(action.data,state);

        case DocActions.REMOVE_SUCCESS:
            if(action.data.type !== 'note') return state;
            return state.filter(doc => doc._id !== action.data._id);

        default:
            return state;
    }


}