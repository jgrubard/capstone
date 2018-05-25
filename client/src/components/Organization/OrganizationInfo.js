import React from 'react';
import { connect } from 'react-redux';
import { deleteOrganizationFromServer } from '../../store';

import OrganizationForm from './OrganizationForm';

const OrganizationInfo = ({ organization, id, deleteOrganization }) => {
  if (!organization) return null
  return (
    <div>
      <h2>{organization.name}</h2>
      <OrganizationForm organization={organization} />
      <button onClick={() => deleteOrganization(id)}>Delete Organization</button>
    </div>
  );
}

const mapState = ({ organizations }, { id }) => {
  const organization = organizations.find(org => org.id === id);
  return { organization }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    deleteOrganization: (id) => dispatch(deleteOrganizationFromServer(id, history))
  }
}

export default connect(mapState, mapDispatch)(OrganizationInfo);
