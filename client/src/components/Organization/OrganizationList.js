import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import OrganizationForm from './OrganizationForm';

const OrganizationList = ({ organizations, count, pluralize }) => {
  return (
    <div>
      <h4>Organizations</h4>
      <h5>There {pluralize[0]} {count} Organization{pluralize[1]}</h5>
      <OrganizationForm />
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
  const count = organizations.length;
  const pluralize = count === 1 ? [ 'is', '' ] : [ 'are', 's']
  return {
    organizations,
    count,
    pluralize
  }
}

export default connect(mapState)(OrganizationList);
