
import { DocActions } from '../actions/doc-actions';
import { Doc, Action } from '../models'
import { saveIntoArray } from '../util'

const INIT_STATE:Array<Doc> = new Array<Doc>();


export function docReducer(state:Array<Doc> = INIT_STATE, action:Action):Array<Doc>{
    //console.log('docReducer -> action: '+JSON.stringify(action.type));
    switch(action.type){
        case DocActions.LOAD_SUCCESS:
            return action.data;

        case DocActions.SAVE_SUCCESS:
            return saveIntoArray(action.data,state);

        case DocActions.REMOVE_SUCCESS:
            return state.filter(doc => doc._id !== action.data._id);

        default:
            return state;
    }


}