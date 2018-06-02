import axios from 'axios';

const GET_USER_REQUESTS = 'GET_USER_REQUESTS';

const getUserRequests = (userRequests) => ({ type: GET_USER_REQUESTS, userRequests })

export const getUserRequestsFromServer = () => {
  return dispatch => {
    return axios.get('/api/userRequests')
      .then(result => result.data)
      .then(userRequests => dispatch(getUserRequests(userRequests)))
  }
}

const store = (state = [], action) => {
  switch(action.type) {
    case GET_USER_REQUESTS:
      return action.userRequests;
    default:
      return state;
  }
}

export default store;
