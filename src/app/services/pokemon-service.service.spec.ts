import {HttpClient, HttpClientModule} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { PokemonServiceService } from './pokemon-service.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('PokemonServiceService', () => {
  let service: PokemonServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
    });
    service = TestBed.inject(PokemonServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("receive a list of pokemon", () => {
    expect(service.getPokemonList()).toBeTruthy();
  })
});
