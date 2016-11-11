// List of users

import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptionsArgs } from '@angular/http';


@Component({
    moduleId: module.id,
    selector: "user-list",
    templateUrl: "user.list.component.html",
    styleUrls: ["../styles/user.list.component.css"],
})

export class UserListComponent implements OnInit {
    users: any[];

    constructor(private http: Http) {}

    ngOnInit(): void {
        let options: RequestOptionsArgs = { withCredentials: true }
        this.http.get("http://localhost:8989/users", options).toPromise()
            .then(response => {
                this.users = response.json().data;
            });
    };
}