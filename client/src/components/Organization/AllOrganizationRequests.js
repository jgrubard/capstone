import React from 'react';
import { connect } from 'react-redux';
import { deleteOrganizationRequestFromServer, updateUserOnServer } from '../../store';

const AllOrganizationRequests = ({ users, organizations, organizationRequests, deleteOrganizationRequest }) => {
  return (
    <div>
      <h2>All Organization Requests</h2>
      {
        organizationRequests.map(request => {
          const user = users.find(user => user.id === request.userId)
          const organization = organizations.find(organization => organization.id === request.organizationId)
          const checkedOrg = organizations.find(org => org.id === user.checkedInId)
          return (
            <div key={request.id}>
              {organization.name} requested by {user.fullName} ({ request.status }) - {user.checkedInId ? `Checked into ${checkedOrg.name}` : 'Checked in Nowhere'}
              <button onClick={() => deleteOrganizationRequest(request.id, user, checkedOrg.id )}>delete</button>
            </div>
          );
        })
      }
    </div>
  );
}

const mapState = ({ users, organizations, organizationRequests }) => {
  return {
    organizationRequests,
    users,
    organizations
  }
}

const mapDispatch = dispatch => {
  return {
    deleteOrganizationRequest: (requestId, user, orgId) => {
      if (user.checkedInId === orgId) {
        const { id, firstName, lastName, email, password, userStatus } = user;
        dispatch(updateUserOnServer({ id, firstName, lastName, email, password, userStatus, checkedInId: null }))
      }
      dispatch(deleteOrganizationRequestFromServer(requestId))
    }
  }
}

export default connect(mapState, mapDispatch)(AllOrganizationRequests);
