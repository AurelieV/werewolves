import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app';
import { RoleComponent } from './components/role';
import { RoleZoomComponent } from './components/role/zoom';
import { config } from "../config/firebase";

@NgModule({
  declarations: [
    AppComponent,
    RoleComponent,
    RoleZoomComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(config),
    MaterialModule
  ],
  providers: [],
  entryComponents: [
    RoleZoomComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
