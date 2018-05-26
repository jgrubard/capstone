import React from 'react';
import { connect } from 'react-redux';

import UserForm from './UserForm';

const UserInfo = ({ user }) => {
  if (!user) return null;
  return (
    <div>
      <h2>{user.fullName}'s Account</h2>
      <UserForm user={user} />
    </div>
  );
}

const mapState = ({ users }, { id }) => {
  const user = users.find(user => user.id === id)
  return { user }
}

export default connect(mapState)(UserInfo);
