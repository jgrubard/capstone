import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const OrganizationList = ({ organizations }) => {
  return (
    <div>
      <ul>
        {
          organizations.map(org => (
            <li key={org.id}>
              <Link to={`/organizations/${org.id}`}>
                { org.name }
              </Link>
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
