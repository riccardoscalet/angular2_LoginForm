// Apollo login page

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from "./login.service";


@Component({
    moduleId: module.id,
    selector: "apollo-login",
    templateUrl: "login.component.html",
    styleUrls: ["../styles/login.component.css"],
    providers: [LoginService]
})

export class LoginComponent implements OnInit {
    username: string;
    password: string;
    resultMessage: string;

    constructor(private router: Router, private loginService: LoginService) {}


    ngOnInit(): void {};

    login(): void {
        this.loginService.login(this.username, this.password)
            .then(response => {
                this.resultMessage = response.json().message;
            })
            .catch(reason => {
                this.resultMessage = `Error! Message: ${reason.statusText}`;
            });
    };

    logout(): void {
        this.loginService.logout()
            .then(response => {
                this.resultMessage = response.json().message;
            })
            .catch(reason => {
                this.resultMessage = `Error! Message: ${reason.statusText}`;
                let link = ["/login"];
                this.router.navigate(link);
            });
    }

}