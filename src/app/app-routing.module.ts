import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {IsAuthGuard} from "@app/_services/auth.guard";
import {ProfileComponent} from "@app/profile";

const registerModule = () => import('./register/register.module').then(x => x.RegisterModule);


const routes: Routes = [
    {path: '', component: ProfileComponent, canActivate: [IsAuthGuard]},
    {path: 'register', loadChildren: registerModule},
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
