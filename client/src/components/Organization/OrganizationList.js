import React from 'react';
import { connect } from 'react-redux';

const OrganizationList = ({ organizations }) => {
  return (
    <div>
      <ul>
        {
          organizations.map(org => (
            <li key={org.id}>
              {org.name}
            </li>
          ))
        }
      </ul>
    </div>
  );
}

const mapState = ({ organizations }) => {
  return {
    organizations
  }
}

export default connect(mapState)(OrganizationList);
