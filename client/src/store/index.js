import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import organizations from './organizations';
import users from './users';

const middleware = applyMiddleware(logger, thunk);
const reducers = combineReducers({ organizations, users });

const store = createStore(reducers, middleware);

export default store;
export * from './organizations';
export * from './users';
