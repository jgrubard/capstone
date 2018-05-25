import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import organizations from './organizations';
import users from './users';
import descriptions from './descriptions';
import sessions from './sessions';

const middleware = applyMiddleware(thunk, logger);
const reducers = combineReducers({ organizations, users, descriptions });

const store = createStore(reducers, middleware);

export default store;
export * from './organizations';
export * from './users';
export * from './descriptions';
