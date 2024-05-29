import { createAction, props } from '@ngrx/store';
import { Superpower } from 'src/app/model/superpower.model';

export const setSuperpowers = createAction('[Superpower] Set Superpowers', props<{ superpowers: Superpower[] }>());
export const createSuperpower = createAction('[Superpower] Create Superpower', props<{ superpower: Superpower }>());
export const updateSuperpower = createAction('[Superpower] Update Superpower', props<{ superpower: Superpower }>());
export const deleteSuperpower = createAction('[Superpower] Delete Superpower', props<{ id: number }>());
