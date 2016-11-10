import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginService {

    constructor(private http: Http) {}

    login(username: string, password: string): Promise < Response > {
        let body = {
            username: username,
            password: password
        }

        // This allows to send CORS calls with credentials. It's required to use cookies with Angular2.
        let options: RequestOptionsArgs = {
            withCredentials: true
        }

        return this.http.post("http://localhost:8989/login", body, options).toPromise();
    }
}