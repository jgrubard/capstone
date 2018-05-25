import React from 'react';
import { connect } from 'react-redux';

import { HashRouter as Router, Switch, Link, Route } from 'react-router-dom';
import { getOrganizationsFromServer, getDescriptionsFromServer, getUsersFromServer } from '../store';

import Nav from './Nav';
import Users from './User/Users';
import UserForm from './User/UserForm';

import OrganizationList from './Organization/OrganizationList';
import OrganizationInfo from './Organization/OrganizationInfo';

class App extends React.Component {
  componentDidMount() {
    const { loadOrganizations, loadUsers, loadDescriptions } = this.props;
    loadOrganizations();
    loadUsers();
    loadDescriptions();
  }

  render(){
    return (
      <Router>
        <div>
          <div className="container">
            <Nav />
            <div id="body-elements">
              <Switch>
              {/* USER ROUTES */}
              <Route exact path='/users/:id' component={UserForm}/>
              {/* ORGANIZATION ROUTES */}
              <Route exact path='/organizations' component={OrganizationList} />
              <Route exact path='/organizations/:id' component={({ match, history }) => <OrganizationInfo id={ match.params.id * 1} history={history} />} />
              {/* ADMIN ROUTES */}
              <Route exact path='/users' component={Users} />
              {/* AUTH ROUTES */}
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

const mapDisptach = (dispatch) => {
  return {
    loadOrganizations: () => dispatch(getOrganizationsFromServer()),
    loadUsers: () => dispatch(getUsersFromServer()),
    loadDescriptions: () => dispatch(getDescriptionsFromServer())
  }
}

export default connect(null, mapDisptach)(App);
