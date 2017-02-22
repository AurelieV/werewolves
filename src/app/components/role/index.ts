import { Component, Input, Inject } from "@angular/core";
import { MdDialog, MdDialogRef } from '@angular/material';

import { RoleZoomComponent } from './zoom';
import { Role } from "../../model";

@Component({
    selector: 'role',
    templateUrl: './role.html',
    styleUrls: [ 'role.scss' ]
})
export class RoleComponent {
    @Input() role: Role;

    constructor(private dialog: MdDialog) {}

    openZoom() {
        const zoom = this.dialog.open(RoleZoomComponent);
        zoom.componentInstance.role = this.role;
    }
}