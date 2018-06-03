import React from 'react';
import { connect } from 'react-redux';
import { deleteOrganizationFromServer, deleteFormFromServer, deleteUserOrganizationFromServer } from '../../store';
import AddUserForm from '../User/AddUserForm';
import { Link } from 'react-router-dom';

const OrgUsers = ({ organization, id, ownUsers, removeUser, userOrganizations }) => {
  if (!organization) return null
  return (
    <div>
      <h4>My Members</h4>
      <ul>
      {
        ownUsers.map(user => (
          <li key={user.id}>
            {user.fullName}
            <Link to={`/users/${user.id}`}><button>Edit Member</button></Link>
            <button onClick={() => removeUser(user.id, organization.id, userOrganizations)}>Remove from {organization.name}</button>
          </li>
        ))
      }
      </ul>
      <AddUserForm organization={organization} />
    </div>
  );
}

const mapState = ({ organizations, users, userOrganizations }, { id }) => {
  const organization = organizations.find(org => org.id === id);
  const ownUsers = userOrganizations.reduce((memo, userOrg) => {
    const user = users.find(user => user.id === userOrg.userId && id === userOrg.organizationId)
    if (!memo.includes(user) && user) {
      memo.push(user)
    }
    return memo;
  }, [])
  return { organization, ownUsers, userOrganizations }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    removeUser: (userId, organizationId, userOrgs) => {
      const userOrg = userOrgs.find(userOrg => userOrg.userId === userId && userOrg.organizationId === organizationId)
      dispatch(deleteUserOrganizationFromServer(userOrg.id))
    }
  }
}

export default connect(mapState, mapDispatch)(OrgUsers);
