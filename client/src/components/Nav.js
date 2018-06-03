import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store'

const Nav = ({ user, loggedIn, logout, orgId }) => {
  const url = location.hash.slice(1)
  return (
    <div className="ui inverted menu">
    <a className="item">LOGO</a>
      {
        loggedIn ? (
          <div className='ui inverted menu'>
            {
              user.userStatus === 'admin' ? (
                <div className='ui inverted menu'>
                  <span className="item">
                    <Link to={`/organizations/${orgId}/users`}>Manage Members</Link>
                  </span>
                  <span className="item">
                    <Link to={`/organizations/${orgId}/requests`}>Manage Requests</Link>
                  </span>
                  <span className="item">
                    <Link to={`/organizations/${orgId}/customize`}>Customize My Page</Link>
                  </span>
                  <span className="item">
                    <Link to={`/organizations/${orgId}/account`}>Account Details</Link>
                  </span>
                </div>
              ) : null
            }
            <div>
              <span className="active blue item" onClick={logout}>Log out</span>
            </div>
          </div>
        ) : (
          <span className="active blue item">
            <Link to='/login'>Log In</Link>
          </span>
        )
      }
    </div>
  );
}

const mapState = ({ user, userOrganizations, logout }) => {
  const loggedIn = !!user.id;
  const entry = loggedIn && userOrganizations.find(entry => {
    return entry.userId === user.id
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
