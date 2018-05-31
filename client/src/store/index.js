import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import organizations from './organizations';
import users from './users';
import descriptions from './descriptions';
import user from './sessions';
import userOrganizations from './userOrganizations';
import forms from './forms'
import organizationRequests from './organizationRequests';

const middleware = applyMiddleware(thunk, logger);
const reducers = combineReducers({ organizations, users, descriptions, user, userOrganizations, forms, organizationRequests });

const store = createStore(reducers, middleware);

export default store;
export * from './organizations';
export * from './users';
export * from './descriptions';
export * from './userOrganizations';
export * from './sessions';
export * from './forms';
export * from './organizationRequests';
