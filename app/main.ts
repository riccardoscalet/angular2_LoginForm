// START - Use 'npm start' from console to run this angular2 application.
// (I haven't found a way to make it work directly through VSCode, yet)

// Entry point of the application (defined in systemjs.config.js).

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);