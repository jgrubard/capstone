import axios from 'axios';

const GOT_DESCRIPTIONS = 'GOT_DESCRIPTIONS';

const gotDescriptions = descriptions => ({ type: GOT_DESCRIPTIONS, descriptions });

export const getDescriptions = () => {
  return dispatch => {
    return axios.get('/api/descriptions')
      .then(result => result.data)
      .then(descriptions => dispatch(gotDescriptions(descriptions)));
  };
};

const store = (state = [], action) => {
  switch (action.type) {
    case GOT_DESCRIPTIONS:
      return action.descriptions;
    default:
      return state;
  }
};

export default store;
