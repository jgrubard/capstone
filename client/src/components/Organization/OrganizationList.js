import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import OrganizationForm from './OrganizationForm';

const OrganizationList = ({ organizations, count, pluralize }) => {
  return (
    <div>
      <h2>Organizations</h2>
      <h4>Add an organization</h4>
      <OrganizationForm />

      <ol style={{type:1}}>
      <h4 style={{'marginTop':'20px'}}>There {pluralize[0]} currently {count} Organization{pluralize[1]}:</h4>
        {
          organizations.map(org => (
            <li key={org.id} style={{'marginTop':'10px'}}>
              <Link to={`/organizations/${org.id}`}>
              { org.name }
              </Link>
            </li>
          ))
        }
      </ol>
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
