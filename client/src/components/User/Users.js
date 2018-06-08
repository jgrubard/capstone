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
    const { users, deleteUser, count, pluralize } = this.props
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
        <ol style={{type:1}}>
      <h4 style={{'marginTop':'20px'}}>There {pluralize[0]} currently {count} User{pluralize[1]}:</h4>
          {
            matchingUsers.map(user => (
              <li key={user.id} style={{ marginBottom: '15px' }}>
                {user.fullName}
                <Link to={`/users/${user.id}`}><button className='tiny olive ui button' style={{float:'right'}}>Edit user</button></Link>
                <button className='tiny orange ui button' style={{float:'right'}} onClick={() => deleteUser(user.id)}>Delete user</button>
              </li>
            ))
          }
        </ol>
      </div>
    );
  }
}

const mapState = ({ users }) => {
  const count = users.length;
  const pluralize = count === 1 ? [ 'is', '' ] : [ 'are', 's']
  return { users, count, pluralize }
}

const mapDispatch = (dispatch) => {
  return {
    deleteUser: (id) => dispatch(deleteUserFromServer(id))
  }
}

export default connect(mapState, mapDispatch)(Users);
