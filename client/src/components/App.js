import React from 'react';
import { connect } from 'react-redux';
import { getOrganizations, getUsers, getDescriptions } from '../store';

class App extends React.Component {
  componentDidMount() {
    const { loadOrganizations, loadUsers, loadDescriptions } = this.props;
    loadOrganizations();
    loadUsers();
    loadDescriptions();
  }

  render(){
    return (
      <hr />
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
