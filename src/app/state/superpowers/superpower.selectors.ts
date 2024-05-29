import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SuperpowerState } from 'src/app/state/superpowers/superpower.reducer';

export const selectSuperpowerState = createFeatureSelector<SuperpowerState>('superpowers');

export const selectAllSuperpowers = createSelector(
  selectSuperpowerState,
  (state: SuperpowerState) => state.superpowers
);
