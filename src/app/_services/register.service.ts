import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {configuration} from "@configurations/configuration"
import {User} from '@app/_models';

@Injectable({providedIn: 'root'})
export class RegisterService {
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }

    register(name: string, email: string, password: string, bio: string) {
        //name, password, email, bio
        return this.http.get<any>(`${configuration.registrationApiUrl}`, {})
            .pipe(map(result => {
                if (result.success == true) {
                    let user = {
                        name: name,
                        email: email,
                        password: password,
                        bio: bio
                    }
                    localStorage.setItem('user', JSON.stringify(user));
                    this.userSubject.next(user);
                } else {
                    alert("Server returned error: registration not success")
                }

                return result;
            }));
    }

    logout() {
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/register']);
    }

}
