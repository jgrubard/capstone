import React from 'react';
import { connect } from 'react-redux';
import { deleteOrganizationFromServer } from '../../store';

import OrganizationForm from './OrganizationForm';

const OrganizationInfo = ({ organization, id, deleteOrganization,thisOrganizationUsersNew }) => {
  if (!organization) return null
  console.log(thisOrganizationUsersNew)
  return (
    <div>
      <h2>{organization.name}</h2>
      <OrganizationForm organization={organization} />
      <button onClick={() => deleteOrganization(id)}>Delete Organization</button>
      <h4>Users of this organization</h4>
      <ul>
      {thisOrganizationUsersNew && thisOrganizationUsersNew.map(user=><li key={user.id}>{user.fullName}</li>)}
      </ul>
    </div>
  );
}

const mapState = ({ organizations, users, userorganizations }, { id }) => {
  const organization = organizations.find(org => org.id === id);
  const thisOrganizationUsers = userorganizations.filter(userorganization => userorganization.organizationId === organization.id);
  const idArr = thisOrganizationUsers.map(thisOrganizationUser => thisOrganizationUser.userId);
  const thisOrganizationUsersNew = users.filter(user => idArr.includes(user.id));
  return { organization, thisOrganizationUsersNew }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    deleteOrganization: (id) => dispatch(deleteOrganizationFromServer(id, history))
  }
}

export default connect(mapState, mapDispatch)(OrganizationInfo);
