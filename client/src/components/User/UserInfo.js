import React from 'react';
import { connect } from 'react-redux';

import UserForm from './UserForm';

const UserInfo = ({ user }) => {
  if (!user) return null;
  return (
    <div>
      <h3>{user.name}</h3>
      <UserForm user={user} />
    </div>
  );
}

const mapState = ({ users }, { id }) => {
  console.log(id)
  const user = users.find(user => user.id === id)
  return { user }
}

export default connect(mapState)(UserInfo);
