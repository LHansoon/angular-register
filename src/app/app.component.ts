import {Component} from '@angular/core';

import {RegisterService} from './_services';
import {User} from './_models';

@Component({selector: 'app-root', templateUrl: 'app.component.html'})
export class AppComponent {
    user?: User | null;

    constructor(private registerService: RegisterService) {
        this.registerService.user.subscribe(x => this.user = x);
    }

    logout() {
        this.registerService.logout();
    }
}
