import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from "./auth.guard";

import { LoginComponent } from "./login.component";
import { WelcomeComponent } from "./welcome.component"
import { UserListComponent } from "./user.list.component"
import { UserDetailsComponent } from "./user.details.component"


const routes: Routes = [{
        path: "",
        redirectTo: "welcome",
        pathMatch: "full"
    },
    {
        path: "welcome",
        component: WelcomeComponent
    },
    {
        path: "users",
        canActivate: [AuthGuard],
        component: UserListComponent
    },
    // {
    //     path: "users/:username",
    //     canActivate: [AuthGuard],
    //     component: UserListComponent,
    //     children: [
    //         // Children sub-paths are set inside the <router-outlet> of this component
    //         {
    //             path: "",
    //             component: UserDetailsComponent
    //         }
    //     ]
    // },
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