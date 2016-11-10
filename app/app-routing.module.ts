import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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