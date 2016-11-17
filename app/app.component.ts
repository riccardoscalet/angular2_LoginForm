// Main application page

import { Component } from '@angular/core';

import { User } from "./shared/user";
import { AuthGuard } from "./auth.guard";


@Component({
    selector: "my-app",
    templateUrl: "app/app.component.html",
    styleUrls: ["app/app.component.css"]
})

export class AppComponent {

    constructor(private authGuard: AuthGuard) { }

    isAdmin(): boolean {
        if(!this.authGuard.credentials) return false;
        
        let admin = this.authGuard.credentials.scope.find((value, index, role) => {
            if(value == "admin") return true;
        });

        return (admin != null);
    }

}