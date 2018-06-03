import React from 'react';
import { connect } from 'react-redux';
import OrganizationRequests from './OrganizationRequests';
import { Link } from 'react-router-dom';

const OrgRequests = ({ organization, id }) => {
  if (!organization) return null
  return (
    <div>
      <h2>{organization.name}</h2>
      <h3>Pending Requests</h3>
      <OrganizationRequests organization={organization} />
    </div>
  );
}

const mapState = ({ organizations, users }, { id }) => {
  const organization = organizations.find(org => org.id === id);
  return { organization }
}

export default connect(mapState, null)(OrgRequests);
