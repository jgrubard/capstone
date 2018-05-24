import React from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import { getOrganizations, getUsers, getDescriptions } from '../store';

import OrganizationList from './Organization/OrganizationList';

class App extends React.Component {
  componentDidMount() {
    const { loadOrganizations, loadUsers, loadDescriptions } = this.props;
    loadOrganizations();
    loadUsers();
    loadDescriptions();
  }

  render(){
    return (
      <div>
        <Router>
          <Route exact path='/organizations' component={OrganizationList} />
        </Router>
      </div>
    );
  }
}

const mapDisptach = (dispatch) => {
  return {
    loadOrganizations: () => dispatch(getOrganizations()),
    loadUsers: () => dispatch(getUsers()),
    loadDescriptions: () => dispatch(getDescriptions())
  }
}

export default connect(null, mapDisptach)(App);
