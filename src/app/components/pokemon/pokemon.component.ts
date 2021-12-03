import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from 'src/app/interfaces/pokemon';
import { PokemonServiceService } from 'src/app/services/pokemon-service.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  public pokemon!: Pokemon;

  constructor(private route: ActivatedRoute, private pokeapi: PokemonServiceService) {
  }

  ngOnInit(): void {
    this.pokeapi.getPokemon(this.route.snapshot.params['id'])
    .subscribe(data => this.pokemon = data);
  }
  pokemonCoverImage(): string {
    if(this.pokemon) return  this.pokemon.sprites.front_default  ;
    return '';
  }

}
