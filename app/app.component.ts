// Main application page

import { Component } from '@angular/core';

import { User } from "./shared/user";
import { LoginService } from "./login/login.service";


@Component({
    selector: "my-app",
    templateUrl: "app/app.component.html",
    styleUrls: ["app/app.component.css"]
})

export class AppComponent {
    constructor(private loginService: LoginService) { }
}