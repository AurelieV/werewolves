import { Component, Inject } from '@angular/core';

import { Role } from "./model";
import { roles } from "./data";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: [ './app.scss' ]
})
export class AppComponent {
  roles: Role[] = roles;
}
