import React from 'react';
import { connect } from 'react-redux';
import { getOrganizations, getUsers } from '../store';

class App extends React.Component {
  constructor(){
    super();
  }

  componentDidMount() {
    const { loadOrganizations, loadUsers } = this.props;
    loadOrganizations();
    loadUsers();
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
    loadUsers: () => dispatch(getUsers())
  }
}

export default connect(null, mapDisptach)(App);
