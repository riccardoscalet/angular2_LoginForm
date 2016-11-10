// Page displaying hero dashboard.

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './model/hero';
import { HeroService } from './hero.service';

@Component({
    selector: "my-dashboard",
    templateUrl: "./app/dashboard.component.html",
    styleUrls: ["../styles/dashboard.component.css"],
    // Services that can be used by this component
    providers: [HeroService]
})

// Definition of component: variables, functions, etc.
export class DashboardComponent {
    heroes: Hero[] = [];

    // Component contructor.
    // HeroService is automatically injected by Angular2, since it's defined as Injectable.
    constructor(private router: Router, private heroService: HeroService) {}

    // Function called when component construction has been completed.
    ngOnInit(): void {
        // Usage of promises (returned by getHeroes function)
        this.heroService.getHeroes()
            .then(heroes => this.heroes = heroes.slice(0, 5));
    }

    gotoDetail(hero: Hero): void {
        let link = ['/detail', hero.id];
        this.router.navigate(link);
    }
}