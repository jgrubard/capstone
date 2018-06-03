import React from 'react';
import { connect } from 'react-redux';
import { deleteOrganizationFromServer, deleteFormFromServer, deleteUserOrganizationFromServer, updateUserOnServer } from '../../store';
import OrganizationForm from './OrganizationForm';
import { Link } from 'react-router-dom';

const OrganizationInfo = ({ organization, id, deleteOrganization }) => {
  if (!organization) return null
  return (
    <div>
      <h2>{organization.name}</h2>
      {organization.image && <img src={organization.image} style={{ height: '200px', width: 'auto'}}/>}
      <OrganizationForm organization={organization} />
      <br></br>
      <button className="ui orange button"onClick={() => deleteOrganization(id)}>Delete Organization</button>
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
