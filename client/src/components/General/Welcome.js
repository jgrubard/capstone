import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Welcome = ({user, orgId}) => {
  return (
    <div>
      {user.userStatus === 'admin'?
      <div>
      <h3>Welcome {user.firstName} to Pair Up!</h3>
      </div> : null
      }
    </div>
  )
}

const mapState = ({ user, userOrganizations}) => {
  const loggedIn = !!user.id;
  const entry = loggedIn && userOrganizations.find( (ent) => {
    return ent.userId === user.id
  });
  const orgId = entry && entry.organizationId;
  return { user, loggedIn, orgId }
}


export default connect(mapState, null)(Welcome)
