import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Http, Response, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';

/**
 * Checks whether client has a valid token.
 * Used to protect restricted routes.
 * Redirects to login page is something goes wrong.
 * 
 * @export
 * @class AuthGuard
 * @implements {CanActivate}
 */
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private http: Http, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise < boolean > {
        return new Promise((resolve, reject) => {
            let options: RequestOptionsArgs = { withCredentials: true }
            this.http.post("http://localhost:8989/auth", null, options).toPromise()
                .then(response => resolve(true))
                .catch(reason => {
                    this.router.navigate(['/login']);
                    resolve(false);
                });
        });
    }
}