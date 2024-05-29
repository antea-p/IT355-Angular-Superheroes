import { createReducer, on } from '@ngrx/store';
import { setPublishers, deletePublisher, createPublisher, updatePublisher } from 'src/app/state/publishers/publisher.actions';
import { Publisher } from 'src/app/model/publisher.model';

export interface PublisherState {
    publishers: Publisher[];
}

export const initialState: PublisherState = {
    publishers: []
};

export const publisherReducer = createReducer(
    initialState,
    on(setPublishers, (state, { publishers }) => ({ ...state, publishers })),
    on(deletePublisher, (state, { id }) => ({
        ...state,
        publishers: state.publishers.filter(publisher => publisher.id !== id)
    })),
    on(createPublisher, (state, { publisher }) => ({
        ...state,
        publishers: [...state.publishers, publisher]
    })),
    on(updatePublisher, (state, { publisher }) => ({
        ...state,
        publishers: state.publishers.map(p => p.id === publisher.id ? publisher : p)
    }))
);