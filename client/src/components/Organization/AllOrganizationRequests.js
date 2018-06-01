import React from 'react';
import { connect } from 'react-redux';
import { deleteOrganizationRequestFromServer } from '../../store';

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
              <button onClick={() => deleteOrganizationRequest(request.id)}>delete</button>
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
    deleteOrganizationRequest: (id) => dispatch(deleteOrganizationRequestFromServer(id))
  }
}

export default connect(mapState, mapDispatch)(AllOrganizationRequests);
