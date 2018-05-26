import React from 'react';
import { connect } from 'react-redux';
import { deleteUserFromServer } from '../../store';

import UserForm from './UserForm';

const Users = ({ users, deleteUser }) => {
  console.log(users)
  return (
    <div>
      <h2>Users</h2>
      <h4>Add a User</h4>
      <UserForm />
      <hr />
      <ul>
        {
          users.map(user => {
            return (
              <li key={user.id}>
                {user.fullName}
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}

const mapState = ({ users }) => {
  return { users }
}

const mapDispatch = (dispatch) => {
  return {
    deleteUser: (id) => dispatch(deleteUserFromServer(id))
  }
}

export default connect(mapState, mapDispatch)(Users);
