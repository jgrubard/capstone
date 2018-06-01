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
import OrgUsers from './Organization/OrgUsers';
import OrgRequests from './Organization/OrgRequests';
import OrgCustomize from './Organization/OrgCustomize';
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
    const OrgUsersAuth = CheckAuth(OrgUsers)
    const OrgRequestsAuth = CheckAuth(OrgRequests)
    const OrgCustomizeAuth = CheckAuth(OrgCustomize)
    return (
      <Router>
        <div>
          <div className="container">
            <Nav />
            <div id="body-elements" className= 'ui container'>
            <MasterNav />
            <Switch>
            {/* USER ROUTES */}
            <Route exact path='/users/:id' component={({ match }) => <UserInfoAuth id={ match.params.id } />} />
            {/* ORGANIZATION ROUTES */}
            <Route exact path='/' component={Welcome} />
            <Route exact path='/organizations/:id/users' component={({ match, history }) => <OrgUsersAuth id={ match.params.id } history={history} />} />
            <Route exact path='/organizations/:id/requests' component={({ match, history }) => <OrgRequestsAuth id={ match.params.id } history={history} />} />
            <Route exact path='/organizations/:id/customize' component={({ match, history }) => <OrgCustomizeAuth id={ match.params.id } history={history} />} />
            <Route exact path='/organizations/:id/account' component={({ match, history }) => <OrganizationInfoAuth id={ match.params.id } history={history} />} />
            {/* MASTER ROUTES */}
            <Route exact path ='/master' component={OrganizationsMaster}/>
            <Route exact path='/organizations' component={OrganizationsMaster} />
            <Route exact path='/users' component={UsersMaster} />
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
