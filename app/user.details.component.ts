// Details of one users.

import { Component, Input, OnInit } from '@angular/core';

import { User } from "./model/user";


@Component({
    moduleId: module.id,
    selector: "user-details",
    templateUrl: "user.details.component.html",
    styleUrls: ["../styles/user.details.component.css"],
})

export class UserDetailsComponent implements OnInit {

    // Input decorator allows the value can also be set from outside the component (in this case user.list.component.html)
    @Input()
    user: User;

    constructor() {}

    ngOnInit(): void {
        // let options: RequestOptionsArgs = { withCredentials: true }
        // this.http.get("http://localhost:8989/users", options).toPromise()
        //     .then(response => {
        //         this.users = response.json().data;
        //     });
    };
}