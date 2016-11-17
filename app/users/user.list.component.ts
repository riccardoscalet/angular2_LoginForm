// List of users

import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptionsArgs } from '@angular/http';
import { Router } from '@angular/router';

import { User } from "../model/user";


@Component({
    moduleId: module.id,
    selector: "user-list",
    templateUrl: "user.list.component.html",
    styleUrls: ["user.list.component.css"],
})

export class UserListComponent implements OnInit {
    users: User[];
    selectedUser: User;

    constructor(private http: Http, private router: Router) { }

    ngOnInit(): void {
        let options: RequestOptionsArgs = { withCredentials: true }
        this.http.get("http://localhost:8989/api/users", options).toPromise()
            .then(response => this.users = response.json().data);
    };

    selectUser(user: User): void {
        this.selectedUser = user;
    }
}