import {Component} from '@angular/core';
import {first} from 'rxjs/operators';


import {User} from '@app/_models';
import {RegisterService} from '@app/_services';
import {HttpClient} from "@angular/common/http";
import {configuration} from "@configurations/configuration";

@Component({templateUrl: 'profile.component.html'})
export class ProfileComponent {
    user: User | undefined;

    constructor(
        private registerService: RegisterService,
        private http: HttpClient
    ) {

    }

    ngOnInit() {
        this.http.get<User>(`${configuration.userProfileApiUrl}`)
            .pipe(first())
            .subscribe(user => this.user = user)
    }
}
