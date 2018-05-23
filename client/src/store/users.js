import axios from 'axios';

const GOT_USERS = 'GET_USERS';

const gotUsers = users => ({ type: GOT_USERS, users });

export const getUsers = () => {
  return dispatch => {
    return axios.get('/api/users')
      .then(result => result.data)
      .then(users => dispatch(gotUsers(users)));
  };
};

const store = (state = [], action) => {
  switch (action.type) {
  case GOT_USERS:
    return action.users;
  default:
    return state;
  }
};

export default store;
