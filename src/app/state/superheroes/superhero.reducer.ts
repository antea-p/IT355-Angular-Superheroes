import { createReducer, on } from '@ngrx/store';
import { setSuperheroes, createSuperhero, updateSuperhero, deleteSuperhero } from 'src/app/state/superheroes/superhero.actions';
import { Superhero } from 'src/app/model/superhero.model';

export interface SuperheroState {
    superheroes: Superhero[];
}

export const initialState: SuperheroState = {
    superheroes: []
};

export const superheroReducer = createReducer(
    initialState,
    on(setSuperheroes, (state, { superheroes }) => ({ ...state, superheroes })),
    on(createSuperhero, (state, { superhero }) => ({
        ...state,
        superheroes: [...state.superheroes, superhero]
    })),
    on(updateSuperhero, (state, { superhero }) => ({
        ...state,
        superheroes: state.superheroes.map(sh => sh.id === superhero.id ? superhero : sh)
    })),
    on(deleteSuperhero, (state, { id }) => ({
        ...state,
        superheroes: state.superheroes.filter(superhero => superhero.id !== id)
    }))
);
