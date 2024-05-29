import { createReducer, on } from '@ngrx/store';
import { setSuperpowers, createSuperpower, updateSuperpower, deleteSuperpower } from 'src/app/state/superpowers/superpower.actions';
import { Superpower } from 'src/app/model/superpower.model';

export interface SuperpowerState {
  superpowers: Superpower[];
}

export const initialState: SuperpowerState = {
  superpowers: []
};

export const superpowerReducer = createReducer(
  initialState,
  on(setSuperpowers, (state, { superpowers }) => ({ ...state, superpowers })),
    on(createSuperpower, (state, { superpower }) => ({
        ...state,
        superpowers: [...state.superpowers, superpower]
    })),
    on(updateSuperpower, (state, { superpower }) => ({
        ...state,
        superpowers: state.superpowers.map(sp => sp.id === superpower.id ? superpower : sp)
    })),
    on(deleteSuperpower, (state, { id }) => ({
        ...state,
        superpowers: state.superpowers.filter(superpower => superpower.id !== id)
    }))
);
