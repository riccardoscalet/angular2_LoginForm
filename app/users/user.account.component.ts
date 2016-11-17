// Details of one users.

import { Component, Input, OnInit } from '@angular/core';

import { User } from "../shared/user";
import { AuthGuard } from "../auth.guard";

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

    constructor(private authGuard: AuthGuard) { }

    ngOnInit(): void {
        this.user = this.authGuard.credentials;
    };

    changePassword(): void {

    }
}