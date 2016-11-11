import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from "./auth.guard";

import { LoginComponent } from "./login.component";


const routes: Routes = [{
        path: "",
        redirectTo: "login",
        pathMatch: "full"
    },
    {
        path: "login",
        component: LoginComponent
    },
    // {
    //     path: 'detail/:id',
    //     component: HeroDetailComponent
    // }
    {
        path: "users",
        canActivate: [AuthGuard],
        component: LoginComponent
    },
    {
        // Not-found route, to redirect every wrong path (instead of causing an exception)
        path: "**",
        redirectTo: "login"
    }
];

@NgModule({
    // Initializes routes
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}