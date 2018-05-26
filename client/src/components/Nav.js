import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Nav = () => {
  return (
    <ul>
      <li>
        <Link to='/users'>
          Users
        </Link>
      </li>
      <li>
        <Link to='/organizations'>
          Organizations
        </Link>
      </li>
    </ul>
  );
}

const mapState = ({ users, organizations }) => {
  return { users, organizations }
}

export default connect(mapState)(Nav)
