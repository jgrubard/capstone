import axios from 'axios';

const GET_USERORGANIZATIONS = 'GET_USERORGANIZATIONS';

const getUserOrganizations = userorganizations => ({ type: GET_USERORGANIZATIONS, userorganizations });

export const getUserOrganizationsFromServer = () => {
  return dispatch => {
    return axios.get('/api/userorganizations')
      .then(result => result.data)
      .then(userorganizations => dispatch(getUserOrganizations(userorganizations)));
  };
};

const store = (state = [], action) => {
  switch (action.type) {
    case GET_USERORGANIZATIONS:
      return action.userorganizations;
    default:
      return state;
  }
};

export default store;
