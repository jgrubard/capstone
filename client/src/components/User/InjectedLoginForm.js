/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { attemptLogin, signup } from '../../store'
import { Input, Button, Progress } from 'mdbreact';
import { injectStripe, CardElement } from 'react-stripe-elements';
import axios from 'axios';

const emailRegex = RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")
const passwordRegexMedium = RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
const passwordRegexStrong = RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

class InjectedLoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      errors: {},
      userStatus: 'admin',
      billingFirstName: '',
      billingLastName: '',
      payment: false
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.handlePaymentChange = this.handlePaymentChange.bind(this);
    this.validators = {
      firstName: (value) => {
        if (!value) return 'First name is required!'
      },
      lastName: (value) => {
        if (!value) return 'Last name is required!'
      },
      email: (value) => {
        if (!value) return 'Email is required'
        if (this.props.emails.includes(value)) return 'Email already exists!'
        if (!emailRegex.test(value)) return 'Email is not valid'
      },
      password: (value) => {
        if (!value) return 'Password is required'
        if (value.length < 4) return 'Password must be at least 4 characters'
      },
      billingFirstName: (value) => {
        if(!value) return 'First name is required.';
      },
      billingLastName: value => {
        if(!value) return 'Last name is required.';
      },
      payment: value => {
        if(!value) return 'Complete payment information is required.'
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ errors: {} })
  }

  onChange(ev) {
    const change = {}
    change[ev.target.name] = ev.target.value
    this.setState(change)
  }

  handlePaymentChange() {
    this.setState({ payment: true });
  }

  onSubmit(ev) {
    ev.preventDefault()
    const { firstName, lastName, email, password, userStatus, billingFirstName, billingLastName } = this.state
    const { attemptLogin, attemptSignup, url } = this.props
    if (url === '/signup') {
      const errors = Object.keys(this.validators).reduce((memo, key) => {
        const validator = this.validators[key]
        const value = this.state[key]
        const error = validator(value)
        if (error) memo[key] = error
        return memo
      }, {})
      this.setState({ errors })
      if (Object.keys(errors).length) return;
      const name = `${billingFirstName} ${billingLastName}`;
      this.props.stripe.createToken({ type: 'card', name })
        .then(({ token }) => {
          attemptSignup({ firstName, lastName, email, password, userStatus, token })
        })
    }
    else {
      attemptLogin({ email, password })
    }
  }

  render() {
    const url = location.hash.slice(1)
    const { onChange, onSubmit } = this
    const { user} = this.props
    const { firstName, lastName, password, email, errors, billingFirstName, billingLastName } = this.state
    const passwordTestStrong = passwordRegexStrong.test(password)
    const passwordTestMedium = passwordRegexMedium.test(password)
    return (
      <div className="login-form">
        {
          url === '/signup' ?
            <h1> Sign Up to Create an Organization </h1>
            :
            <h1> Log In </h1>
        }
        {
          user.id ? (
            <div>
              <h4> You are already logged in </h4>
              <Link to='/'><button className="btn btn-info">Back home</button></Link>
              <Link to={`/users/${user.id}`}><button className="btn btn-secondary">My Account</button></Link>
            </div>
          ) :
            (
              <div>
                <h3>{url === '/signup' ? ('Sign up for an account') : ('Log in to your account')}</h3>
                <div>
                  {
                    url === '/signup' ? (
                      <div>
                        <div className="form-group">
                          <Input
                            label="First name"
                            name="firstName"
                            className="form-control"
                            onChange={onChange}
                            value={firstName}
                            type="text"
                          />
                          {errors.firstName && <div className="help-block">
                            {errors.firstName}
                          </div>
                          }
                        </div>
                        <div className="form-group">
                          <Input
                            label="Last name"
                            name="lastName"
                            className="form-control"
                            onChange={onChange}
                            value={lastName}
                            type="text"
                          />
                          {errors.lastName && <div className="help-block">
                            {errors.lastName}
                          </div>
                          }
                        </div>
                        <div className="form-group">
                          <Input
                            label="Email address"
                            name="email"
                            className="form-control"
                            onChange={onChange}
                            value={email}
                            type='email'
                          />
                          {errors.email && <div className="help-block">
                            {errors.email}
                          </div>
                          }
                        </div>
                        <div className="form-group">
                          <Input
                            label='Password'
                            name="password"
                            className="form-control"
                            onChange={onChange}
                            value={password}
                            type="password"
                          />
                          {errors.password && <div className="help-block">
                            {errors.password}
                          </div>
                          }
                        </div>
                        <div className="progress-wrapper">
                          {passwordTestStrong ? (
                            <Progress value={100} color={"success"} />
                          ) : (
                              passwordTestMedium ? (
                                <Progress value={67} color={"warning"} />
                              ) : (
                                  password.length > 3 ? (
                                    <Progress value={33} color={"danger"} />
                                  ) : (
                                      <Progress value={0} color={"danger"} />
                                    )
                                ))
                          }
                        </div>
                        <div className="form-group">
                          <Input
                            label="Billing First Name"
                            name="billingFirstName"
                            className="form-control"
                            onChange={onChange}
                            value={billingFirstName}
                            type="text"
                          />
                          {errors.billingFirstName && <div className="help-block">
                            {errors.billingFirstName}
                          </div>
                          }
                        </div>
                        <div className="form-group">
                          <Input
                            label="Billing Last Name"
                            name="billingLastName"
                            className="form-control"
                            onChange={onChange}
                            value={billingLastName}
                            type="text"
                          />
                          {errors.billingLastName && <div className="help-block">
                            {errors.billingLastName}
                          </div>
                          }
                        </div>
                        <div className='form-group'>
                          <CardElement onChange={ this.handlePaymentChange } />
                        </div>
                      </div>
                    ) : (
                        <div>
                          {/* <label className="font-weight-bold">Email</label> */}
                          <div className="form-group">
                            <Input
                              label='Email'
                              name="email"
                              className="form-control"
                              onChange={onChange}
                              value={email}
                            />
                            {errors.email && <div className="help-block">
                              {errors.email}
                            </div>
                            }
                          </div>

                          {/*  <label className="font-weight-bold">Password</label> */}
                          <Input
                            label='Password'
                            name="password"
                            className="form-control"
                            onChange={onChange}
                            value={password}
                            type="password"
                          />
                        </div>
                      )
                  }
                </div>
                <button onClick={onSubmit} className="btn btn-success margin-t-15">
                  {url === '/signup' ? ('Create account') : ('Log in')}
                </button>
                {url === '/signup' ?
                  <p className="margin-t-15">Have an account? <a href='#/login'>Log in now &raquo;</a></p>
                  :
                  <p className="margin-t-15">Don't have an account? <a href='#/signup'>Create one now &raquo;</a></p>
                }
              </div>
            )}
      </div>
    )
  }
}
const mapState = ({ users, user }) => {

  const emails = users.reduce((memo, user) => {
    memo.push(user.email)
    return memo
  }, [])
  return { emails, user }
}

const mapDispatch = (dispatch, { history }) => {
  // console.log('HISTORY:', history)
  return {
    attemptLogin: (credentials) => dispatch(attemptLogin(credentials, history)),
    attemptSignup: user => dispatch(signup(user)),
  }
}

export default connect(mapState, mapDispatch)(injectStripe(InjectedLoginForm));
