// Starting point of the application, called directly by main.ts.
// Bootstraps Angular2 application.  

// Angular2 modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

// Components
import { AppComponent } from "./app.component"
import { LoginComponent } from "./login/login.component"
import { WelcomeComponent } from "./login/welcome.component"
import { UserListComponent } from "./users/user.list.component"
import { UserDetailsComponent } from "./users/user.details.component"

// Providers
import { AuthGuard } from "./auth.guard";
import { LoginService } from "./login/login.service";

// Module where all routes are defined
import { AppRoutingModule } from './app.routing.module';


// Initializes main Angular2 module
@NgModule({

    // Required Angular2 modules
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        // Route module: sets route paths
        AppRoutingModule
    ],

    // Component modules
    declarations: [
        AppComponent,
        LoginComponent,
        WelcomeComponent,
        UserListComponent,
        UserDetailsComponent
    ],

    // Service providers
    providers: [
        AuthGuard,
        LoginService
    ],

    // Starting modules
    bootstrap: [AppComponent]
})


export class AppModule { }