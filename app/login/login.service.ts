import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { UserCredentials } from "../shared/userCredentials";


@Injectable()
export class LoginService {
    public credentials: UserCredentials;

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
        let self = this;

        let body = {
            username: username,
            password: password
        }

        // Option withCredentials allows to send CORS calls with credentials. It's required to use cookies with Angular2.
        let options: RequestOptionsArgs = { withCredentials: true }

        return new Promise((resolve, reject) => {
            this.http.post("http://localhost:8989/api/login", body, options).toPromise()
                .then(response => {
                    let res = response.json();
                    if (res.result == 0) {
                        self.credentials = res.data;
                        resolve(res.data as UserCredentials);
                    }
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
        let self = this;

        return new Promise((resolve, reject) => {
            let options: RequestOptionsArgs = { withCredentials: true }
            this.http.post("http://localhost:8989/api/logout", null, options).toPromise()
                .then(response => {
                    self.credentials = undefined;
                    resolve(true);
                })
                .catch(reason => reject(reason.statusText));
        });
    }

    /**
     * Returns user credentials if token if valid, rejects the promise otherwise.
     * If credentials were already obtained previously, returns them immediately.
     * If not, calls server with token to check if token is valid and obtain decoded credentials.
     * 
     * @returns {Promise < User >}
     * 
     * @memberOf LoginService
     */
    auth(): Promise<UserCredentials> {
        let self = this;

        return new Promise((resolve, reject) => {
            // If the client has valid and not-expired credentials, there's no need to call server again
            if (self.credentials && ((self.credentials.exp as number * 1000) - moment.now() > 0)) {
                return resolve(self.credentials);
            }

            // Else calls auth api rest passing token, to obtain new credentials
            let options: RequestOptionsArgs = { withCredentials: true }
            this.http.post("http://localhost:8989/api/auth", null, options).toPromise()
                .then(response => {
                    self.credentials = response.json().data as UserCredentials;
                    resolve(self.credentials);
                })
                .catch(reason => reject(reason));
        });
    }

    /**
     * Whether client is logged in and has a specific scope.
     * @returns {boolean}
     * 
     * @memberOf AppComponent
     */
    hasScope(scope: string): boolean {
        let credentials = this.credentials;
        if (!credentials) return false;

        let admin = this.credentials.scope.find((value, index, role) => { if (value == scope) return true; });
        return (admin != null);
    }
}