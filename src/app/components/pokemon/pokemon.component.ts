import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { tap } from 'rxjs/operators';
import { Pokemon } from 'src/app/interfaces/pokemon';
import { PokemonServiceService } from 'src/app/services/pokemon-service.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  public pokemon!: Pokemon;

  constructor(private route: ActivatedRoute,
    private socket: Socket,
    private pokeapi: PokemonServiceService) {
  }

  ngOnInit(): void {
    this.pokeapi.getPokemon(this.route.snapshot.params['id'])
    .subscribe(data => this.pokemon = data);

  }

  pokemonCoverImage(): string {
    if(this.pokemon) return  this.pokemon.sprites.front_default  ;
    return '';
  }

  genMesage(){
    return this.socket.emit("message", "un mensaje con algo");
  }
  getMesage() {
    return  this.socket.fromEvent('nmessage').subscribe(data =>{console.log(data); console.log("mensaje recibido desde server")} );
  }

  getSaludo() {
    return  this.socket.fromEvent('welcome').subscribe(data =>console.log(data));
  }

}


