import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
declare var moment: any;

import { LoginService } from "./login/login.service";


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
    constructor(private router: Router, private loginService: LoginService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        let self = this;
        return new Promise((resolve, reject) => {
            self.loginService.auth()
                .then(credentials => resolve(true))
                .catch(reason => {
                    // If token is absent or invalid, redirects to starting page
                    self.router.navigate(['/welcome']);
                    resolve(false);
                });
        });
    }
}