import React from 'react';
import { connect } from 'react-redux';
import { deleteOrganizationFromServer } from '../../store';
import OrganizationForm from './OrganizationForm';
import AddUserForm from '../User/AddUserForm'

const OrganizationInfo = ({ organization, id, deleteOrganization, ownUsers }) => {
  if (!organization) return null
  return (
    <div>
      <h2>{organization.name}</h2>
      <OrganizationForm organization={organization} />
      <button onClick={() => deleteOrganization(id)}>Delete Organization</button>
      <h4>Users of this organization</h4>
      <ul>
      {
        ownUsers.map(user=>(
          <li key={user.id}>
            {user.fullName}
          </li>
        ))
      }
      </ul>
      <AddUserForm organization={organization} />
    </div>
  );
}

const mapState = ({ organizations, users, userorganizations }, { id }) => {
  const organization = organizations.find(org => org.id === id);
  const ownUsers = userorganizations.reduce((memo, userOrg) => {
    const user = users.find(user => user.id === userOrg.userId)
    if (!memo.includes(user)) {
      memo.push(user)
    }
    return memo;
  }, [])
  return { organization, ownUsers }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    deleteOrganization: (id) => dispatch(deleteOrganizationFromServer(id, history))
  }
}

export default connect(mapState, mapDispatch)(OrganizationInfo);
