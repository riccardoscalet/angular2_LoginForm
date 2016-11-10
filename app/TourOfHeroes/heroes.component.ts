// Page containing the list of heroes.

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from "./model/hero";
import { HeroService } from "./hero.service";

@Component({
    moduleId: module.id,
    selector: "my-heroes",
    templateUrl: "./heroes.component.html",
    styleUrls: ["../styles/heroes.component.css"],
    providers: [HeroService]
})

export class HeroesComponent implements OnInit {
    heroes: Hero[];
    selectedHero: Hero;

    constructor(private router: Router, private heroService: HeroService) {}

    ngOnInit(): void {
        this.getHeroes();
    };

    getHeroes(): void {
        // Usage of promises
        let promise = this.heroService.getHeroes();
        promise.then(heroes => this.heroes = heroes);
    };

    selectHero(hero: Hero): void {
        this.selectedHero = hero;
    };

    gotoDetail(hero: Hero): void {
        let link = ['/detail', this.selectedHero.id];
        this.router.navigate(link);
    }
}