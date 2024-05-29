import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PublisherState } from './publisher.reducer';

export const selectPublisherState = createFeatureSelector<PublisherState>('publishers');

export const selectAllPublishers = createSelector(
  selectPublisherState,
  (state: PublisherState) => state.publishers
);
