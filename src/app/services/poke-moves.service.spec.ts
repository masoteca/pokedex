import { TestBed } from '@angular/core/testing';

import { PokeMovesService } from './poke-moves.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('PokeMovesService', () => {
  let service: PokeMovesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
    });
    service = TestBed.inject(PokeMovesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
