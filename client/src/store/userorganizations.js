import axios from 'axios';

const GET_USERORGANIZATIONS = 'GET_USERORGANIZATIONS';
const CREATE_USERORGANIZATION = 'CREATE_USERORGANIZATION';
// const UPDATE_USERORGANIZATION = 'UPDATE_USERORGANIZATION';
const DELETE_USERORGANIZATION = 'DELETE_USERORGANIZATION';


const getUserOrganizations = userorganizations => ({ type: GET_USERORGANIZATIONS, userorganizations });
const createUserOrganization = userorganization => ({ type: CREATE_USERORGANIZATION, userorganization });
// const updateUserOrganization = userorganization => ({ type: UPDATE_USERORGANIZATION, userorganization });
const deleteUserOrganization = id => ({ type: DELETE_USERORGANIZATION, id });

export const getUserOrganizationsFromServer = () => {
  return dispatch => {
    return axios.get('/api/userorganizations')
      .then(result => result.data)
      .then(userorganizations => dispatch(getUserOrganizations(userorganizations)));
  };
};

export const createUserOrganizationOnServer = (userorganization) => {
  console.log('thunk:', userorganization)
  return dispatch => {
    return axios.post('/api/userorganizations', userorganization)
      .then(result => result.data)
      .then(userorganization => dispatch(createUserOrganization(userorganization)))
  };
};

// export const UpdateUserOrganizationOnServer = (userorganization) => {
//   const { id } = userorganization;
//   return dispatch => {
//     return axios.put(`/api/userorganizations/${id}`, userorganization)
//       .then(result => result.data)
//       .then(userorganization => dispatch(updateUserOrganization(userorganization)))
//   };
// };

export const deleteUserOrganizationFromServer = (id) => {
  return dispatch => {
    return axios.delete(`/api/userorganizations/${id}`)
      .then(() => dispatch(deleteUserOrganization(id)));
  };
};

const store = (state = [], action) => {
  let userorganizations;
  switch (action.type) {
    case GET_USERORGANIZATIONS:
      return action.userorganizations;
    case CREATE_USERORGANIZATION:
      return [ ...state, action.userorganization ];
    case DELETE_USERORGANIZATION:
      userorganizations = state.filter(userorganization => userorganization.id !== action.id)
      return userorganizations;
    default:
      return state;
  }
};

export default store;
