import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import socket from './sockets';

import organizations, { updateOrganizationOnServer } from './organizations';
import users from './users';
import descriptions from './descriptions';
import user, { updateUserOrganizationId } from './sessions';
import userOrganizations from './userOrganizations';
import forms from './forms'
import organizationRequests, { createOrganizationRequest } from './organizationRequests';
import userRequests from './userRequests';

const middleware = applyMiddleware(thunk, logger);
const reducers = combineReducers({ organizations, users, descriptions, user, userOrganizations, forms, organizationRequests, userRequests });

const store = createStore(reducers, middleware);

export const createNewOrg = (organization, userId, history) => {
  return dispatch => {
    return dispatch(updateOrganizationOnServer(organization))
      .then(organization => dispatch(updateUserOrganizationId(userId, organization.id)))
      .then(() => history.push('/'))
  }
}

socket.on('newOrganizationRequest', organizationRequest => {
  console.log(organizationRequest)
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
