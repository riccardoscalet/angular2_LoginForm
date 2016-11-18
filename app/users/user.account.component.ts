// Details of one users.

import { Component, Input, OnInit } from '@angular/core';

import { User } from "../shared/user";
import { LoginService } from "../login/login.service";

@Component({
    moduleId: module.id,
    selector: "user-account",
    templateUrl: "user.account.component.html",
    // styleUrls: ["user.account.component.css"],
})

export class UserAccountComponent implements OnInit {
    user: User;
    oldPassword: string;
    newPassword: string;
    newPasswordRepeat: string;

    constructor(private loginService: LoginService) { }

    ngOnInit(): void {
        this.loginService.auth()
            .then(credentials =>
                this.user = credentials
            );
    };

    changePassword(): void {

    }
}