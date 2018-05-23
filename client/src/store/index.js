import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import organizations from './organizations';

const middleware = applyMiddleware(logger, thunk);
const reducers = combineReducers({ organizations });

const store = createStore(reducers, middleware);

export default store;
export * from './organizations';
