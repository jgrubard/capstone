import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const MasterNav = ({ user, isMaster }) => {
  const url = location.hash.slice(1)
  return (
    <div>
          {
            isMaster ?
              (
                <ul className='main-nav' >
                  <li>
                    <Link to='/organizations'>Organizations</Link>
                  </li>
                  <li>
                    <Link to='/users'>Users</Link>
                  </li>
                  <li>
                    <Link to='/master/organizationRequests'>Organization Requests</Link>
                  </li>
                </ul>
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
