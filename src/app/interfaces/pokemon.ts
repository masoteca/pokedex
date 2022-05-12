import { Game } from './game';
import { Movement } from './movement';
import { PokeType } from './poke-type';
import { Sprite } from './sprite'

export interface Pokemon {
  name: string;
  types: Array<PokeType>;
  sprites: Sprite;
  order: number;
  id: number;
  height: number;
  weight: number;
  game_indices: Array<Game>;
  moves: Array<Movement>;
}
