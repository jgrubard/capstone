import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store'

const Nav = ({ user, loggedIn, logout, orgId }) => {
  const url = location.hash.slice(1)
  return (
    <div className="ui inverted menu">
      {
        loggedIn ?
          (
            <ul >
              {user.userStatus === 'admin' ?
                (
                  <div>
                    <li className="item">
                      <Link to={`/organizations/${orgId}/users`}>Manage Users</Link>
                    </li>
                    <li className="item">
                      <Link to={`/organizations/${orgId}/requests`}>Manage Requests</Link>
                    </li>
                    <li className="item">
                      <Link to={`/organizations/${orgId}/customize`}>Customize My Page</Link>
                    </li>
                    <li className="item">
                      <Link to={`/organizations/${orgId}/account`}>Account Detail</Link>
                    </li>
                  </div>) : null
              }
              <li className="item">
                <span onClick={logout}>Log out</span>
              </li>
            </ul>
          ) : (
            <li className="item">
              <Link to='/login'>Log In</Link>
            </li>
          )
      }
    </div>
  );
}

const mapState = ({ user, userOrganizations, logout }) => {
  const loggedIn = !!user.id;
  const entry = loggedIn && userOrganizations.find((ent) => {
    return ent.userId === user.id
  });
  const orgId = entry && entry.organizationId;
  return { user, loggedIn, orgId }
}

const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(mapState, mapDispatch)(Nav)
