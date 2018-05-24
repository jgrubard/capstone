import React from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import { getOrganizations, getUsers, getDescriptions } from '../store';

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
      <div>
        <Router>
          <div>
            <Route exact path='/organizations' component={OrganizationList} />
            <Route exact path='/organizations/:id' component={({ match }) => <OrganizationInfo id={ match.params.id * 1}/>} />
          </div>
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
