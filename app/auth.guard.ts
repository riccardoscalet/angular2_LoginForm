import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { LoginService } from "./login.service";


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

    constructor(private router: Router, private loginService: LoginService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise < boolean > {
        return new Promise((resolve, reject) => {
            this.loginService.auth()
                .then(value => {
                    if (!value) this.router.navigate(['/login']);
                    resolve(value);
                });
        });
    }

}