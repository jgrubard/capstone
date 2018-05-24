import React from 'react';
import { connect } from 'react-redux';

import OrganizationForm from './OrganizationForm';

const OrganizationInfo = ({ organization }) => {
  if (!organization) return null
  return (
    <div>
      <h2>{organization.name}</h2>
      <OrganizationForm organization={organization} />
    </div>
  );
}

const mapState = ({ organizations }, { id }) => {
  const organization = organizations.find(org => org.id === id);
  return { organization }
}

export default connect(mapState)(OrganizationInfo);
