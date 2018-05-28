import axios from 'axios';

const GET_FORMS = 'GET_FORMS';
const CREATE_FORM = 'CREATE_FORM'

const getForms = forms => ({ type: GET_FORMS, forms });
const createForm =form=>({ type: CREATE_FORM, form })

export const getFormsFromServer = () => {
  return dispatch => {
    return axios.get('/api/forms')
      .then(result => result.data)
      .then(forms => dispatch(getForms(forms)));
  };
};

export const createFormOnServer = (form) => {
  return dispatch => {
    return axios.post('/api/forms', form)
      .then(result => result.data)
      .then(form => dispatch(createForm(form)))
  };
};

const store = (state = [], action) => {
  switch (action.type) {
    case GET_FORMS:
      return action.forms;
    case CREATE_FORM:
      return [ ...state, action.form ];
    default:
      return state;
  }
};

export default store;
