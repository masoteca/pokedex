import { Component, OnInit } from '@angular/core';
import { PokemonList } from 'src/app/interfaces/pokemon-list';
import { PokemonServiceService } from '../../services/pokemon-service.service'

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  public pokemons!: PokemonList;
  public limit: number = 50;
  public offset: number = 0;
  constructor(private pokeapi: PokemonServiceService) { }

  ngOnInit(): void {
    this.getPokemonList(this.limit, this.offset);
  }

  getPokemonList(limit: number, offset:number): void {
    this.pokeapi.getPokemonList(limit, offset).subscribe(
      response => {
        console.log(response);
        this.pokemons = response;
      });
  }

  incrementOffset(): void {
    if(this.pokemons && this.offset < this.pokemons.count)   this.offset += this.limit;
   }

  reducetOffset(): void {
    if(this.offset > 0) this.offset -= this.limit;
  }

  setOffset(page: number): void{
    if(this.pokemons && this.offset < this.pokemons.count)   this.offset = this.limit * page;
  }
  getMaxLinks() {
    let links = 0;
    if(this.pokemons){
      links =  Math.ceil(this.pokemons.count / this.limit);
    }
    return links;
  }
}
