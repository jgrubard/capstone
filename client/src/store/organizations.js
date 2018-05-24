import axios from 'axios';

const GOT_ORGANIZATIONS = 'GOT_ORGANIZATIONS';
const CREATE_ORGANIZATION = 'CREATE_ORGANIZATION';
const UPDATE_ORGANIZATION = 'UPDATE_ORGANIZATION';

const gotOrganizations = organizations => ({ type: GOT_ORGANIZATIONS, organizations });
const createOrganization = organization => ({ type: CREATE_ORGANIZATION, organization });
const updateOrganization = organization => ({ type: UPDATE_ORGANIZATION, organization });

export const getOrganizations = () => {
  return dispatch => {
    return axios.get('/api/organizations')
      .then(result => result.data)
      .then(organizations => dispatch(gotOrganizations(organizations)));
  };
};

export const updateOrganizationOnServer = (organization) => {
  const { id } = organization;
  const method = id ? 'put' : 'post';
  const url = id ? `/api/organizations/${id}` : '/api/organizations';
  const action = id ? updateOrganization : createOrganization;
  return dispatch => {
    return axios[method](url, organization)
      .then(result => result.data)
      .then(organization => {
        console.log(organization)
        dispatch(action(organization))
      })
  }
}

const store = (state = [], action) => {
  switch (action.type) {
    case GOT_ORGANIZATIONS:
      return action.organizations;
    case CREATE_ORGANIZATION:
      return [ ...state, action.organization ];
    case UPDATE_ORGANIZATION:
      return [ ...state.filter(org => org.id !== action.organization.id), action.organization ];
    default:
      return state;
  }
};

export default store;

