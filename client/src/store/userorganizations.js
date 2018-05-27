import axios from 'axios';

const GET_USERORGANIZATIONS = 'GET_USERORGANIZATIONS';
const CREATE_USERORGANIZATION = 'CREATE_USERORGANIZATION'

const getUserOrganizations = userorganizations => ({ type: GET_USERORGANIZATIONS, userorganizations });
const createUserOrganization =userorganization=>({type:CREATE_USERORGANIZATION,userorganization  })

export const getUserOrganizationsFromServer = () => {
  return dispatch => {
    return axios.get('/api/userorganizations')
      .then(result => result.data)
      .then(userorganizations => dispatch(getUserOrganizations(userorganizations)));
  };
};

export const createUserOrganizationOnServer = (userorganization) => {
  return dispatch => {
    return axios.post('/api/userorganizations', userorganization)
      .then(result => result.data)
      .then(userorganization => dispatch(createUserOrganization(userorganization)))
  };
};
const store = (state = [], action) => {
  switch (action.type) {
    case GET_USERORGANIZATIONS:
      return action.userorganizations;
    case CREATE_USERORGANIZATION:
      return [ ...state, action.userorganization ];
    default:
      return state;
  }
};

export default store;
