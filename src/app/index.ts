import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { MaterialModule } from '@angular/material';
import { NgReduxModule, NgRedux } from '@angular-redux/store';

// Components
import { AppComponent } from './app';
import { RoleComponent } from './components/role';
import { RoleZoomComponent } from './components/role/zoom';

// Actions
import { PlayersActions } from './actions/players';

// Config
import { config } from "../config/firebase";

// Store
import { IAppState, rootReducer } from './store';

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
    MaterialModule,
    NgReduxModule
  ],
  providers: [
      PlayersActions
  ],
  entryComponents: [
    RoleZoomComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
    constructor(private ngRedux: NgRedux<IAppState>) {
        this.ngRedux.configureStore(rootReducer, { players: [] });
    }
}
