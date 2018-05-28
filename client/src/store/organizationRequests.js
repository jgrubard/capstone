import axios from 'axios';

const GET_ORGANIZATION_REQUESTS = 'GET_ORGANIZATION_REQUESTS';

const getOrganizationRequests = organizationRequests => ({ type: GET_ORGANIZATION_REQUESTS, organizationRequests });

export const getOrganizationRequestsFromServer = () => {
  return dispatch => {
    return axios.get('/api/organizationRequests')
      .then(result => result.data)
      .then(organizationRequests => dispatch(getOrganizationRequests(organizationRequests)));
  };
};

const store = (state = [], action) => {
  switch (action.type) {
    case GET_ORGANIZATION_REQUESTS:
      return action.organizationRequests;
    default:
      return state;
  }
};

export default store;
