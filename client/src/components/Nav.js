import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store'

const Nav = ({ user, loggedIn, logout, orgId }) => {
  const url = location.hash.slice(1)
  return (
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-color fixed-top">
        <div class="container">
          <a class="navbar-brand" href="#">Pair Up!</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
      {
        loggedIn ? (
          <div>
            {
              user.userStatus === 'admin' ?
                user.organizationId ?
                (
                <div class="navbar-nav ml-auto">
                  {/* <li>
                    <Link class="nav-item" to={`/organizations/${orgId}/users`}>Manage Members</Link>
                  </li>
                  <li>
                    <Link class="nav-item" to={`/organizations/${orgId}/requests`}>Manage Requests</Link>
                  </li>
                  <li>
                    <Link class="nav-item" to={`/organizations/${orgId}/customize`}>Customize My Page</Link>
                  </li>
                  <li>
                    <Link class="nav-item" to={`/organizations/${orgId}/account`}>Account Details</Link>
                  </li> */}
                  <li>
                    <a class="nav-item" onClick={logout}>Log out</a>
                  </li>
                </div>
                )
                : (
                  <div>
                    <span>
                      <Link class="nav-item" to={`/organizations/create`}>Create Organization</Link>
                    </span>
                  </div>
                )
              : null
            }
            {/* <div>
              <span className="active blue item" onClick={logout}>Log out</span>
            </div> */}
          </div>
        ) : (
          <span className="active blue item">
            <Link to='/login'>Log In</Link>
          </span>
        )
      }
                  </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

const mapState = ({ user, userOrganizations, logout }) => {
  const loggedIn = !!user.id;
  const orgId = user.organizationId;
  return { user, loggedIn, orgId }
}

const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(mapState, mapDispatch)(Nav)
