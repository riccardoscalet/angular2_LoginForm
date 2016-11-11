import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from "./auth.guard";

import { LoginComponent } from "./login.component";
import { WelcomeComponent } from "./welcome.component"
import { UserListComponent } from "./user.list.component"


const routes: Routes = [{
        path: "",
        redirectTo: "welcome",
        pathMatch: "full"
    },
    {
        path: "welcome",
        component: WelcomeComponent
    },
    // {
    //     path: "login",
    //     component: LoginComponent
    // },
    // {
    //     path: 'detail/:id',
    //     component: HeroDetailComponent
    // }
    {
        path: "users",
        canActivate: [AuthGuard],
        component: UserListComponent
    },
    {
        // Not-found route, to redirect every wrong path (instead of causing an exception)
        path: "**",
        redirectTo: "welcome"
    }
];

@NgModule({
    // Initializes routes
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}