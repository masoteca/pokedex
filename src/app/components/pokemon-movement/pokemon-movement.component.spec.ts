import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonMovementComponent } from './pokemon-movement.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {PokemonList} from "../../interfaces/pokemon-list";

describe('PokemonMovementComponent', () => {
  let component: PokemonMovementComponent;
  let fixture: ComponentFixture<PokemonMovementComponent>;
  let list: PokemonList;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ PokemonMovementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('receive data from the api with the movement model structure', () => {
    expect(component.movement).toBe(list);
  })
});
