import React from 'react';
import { connect } from 'react-redux';
import { deleteOrganizationFromServer, deleteFormFromServer, deleteUserOrganizationFromServer, updateUserOnServer } from '../../store';
import OrganizationForm from './OrganizationForm';
import { Link } from 'react-router-dom';

const OrganizationInfo = ({ organization, id, deleteOrganization }) => {
  if (!organization) return null
  var orgId = id;
  return (
    <div class="org-background">
      <div class="container">
        <div class="row">

          <div class="col-lg-3">
            <h3 class="my-4"></h3>
            <div class="list-group">
              <Link to={`/organizations/${orgId}/users`} class="list-group-item">Manage Members</Link>
              <Link to={`/organizations/${orgId}/requests`} href="#" class="list-group-item">Manage Requests</Link>
              <Link to={`/organizations/${orgId}/customize`} href="#" class="list-group-item">Customize My Page</Link>
              <Link to={`/organizations/${orgId}/account`} href="#" class="list-group-item active">Account Details</Link>
            </div>
          </div>

          <div class="col-lg-9" >
            <div class="card mt-4 card-body">
              <h2>{organization.name}</h2>
              {organization.image && <img src={organization.image} style={{ height: '200px', width: 'auto' }} />}
              <OrganizationForm organization={organization} />
              <br></br>
              <button className="btn btn-danger" onClick={() => deleteOrganization(id)}>Delete Organization</button>

            </div>
          </div>
        </div>
      </div>
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
