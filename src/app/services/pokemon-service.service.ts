import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokemonList } from '../interfaces/pokemon-list';
import { Pokemon } from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonServiceService {

  public url: string ='https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) { }

  getPokemonList(limit: number = 50, offset: number = 0): Observable<PokemonList> {
    return this.http.get<PokemonList>(`${this.url}?limit=${limit}&offset=${offset}` );
  }

  getPokemon(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.url}/${id}`);
  }

}
