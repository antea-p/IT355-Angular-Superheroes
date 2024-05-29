import { createAction, props } from '@ngrx/store';
import { Superhero } from '../../model/superhero.model';

export const setSuperheroes = createAction('[Superhero] Set Superheroes', props<{ superheroes: Superhero[] }>());
export const createSuperhero = createAction('[Superhero] Create Superhero', props<{ superhero: Superhero }>());
export const updateSuperhero = createAction('[Superhero] Update Superhero', props<{ superhero: Superhero }>());
export const deleteSuperhero = createAction('[Superhero] Delete Superhero', props<{ id: number }>());
