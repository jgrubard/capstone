import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import socket from './sockets';

import organizations from './organizations';
import users from './users';
import descriptions from './descriptions';
import user from './sessions';
import userOrganizations from './userOrganizations';
import forms from './forms'
import organizationRequests, { createOrganizationRequest } from './organizationRequests';
import userRequests from './userRequests';

const middleware = applyMiddleware(thunk, logger);
const reducers = combineReducers({ organizations, users, descriptions, user, userOrganizations, forms, organizationRequests, userRequests });

const store = createStore(reducers, middleware);

socket.on('newOrganizationRequest', organizationRequest => {
  store.dispatch(createOrganizationRequest(organizationRequest));
});

export default store;
export * from './organizations';
export * from './users';
export * from './descriptions';
export * from './userOrganizations';
export * from './sessions';
export * from './forms';
export * from './organizationRequests';
export * from './userRequests';
