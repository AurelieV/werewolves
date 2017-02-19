import { Component, Input } from "@angular/core";

import { Role } from "../../model";

@Component({
    template: `<img [src]="role.imageUrl">`,
    styles: [ `` ]
})
export class RoleZoomComponent {
    @Input() role: Role; 
}