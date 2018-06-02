import React from 'react';
import { connect } from 'react-redux';
import { deleteUserRequestFromServer } from '../../store';

const UserRequests = ({ users, userRequests, deleteRequest }) => {
  return (
    <div>
      <h4>User Requests</h4>
      {
        userRequests.map(request => {
          const requester = users.find(user => user.id === request.requesterId);
          const responder = users.find(user => user.id === request.responderId);
          return (
            <div key={request.id}>
              {requester.fullName} wants to pair with {responder.fullName}
              <button onClick={() => deleteRequest(request.id)}>delete</button>
            </div>
          )
        })
      }
    </div>
  );
}

const mapState = ({ users, userRequests }) => {
  return { users, userRequests }
}

const mapDispatch = (dispatch) => {
  return {
    deleteRequest: (requestId) => dispatch(deleteUserRequestFromServer(requestId))
  }
}

export default connect(mapState, mapDispatch)(UserRequests);
