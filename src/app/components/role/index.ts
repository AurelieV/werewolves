import { Component, Input, Inject, OnInit } from "@angular/core";
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';
import { MdDialog, MdDialogRef } from '@angular/material';

import { RoleZoomComponent } from './zoom';
import { Role } from "../../model";

@Component({
    selector: 'role',
    templateUrl: './role.html',
    styleUrls: [ 'role.scss' ]
})
export class RoleComponent implements OnInit {
    @Input() role: Role;
    storageRef: firebase.storage.Reference;

    constructor(@Inject(FirebaseApp) firebaseApp: firebase.app.App, private dialog: MdDialog) {
        this.storageRef = firebaseApp.storage().ref()
    }

    ngOnInit() {
        this.storageRef.child(this.role.image)
            .getDownloadURL()
            .then(url => this.role.imageUrl = url)
    }

    openZoom() {
        const zoom = this.dialog.open(RoleZoomComponent);
        zoom.componentInstance.role = this.role;
    }
}