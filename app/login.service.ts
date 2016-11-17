import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { UserCredentials } from "./model/userCredentials";


@Injectable()
export class LoginService {

    constructor(private http: Http) { }

    /**
     * Calls login on server.
     * If successful, returns response which include user credentials.
     * (Response also contains token in response body and inside cookie, which is set automatically on client).
     * 
     * @param {string} username
     * @param {string} password
     * @returns {Promise < User >}
     * 
     * @memberOf LoginService
     */
    login(username: string, password: string): Promise<UserCredentials> {
        let body = {
            username: username,
            password: password
        }

        // Option withCredentials allows to send CORS calls with credentials. It's required to use cookies with Angular2.
        let options: RequestOptionsArgs = { withCredentials: true }

        return new Promise((resolve, reject) => {
            this.http.post("http://localhost:8989/login", body, options).toPromise()
                .then(response => {
                    let res = response.json();
                    if (res.result == 0) resolve(res.data as UserCredentials)
                    else reject(res.message);
                })
                .catch(reason => reject(reason.statusText));
        });
    }

    /**
     * Calls logout on server.
     * This operation simply deletes the token cookie on client.
     * 
     * @returns {Promise < boolean >}
     * 
     * @memberOf LoginService
     */
    logout(): Promise<boolean> {
        let options: RequestOptionsArgs = { withCredentials: true }
        return new Promise((resolve, reject) => {
            this.http.post("http://localhost:8989/logout", null, options).toPromise()
                .then(response => resolve(true))
                .catch(reason => reject(reason.statusText));
        });
    }

    /**
     * Calls server to check if token is valid.
     * Returns user credentials if it is, rejects the promise otherwise.
     * 
     * @returns {Promise < User >}
     * 
     * @memberOf LoginService
     */
    auth(): Promise<UserCredentials> {
        let options: RequestOptionsArgs = { withCredentials: true }

        return new Promise((resolve, reject) => {
            this.http.post("http://localhost:8989/auth", null, options).toPromise()
                .then(response => resolve(response.json().data as UserCredentials))
                .catch(reason => reject());
        });
    }
}