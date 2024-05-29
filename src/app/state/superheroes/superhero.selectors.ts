import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SuperheroState } from './superhero.reducer';

export const selectSuperheroState = createFeatureSelector<SuperheroState>('superheroes');

export const selectAllSuperheroes = createSelector(
  selectSuperheroState,
  (state: SuperheroState) => state.superheroes
);
