import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteUserOnServer } from '../../store';

class Users extends React.Component {
    constructor() {
      super()
      this.state = {
        name: '',
      }
      this.onChange = this.onChange.bind(this)
    }
  
    onChange(ev) {
      this.setState({ name: ev.target.value, startIndex: 0, endIndex: 15 })
    }
  
    render() {
      const { users, deleteUser } = this.props
      const { name } = this.state
      const { onChange } = this
      const matchingUsers = users.reduce((memo, user )=> {
        const lowerFirst = user.firstName.toLowerCase()
        const lowerLast = user.lastName.toLowerCase()
        const lowerName = name.toLowerCase()
        if (lowerFirst.match(lowerName) || lowerLast.match(lowerName)) memo.push(user)
        return memo
      }, [])

      return (
        <div>
          <title>All Users</title>

          <h2>Users</h2>
          <input onChange={ onChange } value={ name } className="form-control margin-b-10" placeholder="Search for a user" />
          <ul className='list-group'>
            {
              matchingUsers.map(user => (
                <li key={user.id} className='list-group-item'>
                  <h5>{`${user.firstName} ${user.lastName}`}</h5>
                  <Link to={`/admin/users/${user.id}`}><button className="btn btn-outline-success">Edit user</button></Link>
                  <button onClick={() => deleteUser(user.id)} className="btn btn-outline-danger">Delete user</button>
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
      deleteUser: (id) => dispatch(deleteUserOnServer(id))
    }
  }
  
  export default connect(mapState, mapDispatch)(Users);