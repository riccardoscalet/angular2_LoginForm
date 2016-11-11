// Login page

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from "./login.service";


@Component({
    moduleId: module.id,
    selector: "apollo-login",
    templateUrl: "login.component.html",
    styleUrls: ["../styles/login.component.css"]
})

export class LoginComponent implements OnInit {
    loggedin: boolean = false;
    username: string;
    password: string;
    resultMessage: string;

    constructor(private router: Router, private loginService: LoginService) {

    }

    ngOnInit(): void {
        this.loginService.auth()
            .then(value => this.loggedin = value);
    };

    login(): void {
        this.loginService.login(this.username, this.password)
            .then(response => {
                if(response.json().result == 0) this.loggedin = true;
                this.resultMessage = response.json().message;
            })
            .catch(reason => {
                this.resultMessage = `Error! Message: ${reason.statusText}`;
            });

        this.password = null;
    };

    logout(): void {
        this.loginService.logout()
            .then(response => {
                if(response.json().result == 0) this.loggedin = false;
                this.resultMessage = response.json().message;
            })
            .catch(reason => {
                this.resultMessage = `Error! Message: ${reason.statusText}`;
                let link = ["/login"];
                this.router.navigate(link);
            });
    }

}