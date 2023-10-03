import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {RegisterService} from "@app/_services";

@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
    form!: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private registerService: RegisterService,
        private router: Router
    ) {

    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            bio: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    onSubmit() {
        let name = this.form.controls.name.value;
        let email = this.form.controls.email.value;
        let password = this.form.controls.password.value;
        let bio = this.form.controls.bio.value;
        this.registerService.register(name, email, password, bio)
            .pipe(first())
            .subscribe({
                complete(): void {
                },
                next: () => {
                    this.router.navigate([''], {relativeTo: this.route});
                },
                error: () => {
                }
            });
    }

}
