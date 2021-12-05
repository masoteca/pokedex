import { TestBed } from '@angular/core/testing';

import { PokeMovesService } from './poke-moves.service';

describe('PokeMovesService', () => {
  let service: PokeMovesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokeMovesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
