import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteUserFromServer } from '../../store';

import UserForm from './UserForm';

class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange(ev) {
    this.setState({ name: ev.target.value })
  }

  render() {
    const { users, deleteUser } = this.props
    const { name } = this.state
    const { onChange } = this
    const matchingUsers = users.reduce((memo, user) => {
      const lowerFirst = user.firstName.toLowerCase()
      const lowerLast = user.lastName.toLowerCase()
      const lowerName = name.toLowerCase()
      if (lowerFirst.match(lowerName) || lowerLast.match(lowerName)) memo.push(user)
      return memo
    }, [])

    return (
      <div>
        <h2>Users</h2>
        <h4>Add a User</h4>
        <UserForm />
        <hr />
        <input onChange={onChange} value={name} placeholder="Search for a user" />
        <ul>
          {
            matchingUsers.map(user => (
              <li key={user.id}>
                {user.fullName}
                <Link to={`/users/${user.id}`}><button>Edit user</button></Link>
                <button onClick={() => deleteUser(user.id)}>Delete user</button>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
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
