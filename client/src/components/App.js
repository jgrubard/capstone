import React from 'react';
import { connect } from 'react-redux';
import { getOrganizations } from '../store';

class App extends React.Component {
  constructor(){
    super();
  }

  componentDidMount() {
    const { loadOrganizations } = this.props;
    loadOrganizations()
  }

  render(){
    return(
      <hr />
    );
  }
}

const mapDisptach = (dispatch) => {
  return {
    loadOrganizations: () => dispatch(getOrganizations())
  }
}

export default connect(null, mapDisptach)(App);
