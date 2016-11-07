import { NgModule, ApplicationRef } from '@angular/core';
import { IonicApp, IonicModule, Platform } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { NoteDetailPage } from '../pages/note-detail';
import { CallPage } from '../pages/call/call-page';
import { CallDetailPage } from '../pages/call/call-detail-page'

import { TabsPage } from '../pages/tabs/tabs';

import createLogger from 'redux-logger';
import { NgReduxModule, NgRedux, DevToolsExtension } from 'ng2-redux';
//import thunk from 'redux-thunk';

import { IAppState,  enhancers, getReducers } from '../store/index';
import { combineEpics } from 'redux-observable';
import { createEpicMiddleware } from 'redux-observable';

import { DocProvider } from '../store/doc-provider';
import { NoteActions } from '../actions/note-actions';
import { DocActions } from '../actions/doc-actions';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    NoteDetailPage,
    CallPage,
    CallDetailPage,
    TabsPage
  ],
  imports: [
    NgReduxModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    NoteDetailPage,
    CallPage,
    CallDetailPage,
    TabsPage
  ],
  providers: [DocProvider, DocActions, NoteActions]
})
export class AppModule {

  constructor(  private platform: Platform,
                private appRef: ApplicationRef,
                private ngRedux: NgRedux<any>, 
                private docProvider: DocProvider,
                private devTool: DevToolsExtension){
  //private devTool: DevToolsExtension
  //let reducers = combineReducers<IAppState>(getReducers);
  //let epics = combineEpics(getEpics);
  //ngRedux.configureStore(root,{});


  //enable our code puch, so we can update our app
  this.platform.ready().then(()=>{

  });



  const getEpics = combineEpics(
    //docProvider.testEpic$,
    docProvider.addDoc$,
    docProvider.removeDoc$,
  );

  const epicMiddleware = createEpicMiddleware(getEpics);



  ngRedux.configureStore(
          getReducers,
          {},
          [epicMiddleware,createLogger()],//could setup logger
          [ ...enhancers, devTool.isEnabled() ? devTool.enhancer() : f => f]);

  
  
   //lets load our data from pouchdb
   docProvider.getAll();

  }
}
