import { createAction, props } from '@ngrx/store';
import { Publisher } from 'src/app/model/publisher.model';

export const setPublishers = createAction('[Publisher] Set Publishers', props<{ publishers: Publisher[] }>());
export const deletePublisher = createAction('[Publisher] Delete Publisher', props<{ id: number }>());
export const createPublisher = createAction('[Publisher] Create Publisher', props<{ publisher: Publisher }>());
export const updatePublisher = createAction('[Publisher] Update Publisher', props<{ publisher: Publisher }>());
