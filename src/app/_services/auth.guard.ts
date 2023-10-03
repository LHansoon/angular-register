import {inject, Injectable} from '@angular/core';
import {Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn} from '@angular/router';

import {RegisterService} from '@app/_services';

@Injectable({providedIn: 'root'})
class AuthGuard {

    constructor(
        private router: Router,
        private registerService: RegisterService
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.registerService.userValue;
        if (user) {
            return true;
        }
        this.router.navigate(['/register'], {queryParams: {returnUrl: state.url}});
        return false;
    }
}


export const IsAuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(AuthGuard).canActivate(route, state)
}
