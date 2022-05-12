import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  combineLatest } from 'rxjs';
import { Pokemon } from 'src/app/interfaces/pokemon';
import { PokemonServiceService } from 'src/app/services/pokemon-service.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  public pokemon!: Pokemon;
  public pokeId;
  constructor(private route: ActivatedRoute,
    private pokeapi: PokemonServiceService) {
      this.pokeId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {

    const urlParams =  combineLatest(
      [this.route.params,
      this.route.queryParams],
      (params, queryParams) => ({ ...params, ...queryParams})
    );
    urlParams.subscribe(routeParams => {
      this.pokeId = routeParams['id'];
      this.pokeapi.getPokemon(this.pokeId)
      .subscribe(data => this.pokemon = data);
    });
  }

  pokemonCoverImage(): string {
    if(this.pokemon) return  this.pokemon.sprites.front_default  ;
    return '';
  }

  getNextPokeId(){

    return parseInt(this.pokeId) + 1;

  }
  getPrevPokeId(){

    if(parseInt(this.pokeId) <= 1){
      return 1;
    }

    return parseInt(this.pokeId) - 1;

  }

}


