import React from 'react';
import { connect } from 'react-redux';
import { updateOrganizationRequestOnServer } from '../../store';

const OrganizationRequests = ({ organization, ownUsers, acceptUser, declineUser, organizationRequests }) => {
  return (
    <div>
      {
        ownUsers.map(user => {
          const ownRequest = organizationRequests.find(request => request.userId === user.id && request.organizationId === organization.id);
          const { id, userId, organizationId } = ownRequest;
          return (
            <div key={user.id}>
              {user.fullName}
              <button onClick={() => acceptUser({ id, userId, organizationId, status: 'accepted' })}>Accept</button>
              <button onClick={() => declineUser({ id, userId, organizationId, status: 'declined' })}>Decline</button>
            </div>
          )
        })
      }
    </div>
  );
}

const mapState = ({ users, organizations, organizationRequests }, { organization }) => {
  const ownUsers = organizationRequests.reduce((memo, request) => {
    users.forEach(user => {
      if(request.organizationId === organization.id && request.userId === user.id) {
        if(!memo.includes(user)) {
          memo.push(user)
        }
      }
    })
    return memo;
  }, [])
  return {
    organization,
    ownUsers,
    organizationRequests
  }
}

const mapDispatch = dispatch => {
  return {
    acceptUser: (orgReq) => dispatch(updateOrganizationRequestOnServer(orgReq)),
    declineUser: (orgReq) => dispatch(updateOrganizationRequestOnServer(orgReq)),
  }
}

export default connect(mapState, mapDispatch)(OrganizationRequests)
