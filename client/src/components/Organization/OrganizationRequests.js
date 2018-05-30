import React from 'react';
import { connect } from 'react-redux';

const OrganizationRequests = ({ organization, ownUsers }) => {
  return (
    <div>
      {
        ownUsers.map(user => (
          <div key={user.id}>
            {user.fullName}
          </div>
        ))
      }
    </div>
  );
}

const mapState = ({ users, organizations, organizationRequests }, { organization }) => {
  // const organization = organizations.find(org => org.id === id)
  // const ownRequests = organizationRequests.filter(orgReq => orgReq.organizationId === organization.id)
  const ownUsers = organizationRequests.reduce((memo, request) => {
    users.forEach(user => {
      if(request.organizationId === organization.id && request.userId === user.id) {
        memo.push(user)
      }
    })
    return memo;
  }, [])
  return {
    organization,
    ownUsers,
  }
}

export default connect(mapState)(OrganizationRequests)
