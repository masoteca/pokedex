import { Component, OnInit } from '@angular/core';
import { PokemonList } from 'src/app/interfaces/pokemon-list';
import { PokeMovesService } from '../../services/poke-moves.service'

@Component({
  selector: 'app-move-list',
  templateUrl: './move-list.component.html',
  styleUrls: ['./move-list.component.scss']
})
export class MoveListComponent implements OnInit {


  public moves!: PokemonList;
  public limit: number = 50;
  public offset: number = 0;
  constructor(private pokeapi: PokeMovesService) { }

  ngOnInit(): void {
    this.getMovesList(this.limit, this.offset);
  }

  getMovesList(limit: number, offset:number): void {
    this.pokeapi.getMovementList(limit, offset).subscribe(
      response => {
        this.moves = response;
      });
  }

  incrementOffset(): void {
    if(this.moves && this.offset < this.moves.count)   this.offset += this.limit;
   }

  reducetOffset(): void {
    if(this.offset > 0) this.offset -= this.limit;
  }

  setOffset(page: number): void{
    if(this.moves && this.offset < this.moves.count)   this.offset = this.limit * page;
  }

  getMaxLinks() {
    let links = 0;
    if(this.moves){
      links =  Math.ceil(this.moves.count / this.limit);
    }
    return links;
  }
}
