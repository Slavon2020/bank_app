import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { reducer } from './reducer';

// @ts-ignore
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f => f)

export const store = createStore(
    reducer,
    compose(applyMiddleware(thunk), devTools)
);