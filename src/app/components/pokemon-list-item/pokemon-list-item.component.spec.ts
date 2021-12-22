import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonListItemComponent } from './pokemon-list-item.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";

describe('PokemonListItemComponent', () => {
  let component: PokemonListItemComponent;
  let fixture: ComponentFixture<PokemonListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ PokemonListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonListItemComponent);
    component = fixture.componentInstance;
    let puchamon;
    puchamon = {name: 'prueba pokemon', url: 'pokemon/1/'}

    component.puchamon = puchamon;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
