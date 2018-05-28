import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import organizations from './organizations';
import users from './users';
import descriptions from './descriptions';
import sessions from './sessions';
import userorganizations from './userorganizations';

const middleware = applyMiddleware(thunk, logger);
const reducers = combineReducers({ organizations, users, descriptions, sessions, userorganizations });

const store = createStore(reducers, middleware);

export default store;
export * from './organizations';
export * from './users';
export * from './descriptions';
export * from './userorganizations'
