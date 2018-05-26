/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { updateUserOnServer } from '../../store';

class UserForm extends React.Component {
    constructor(props) {
      super(props);
      const { user } = this.props;
      this.state = {
        id: user ? user.id : undefined,
        firstName: user ? user.firstName : '',
        lastName: user ? user.lastName : '',
        email: user ? user.email : '',
        password: user ? user.password : '',
      }
      this.onChange = this.onChange.bind(this);
      this.onSave = this.onSave.bind(this);
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

    onSave(ev) {
      ev.preventDefault()
      const { updateUser } = this.props;
      const { id, firstName, lastName, email, password } = this.state
      updateUser({ id, firstName, lastName, email, password });
    }

    render() {
      const { onChange, onSave } = this;
      const { user, users } = this.props
      const { firstName, lastName, email, password } = this.state;
      const fields = {
        firstName: 'First name',
        lastName: 'Last name',
        email: 'Email address',
        password: 'Password'
      }
      return (
        <div>
          <button onClick={onSave}>Save</button>
          <div>
            {
              Object.keys(fields).map(field => (
                <div key={field}>
                  <label>{fields[field]}</label>
                  <input
                    name={field}
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

  const mapState = (state, { user }) => {
    return { user }
  }

  const mapDispatch = (dispatch) => {
    return {
      updateUser: (user) => dispatch(updateUserOnServer(user))
    }
  }

  export default connect(mapState, mapDispatch)(UserForm);
