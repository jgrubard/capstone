import axios from 'axios';

const GOT_ORGANIZATIONS = 'GET_ORGANIZATIONS';
const gotOrganizations = organizations => {
  return { type: GOT_ORGANIZATIONS, organizations };
};

export const getOrganizations = () => {
  return dispatch => {
    return axios.get('/api/organizations')
      .then(result => result.data)
      .then(organizations => dispatch(gotOrganizations(organizations)));
  };
};

const store = (state = [], action) => {
  switch (action.type) {
  case GOT_ORGANIZATIONS:
    return action.organizations;
  default:
    return state;
  }
};

export default store;

