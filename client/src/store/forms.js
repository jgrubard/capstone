import axios from 'axios';

const GET_FORMS = 'GET_FORMS';

const getForms = forms => ({ type: GET_FORMS, forms });

export const getFormsFromServer = () => {
  return dispatch => {
    return axios.get('/api/forms')
      .then(result => result.data)
      .then(forms => dispatch(getForms(forms)));
  };
};

const store = (state = [], action) => {
  switch (action.type) {
    case GET_FORMS:
      return action.forms;
    default:
      return state;
  }
};

export default store;
