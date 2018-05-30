import React from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { getOrganizationsFromServer, getDescriptionsFromServer, getUsersFromServer, getUserOrganizationsFromServer, getUserFromToken, getFormsFromServer, getOrganizationRequestsFromServer } from '../store';

import CheckMaster from './General/CheckMaster'
import CheckAuth from './General/CheckAuth'
import FourOhFour from './General/FourOhFour'
import Nav from './Nav';
import MasterNav from './Master/MasterNav';
import NotMaster from './Master/NotMaster';
import Users from './User/Users';
import UserInfo from './User/UserInfo';
import OrganizationList from './Organization/OrganizationList';
import OrganizationInfo from './Organization/OrganizationInfo';
import LoginForm from './User/LoginForm'; 
import Welcome from './General/Welcome'




class App extends React.Component {
  componentDidMount() {
    const { loadOrganizations, loadUsers, loadDescriptions, loadUserOrganizations, loadUser, loadForm, loadOrganizationRequests } = this.props;
    loadOrganizations();
    loadUsers();
    loadDescriptions();
    loadUserOrganizations();
    loadUser();
    loadForm();
    loadOrganizationRequests();
  }

  render(){
    const OrganizationsMaster = CheckMaster(OrganizationList)
    const UsersMaster = CheckMaster(Users)
    const UserInfoAuth = CheckAuth(UserInfo)
    const OrganizationInfoAuth = CheckAuth(OrganizationInfo)
    return (
      <Router>
        <div>
          <div className="container">
            <Nav />
            <div id="body-elements">
            <MasterNav />
            <Switch>
            {/* USER ROUTES */}
            <Route exact path='/users' component={UsersMaster} />
            <Route exact path='/users/:id' component={({ match }) => <UserInfoAuth id={ match.params.id } />} />
            {/* ORGANIZATION ROUTES */}
            <Route exact path='/organizations' component={OrganizationsMaster} />
            <Route exact path='/organizations/:id' component={({ match, history }) => <OrganizationInfoAuth id={ match.params.id } history={history} />} />
            <Route exact path='/' component={Welcome} />
            {/* ADMIN ROUTES */}
            <Route exact path ='/master' component={OrganizationsMaster}/>
            {/* AUTH ROUTES */}
            <Route exact path='/login' component={LoginForm} />
            <Route exact path='/signup' component={LoginForm} />
            {/* 404 & No Permission PAGE */}
            <Route path='/nopermission' component={ NotMaster } />
            <Route path='/:id' component={ FourOhFour } />
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
    loadDescriptions: () => dispatch(getDescriptionsFromServer()),
    loadUserOrganizations:() => dispatch(getUserOrganizationsFromServer()),
    loadForm: () => dispatch(getFormsFromServer()),
    loadOrganizationRequests: () => dispatch(getOrganizationRequestsFromServer()),
    loadUser: () =>{
      const token = window.localStorage.getItem('token')
      if (token){
        dispatch(getUserFromToken(token))
      }
    }
  }
}

export default connect(null, mapDisptach)(App);
