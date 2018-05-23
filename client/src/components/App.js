import React from 'react';
import { HashRouter as Router, Switch, Link, Route } from 'react-router-dom';
import { connect} from 'react-redux';
import { getOrganizations, getUsers, getDescriptions, getUsersFromServer } from '../store';

import Users from './User/Users';

class App extends React.Component {
  constructor(){
    super();
  }

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
            <div id="body-elements">
              <Switch>

      {/* USER ROUTES */}
      {/* ORGANIZATION ROUTES */}
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
    loadOrganizations: () => dispatch(getOrganizations()),
    loadUsers: () => dispatch(getUsersFromServer()),
    loadDescriptions: () => dispatch(getDescriptions())
  }
}

export default connect(null, mapDisptach)(App);
