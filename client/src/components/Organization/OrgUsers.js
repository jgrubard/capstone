import React from 'react';
import { connect } from 'react-redux';
import { deleteOrganizationFromServer, deleteFormFromServer, deleteUserOrganizationFromServer } from '../../store';
import AddUserForm from '../User/AddUserForm';
import { Link } from 'react-router-dom';

const OrgUsers = ({ organization, id, ownUsers, removeUser, userOrganizations }) => {
  if (!organization) return null
  var orgId = id;
  return (
    <div class="org-background">
      <div class="container">
        <div class="row">

          <div class="col-lg-3">
            <h3 class="my-4"></h3>
            <div class="list-group">
              <Link to={`/organizations/${orgId}/users`} class="list-group-item active">Manage Members</Link>
              <Link to={`/organizations/${orgId}/requests`} href="#" class="list-group-item">Manage Requests</Link>
              <Link to={`/organizations/${orgId}/customize`} href="#" class="list-group-item">Customize My Page</Link>
              <Link to={`/organizations/${orgId}/account`} href="#" class="list-group-item">Account Details</Link>
            </div>
          </div>

          <div class="col-lg-9" >
            <div class="card mt-4 card-body">
              <h2>My Members</h2>
              <span>&nbsp;</span>
              <ul class="list-group list-group-flush">
                {
                  ownUsers.map(user => (
                    <li class="list-group-item" key={user.id}>
                      {user.fullName}
                      <Link to={`/users/${user.id}`}>
                        <button class="btn2 btn-info btn-sm" style={{ float: 'right' }}>
                          Edit
              </button>
                      </Link>
                      <span style={{ float: 'right' }}>&nbsp;</span>
                      <button class="btn2 btn-warning btn-sm" style={{ float: 'right' }} onClick={() => removeUser(user.id, organization.id, userOrganizations)}>
                        Remove
            </button>
                    </li>
                  ))
                }
              </ul>
              <span>&nbsp;</span>
              <span>&nbsp;</span>
              <AddUserForm organization={organization} />

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

const mapState = ({ organizations, users, userOrganizations }, { id }) => {
  const organization = organizations.find(org => org.id === id);
  const ownUsers = userOrganizations.reduce((memo, userOrg) => {
    const user = users.find(user => user.id === userOrg.userId && id === userOrg.organizationId)
    if (!memo.includes(user) && user) {
      memo.push(user)
    }
    return memo;
  }, [])
  return { organization, ownUsers, userOrganizations }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    removeUser: (userId, organizationId, userOrgs) => {
      const userOrg = userOrgs.find(userOrg => userOrg.userId === userId && userOrg.organizationId === organizationId)
      dispatch(deleteUserOrganizationFromServer(userOrg.id))
    }
  }
}

export default connect(mapState, mapDispatch)(OrgUsers);
