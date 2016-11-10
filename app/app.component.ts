// Main application page

import { Component } from '@angular/core';

// Defines html selector and corresponding html template that will replace it
@Component({
    selector: "my-app",
    templateUrl: "app/app.component.html",
    styleUrls: ["../styles/app.component.css"]
})

export class AppComponent {
    title = "Tour of Heroes";
}