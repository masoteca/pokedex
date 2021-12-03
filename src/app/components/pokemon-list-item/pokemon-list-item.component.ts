import { Component,  Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-list-item',
  templateUrl: './pokemon-list-item.component.html',
  styleUrls: ['./pokemon-list-item.component.scss']
})

export class PokemonListItemComponent {
  @Input() puchamon!: {name: string; url: string};

  constructor( ) { }

  getIdPokemonFromUrl(): string {
   let splited = this.puchamon.url.split('/');
   return splited[splited.length - 2];
  }

}
