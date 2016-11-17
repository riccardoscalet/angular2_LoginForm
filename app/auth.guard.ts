import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
declare var moment: any;

import { LoginService } from "./login/login.service";
import { UserCredentials } from "./shared/userCredentials";


/**
 * Checks whether client has a still valid token. Used to protect restricted routes.
 * Redirects to welcome/error page if token is expired.
 * 
 * @export
 * @class AuthGuard
 * @implements {CanActivate}
 */
@Injectable()
export class AuthGuard implements CanActivate {
    credentials: UserCredentials;

    constructor(private router: Router, private loginService: LoginService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        let self = this;

        return new Promise((resolve, reject) => {

            // If the client has valid and not-expired credentials, there's no need to call server again
            if (self.credentials && ((self.credentials.exp as number * 1000) - moment.now() > 0)) {
                return resolve(true);
            }

            // Else calls auth rest (with token) to obtain new credentials
            self.loginService.auth()
                .then(credentials => {
                    // Sets credentials info
                    self.credentials = credentials;
                    resolve(true);
                })
                .catch(reason => {
                    // If token is absent or invalid, redirects to starting page
                    self.router.navigate(['/welcome']);
                    resolve(false);
                });
        });
    }
}