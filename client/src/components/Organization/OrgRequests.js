import React from 'react';
import { connect } from 'react-redux';
import OrganizationRequests from './OrganizationRequests';
import { Link } from 'react-router-dom';

const OrgRequests = ({ organization, id }) => {
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
              <Link to={`/organizations/${orgId}/requests`} href="#" class="list-group-item active">Manage Requests</Link>
              <Link to={`/organizations/${orgId}/customize`} href="#" class="list-group-item">Customize My Page</Link>
              <Link to={`/organizations/${orgId}/account`} href="#" class="list-group-item">Account Details</Link>
            </div>
          </div>

          <div class="col-lg-9" >
            <div class="card mt-4 card-body">
              <h2>Pending Requests</h2>
              <span>&nbsp;</span>
              <OrganizationRequests organization={organization} />
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

const mapState = ({ organizations, users }, { id }) => {
  const organization = organizations.find(org => org.id === id);
  return { organization }
}

export default connect(mapState, null)(OrgRequests);
