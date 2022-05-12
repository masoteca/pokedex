import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonList } from '../interfaces/pokemon-list';

@Injectable({
  providedIn: 'root'
})
export class PokeMovesService {
  public url: string ='https://pokeapi.co/api/v2/move';

  constructor(private http: HttpClient) { }

  getMovementList(limit: number = 50, offset: number = 0): Observable<PokemonList> {
    return this.http.get<PokemonList>(`${this.url}?limit=${limit}&offset=${offset}` );
  }

  getMovement(id: number| string): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

}
