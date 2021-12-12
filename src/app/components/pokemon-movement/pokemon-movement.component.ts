import { Component, OnInit } from '@angular/core';
import {PokeMovesService} from "../../services/poke-moves.service";
import {combineLatest} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-pokemon-movement',
  templateUrl: './pokemon-movement.component.html',
  styleUrls: ['./pokemon-movement.component.scss']
})
export class PokemonMovementComponent implements OnInit {

  public  movement: any | undefined;

  constructor(private pokeapi: PokeMovesService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const urlParams =  combineLatest(
        [this.route.params,
          this.route.queryParams],
        (params, queryParams) => ({ ...params, ...queryParams})
    );
    urlParams.subscribe(routeParams => {
      this.pokeapi.getMovement(routeParams['id'])
          .subscribe(data => this.movement = data);
    });

      }

}
