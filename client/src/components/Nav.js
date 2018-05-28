import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Nav = () => {
  return (
    <div>
    <header className='header'>
    <h1 className="logo"><a href="#">LOGO</a></h1>
    <ul className='main-nav'>
    <li>
        <Link to='/home'>
          Home
        </Link>
      </li>
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
    </header>
    </div>
  );
}

const mapState = ({ users, organizations }) => {
  return { users, organizations }
}

export default connect(mapState)(Nav)
