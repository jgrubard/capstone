import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store'

const Nav = ({ user, loggedIn,logout, orgId }) => {
  const url = location.hash.slice(1)
  return (
    <div>
      <header className='header'>
        <h1 className="logo"><a href="#">LOGO</a></h1>
        <div>
          {
            loggedIn ?
              (
                <ul className='main-nav' >
                  <li>
                    <Link to={`/organizations/${orgId}`}>Home</Link>
                  </li>
                  <li >
                    <span onClick={logout}>Log out</span>
                  </li>
                </ul>
              ) : (
                <ul className='main-nav' >
                  <li>
                    <Link to='/login'>Log In</Link>
                  </li>
                </ul>
              )
          }
        </div>
      </header>
    </div>
  );
}

const mapState = ({ user, userorganizations, logout }) => {
  const loggedIn = !!user.id;
  const entry = loggedIn && userorganizations.find( (ent) => {
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
