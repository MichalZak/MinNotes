//import { combineReducers } from 'redux';
//import createLogger from 'redux-logger';

//import { combineEpics } from 'redux-observable';
//import { createEpicMiddleware } from 'redux-observable';
import { combineReducers } from 'redux';
import { Call, Doc, Note, } from '../models';

//reducers
import { callReducer } from './call-reducer';
import { noteReducer } from './note-reducer';
import { docReducer } from './doc-reducer'

export interface IAppState {
    calls?: Array<Call>;
    notes?: Array<Note>;
    docs?: Array<Doc>;
};

//export const getReducers = {
//        notes: noteReducer,
//};


export const getReducers = combineReducers<IAppState>({
    calls: callReducer,
    notes: noteReducer,
    docs: docReducer
});



export const enhancers = [

];