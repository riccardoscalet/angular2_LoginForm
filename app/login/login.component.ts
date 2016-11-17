// Login header

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from "./login.service";


@Component({
    moduleId: module.id,
    selector: "apollo-login",
    templateUrl: "login.component.html",
    styleUrls: ["login.component.css"]
})

export class LoginComponent implements OnInit {
    loggedin: boolean = false;
    username: string;
    password: string;
    resultMessage: string;

    constructor(private router: Router, private loginService: LoginService) { }

    ngOnInit(): void {
        this.loginService.auth()
            .then(user => {
                this.loggedin = true;
                this.username = user.username;
            })
            .catch(reason => this.loggedin = false);
    };

    login(): void {
        this.loginService.login(this.username, this.password)
            .then(user => {
                this.loggedin = true;
                this.username = user.username;
            })
            .catch(reason => this.resultMessage = `Error! ${reason}`);

        this.password = null;
    };

    logout(): void {
        this.loginService.logout()
            .then(result => {
                this.loggedin = false;
                this.router.navigate(["/welcome"]);
            })
            .catch(reason => this.resultMessage = `Error! ${reason}`);
    }

    toAccount(): void {
        this.router.navigate(["/account"]);
    }
}