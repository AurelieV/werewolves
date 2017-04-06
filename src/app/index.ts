import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { MaterialModule } from '@angular/material';
import { NgReduxModule, NgRedux } from '@angular-redux/store';

// Components
import { AppComponent } from './app';
import { RoleZoomComponent } from './components/zoom';
import { SetRolesComponent } from './components/setRoles';
import { SetPlayersComponent } from './components/setPlayers';
import { AttributeRolesComponent } from './components/attributeRoles';
import { GameComponent } from './components/game';

// Services
import { PersistStoreService } from './store/persistService';

// Config
import { config } from "../config/firebase";

// Store
import { IAppState, rootReducer } from './store';

export const currentVersion = "4.0";

@NgModule({
  declarations: [
    AppComponent,
    RoleZoomComponent,
    SetRolesComponent,
    SetPlayersComponent,
    AttributeRolesComponent,
    GameComponent
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
    PersistStoreService
  ],
  entryComponents: [
    RoleZoomComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
    constructor(private ngRedux: NgRedux<IAppState>, private persist: PersistStoreService) {
        const persistState = persist.getPersistState(); 
        this.ngRedux.configureStore(rootReducer, persistState);
        persist.start();
    }
}
