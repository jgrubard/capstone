import React from 'react';
import { connect } from 'react-redux';
import { deleteOrganizationFromServer, deleteUserFromServer, deleteUserOrganizationFromServer } from '../../store';
import OrganizationForm from './OrganizationForm';
import AddUserForm from '../User/AddUserForm';
import AddForm from './AddForm';
import { Link } from 'react-router-dom';

const OrganizationInfo = ({ organization, id, deleteOrganization, ownUsers, ownForms, forms, deleteUser, userorganizations }) => {
  if (!organization) return null
  console.log(ownUsers)
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
            <Link to={`/users/${user.id}`}><button>Edit user</button></Link>
            <button onClick={() => deleteUser(user.id, userorganizations)}>Remove from {organization.name}</button>
          </li>
        ))
      }
      </ul>
      <AddUserForm organization={organization} />
      <h4>Forms/Categories of this organization</h4>
      <ul>
      {
        ownForms.map(form=>(
          <li key={form.id}>
            {form.name}
          </li>
        ))
      }
      </ul>
      <AddForm organization={organization}/>
    </div>
  );
}

const mapState = ({ organizations, users, userorganizations, forms }, { id }) => {
  const organization = organizations.find(org => org.id === id);

  const ownUsers = userorganizations.reduce((memo, userOrg) => {
    const user = users.find(user => user.id === userOrg.userId && id === userOrg.organizationId)
    if (!memo.includes(user) && user) {
      memo.push(user)
    }
    return memo;
  }, [])
  const ownForms = forms.filter(form => form.organizationId === id)
  return { organization, ownUsers, ownForms, forms, userorganizations }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    deleteOrganization: (id) => dispatch(deleteOrganizationFromServer(id, history)),
    deleteUser: (id, userorganizations) => {
      userorganizations.forEach(userOrg => {
        if(userOrg.userId === id) {
          dispatch(deleteUserOrganizationFromServer(userOrg.id))
        }
      })
      dispatch(deleteUserFromServer(id))
    }
  }
}

export default connect(mapState, mapDispatch)(OrganizationInfo);