import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Welcome = ({user, orgId}) => {
  return (
    <div>
      {user.userStatus === 'admin'?
      <div>
      <h3>Welcome {user.firstName} to Pair App</h3>
      <Link to ={`/organizations/${orgId}`}><button className="ui olive button">Go to my Dashboard</button></Link>
      </div> : null
      }
    </div>
  )
}

const mapState = ({ user, userorganizations}) => {
  const loggedIn = !!user.id;
  const entry = loggedIn && userorganizations.find( (ent) => {
    return ent.userId === user.id
  });
  const orgId = entry && entry.organizationId;
  return { user, loggedIn, orgId }
}


export default connect(mapState, null)(Welcome)