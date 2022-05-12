import {Component, OnInit} from '@angular/core';
import {PokeMovesService} from "../../services/poke-moves.service";
import {combineLatest} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-pokemon-movement',
    templateUrl: './pokemon-movement.component.html',
    styleUrls: ['./pokemon-movement.component.scss']
})
export class PokemonMovementComponent implements OnInit {

    public movement: any | undefined;

    constructor(private pokeapi: PokeMovesService, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        const urlParams = combineLatest(
            [this.route.params,
                this.route.queryParams],
            (params, queryParams) => ({...params, ...queryParams})
        );

        urlParams.subscribe(routeParams => {
            this.pokeapi.getMovement(routeParams['id'])
                .subscribe(data => this.movement = data);
        });

    }

    public nombre() {
        if(this.movement) {
            let moves = this.movement.names.filter((movement: any) => movement.language.name == 'es' )
            return moves[0].name ?? this.movement.name
        }else {
            return 'Movement Name';
        }
    }public descripcion() {
        if(this.movement) {
            let flavor = this.movement.flavor_text_entries.filter((flavor: any) => flavor.language.name == 'es' )
            return flavor[0].flavor_text
        }else {
            return 'Movement Description';
        }
    }
}
