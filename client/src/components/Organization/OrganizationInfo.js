import React from 'react';
import { connect } from 'react-redux';
import { deleteOrganizationFromServer, deleteFormFromServer, deleteUserOrganizationFromServer } from '../../store';
import OrganizationForm from './OrganizationForm';
import AddUserForm from '../User/AddUserForm';
import AddForm from './AddForm';
import OrganizationRequests from './OrganizationRequests';
import { Link } from 'react-router-dom';

const OrganizationInfo = ({ organization, id, deleteOrganization, ownUsers, ownForms, forms, removeUser, userOrganizations, deleteForm }) => {
  if (!organization) return null
  return (
    <div>
      <h2>{organization.name}</h2>
      {organization.image && <img src={organization.image} style={{ height: '200px', width: 'auto'}}/>}
      <OrganizationForm organization={organization} />
      <button onClick={() => deleteOrganization(id)}>Delete Organization</button>
      <h4>Users of this organization</h4>
      <ul>
      {
        ownUsers.map(user => (
          <li key={user.id}>
            {user.fullName}
            <Link to={`/users/${user.id}`}><button>Edit user</button></Link>
            <button onClick={() => removeUser(user.id, organization.id, userOrganizations)}>Remove from {organization.name}</button>
          </li>
        ))
      }
      </ul>
      <AddUserForm organization={organization} />
      <h4>My Organization Input Forms</h4>
      <ul>
      {
        ownForms.map(form=>(
          <li key={form.id}>
            {form.name}
            <button onClick={() => deleteForm(form.id)}>Delete Form</button>
          </li>
        ))
      }
      </ul>
      <hr />
      <h3>Pending Requests</h3>
      <OrganizationRequests organization={organization} />
      <hr />
      <AddForm organization={organization}/>
    </div>
  );
}

const mapState = ({ organizations, users, userOrganizations, forms }, { id }) => {
  const organization = organizations.find(org => org.id === id);
  const ownUsers = userOrganizations.reduce((memo, userOrg) => {
    const user = users.find(user => user.id === userOrg.userId && id === userOrg.organizationId)
    if (!memo.includes(user) && user) {
      memo.push(user)
    }
    return memo;
  }, [])
  const ownForms = forms.filter(form => form.organizationId === id)
  return { organization, ownUsers, ownForms, forms, userOrganizations }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    deleteOrganization: (id) => dispatch(deleteOrganizationFromServer(id, history)),
    deleteForm: (id) => dispatch(deleteFormFromServer(id, history)),
    removeUser: (userId, organizationId, userOrgs) => {
      const userOrg = userOrgs.find(userOrg => userOrg.userId === userId && userOrg.organizationId === organizationId)
      dispatch(deleteUserOrganizationFromServer(userOrg.id))
    }
  }
}

export default connect(mapState, mapDispatch)(OrganizationInfo);
