import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../store'

const MasterNav = ({ user, isMaster, logout }) => {
  const url = location.hash.slice(1)
  return (
    <div>
      {
        isMaster ? (
          <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-color fixed-top">
              <div class="container">
                <a class="navbar-brand" href="#">Pair Up!</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                  <ul class="navbar-nav ml-auto">
                    <div class="navbar-nav ml-auto">

                      <li class="nav-item">
                        <Link class="nav-link" to='/organizations'>Organizations</Link>
                      </li>
                      <li class="nav-item">
                        <Link class="nav-link" to='/users'>Users</Link>
                      </li>
                      <li class="nav-item">
                        <Link class="nav-link" to='/master/organizationRequests'>Organization Requests</Link>
                      </li>
                      <li class="nav-item">
                        <Link class="nav-link" to='/master/userRequests'>User Requests</Link>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" onClick={logout}>Log out</a>
                      </li>
                    </div>
                  </ul>
                </div>
              </div>
            </nav>
          </div>

        ) : null
      }
    </div>
  );
}


const mapState = ({ user }) => {
  const isMaster = user.userStatus === 'master'
  return { user, isMaster }
}

const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(mapState, mapDispatch)(MasterNav)
