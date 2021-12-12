import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonMovementComponent } from './pokemon-movement.component';

describe('PokemonMovementComponent', () => {
  let component: PokemonMovementComponent;
  let fixture: ComponentFixture<PokemonMovementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonMovementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
