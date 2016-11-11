import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginService {

    constructor(private http: Http) {}

    //TODO Manage responses here and return typed objects in promises, so component doesn't have to worry about converting stuff

    login(username: string, password: string): Promise < Response > {
        let body = {
            username: username,
            password: password
        }

        // Option withCredentials allows to send CORS calls with credentials. It's required to use cookies with Angular2.
        let options: RequestOptionsArgs = { withCredentials: true }
        return this.http.post("http://localhost:8989/login", body, options).toPromise();
    }

    logout(): Promise < Response > {
        let options: RequestOptionsArgs = { withCredentials: true }
        return this.http.post("http://localhost:8989/logout", null, options).toPromise();
    }

    /**
     * Calls server to check if token is valid.
     * Returns user credentials if it is, rejects the promise otherwise.
     * 
     * @returns {Promise < any >}
     * 
     * @memberOf LoginService
     */
    auth(): Promise < any > {
        return new Promise((resolve, reject) => {
            let options: RequestOptionsArgs = { withCredentials: true }
            this.http.post("http://localhost:8989/auth", null, options).toPromise()
                .then(response => resolve(response.json().data))
                .catch(reason => reject());
        });
    }
}