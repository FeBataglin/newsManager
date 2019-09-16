import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThfModule } from '@totvs/thf-ui';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase';

import { LoginPageModule } from './pages/auth/login/login.module';
import { NewsPageModule } from './pages/register/news/news.module';
import { DropZoneDirective } from './directives/drop-zone.directive';
import { UploadService } from './services/upload/upload';

export const config = {
  apiKey: "AIzaSyBRPIf82ebIzcPdH0VGy8qdxKlgtN2h46U",
      authDomain: "comunicasenai-93a8e.firebaseapp.com",
      databaseURL: "https://comunicasenai-93a8e.firebaseio.com",
      projectId: "comunicasenai-93a8e",
      storageBucket: "comunicasenai-93a8e.appspot.com",
      messagingSenderId: "960900674537",
      appId: "1:960900674537:web:c1c9c7027e169b96"
  };

  firebase.initializeApp(config);    

@NgModule({
  declarations: [
    AppComponent,
    DropZoneDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBRPIf82ebIzcPdH0VGy8qdxKlgtN2h46U",
      authDomain: "comunicasenai-93a8e.firebaseapp.com",
      databaseURL: "https://comunicasenai-93a8e.firebaseio.com",
      projectId: "comunicasenai-93a8e",
      storageBucket: "comunicasenai-93a8e.appspot.com",
      messagingSenderId: "960900674537",
      appId: "1:960900674537:web:c1c9c7027e169b96"
    }),
    ThfModule,
    ReactiveFormsModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    LoginPageModule,
    NewsPageModule,
    RouterModule.forRoot([])
  ],
  providers: [UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
