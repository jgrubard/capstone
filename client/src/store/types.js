import axios from 'axios';

const GET_TYPES = 'GET_TYPES';

const getTypes = types => ({ type: GET_TYPES, types });

export const getTypesFromServer = () => {
  return dispatch => {
    return axios.get('/api/types')
      .then(result => result.data)
      .then(types => dispatch(getTypes(types)));
  };
};

const store = (state = [], action) => {
  switch (action.type) {
    case GET_TYPES:
      return action.types;
    default:
      return state;
  }
};

export default store;
