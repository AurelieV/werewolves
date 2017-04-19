import { Component, Input } from "@angular/core";

import { Role } from "../../model";

@Component({
    templateUrl: './zoom.html' ,
    styleUrls: [ 'zoom.scss' ]
})
export class RoleZoomComponent {
    @Input() role: Role;
    @Input() player: string; 
}