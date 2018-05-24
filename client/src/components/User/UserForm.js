/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { updateUserOnServer } from '../../store';

class UserForm extends React.Component {
    constructor(props) {
      super(props);
      const { user, users } = this.props;
      this.state = {
        id: user.id ? user.id : '',
        firstName: user.id ? user.firstName : '',
        lastName: user.id ? user.lastName : '',
        password: user.id ? user.password : '',
        email: user.id ? user.email : '',
        isEditing: false
      }
      this.onChange = this.onChange.bind(this);
      this.onUpdate = this.onUpdate.bind(this);
    }
  
    componentWillReceiveProps(nextProps) {
      const { user } = nextProps;
      if (user.id) {
        const { id, firstName, lastName, email, password } = user
        this.setState({ id, firstName, lastName, email, password })
      }
    }
  
    onChange(ev) {
      const change = {}
      change[ev.target.name] = ev.target.value
      this.setState(change);
    }
  
    onUpdate(ev) {
      ev.preventDefault()
      const { updateUser } = this.props;
      const { id, firstName, lastName, email, password } = this.state
      updateUser({ id, firstName, lastName, email, password });
    }
  
    render() {
      const { onChange, onUpdate } = this;
      const { user, users } = this.props
      const { firstName, lastName, email, password, isEditing } = this.state;
      const fields = {
        firstName: 'First name',
        lastName: 'Last name',
        email: 'Email address',
        password: 'Password'
      }
      return (
        <div>
          <h2>My Account</h2>
          {
            isEditing ? (
              <button onClick={ onUpdate } className="btn btn-success margin-t-15">Save</button>
            ) : (
              <button onClick={() => this.setState({ isEditing: true })} className="btn btn-outline-success margin-t-15">Edit</button>
            )
          }
          <div className="margin-t-15">
            {
              Object.keys(fields).map(field => (
                <div className="margin-b-10" key={field}>
                <label className="font-weight-bold">{fields[field]}</label>
                <input
                name={field}
                readOnly={isEditing ? false : true}
                className={`form-control${isEditing ? `` : `-plaintext` }`}
                onChange={onChange}
                value={this.state[field]}
                type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text' }
                />
                </div>
              ))
            }
          </div>
        </div>
      )
    }
  }
  
  const mapState = ({ users }, {match}) => {
    const id = match.params.id * 1
    const user = users.find( _user => _user.id === id)
    return { 
        users,
        user
     }
  }

  const mapDispatch = (dispatch) => {
    return {
      updateUser: (user) => dispatch(updateUserOnServer(user))
    }
  }

  export default connect(mapState, mapDispatch)(UserForm);