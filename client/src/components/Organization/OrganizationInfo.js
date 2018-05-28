import React from 'react';
import { connect } from 'react-redux';
import { deleteOrganizationFromServer } from '../../store';
import OrganizationForm from './OrganizationForm';
import AddUserForm from '../User/AddUserForm';
import AddForm from './AddForm'

const OrganizationInfo = ({ organization, id, deleteOrganization, ownUsers, ownForms, forms }) => {
  if (!organization) return null
  console.log(ownForms)
  console.log(forms)
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
      <AddForm />
    </div>
  );
}

const mapState = ({ organizations, users, userorganizations, forms }, { id }) => {
  const organization = organizations.find(org => org.id === id);
  const ownUsers = userorganizations.reduce((memo, userOrg) => {
    const user = users.find(user => user.id === userOrg.userId)
    if (!memo.includes(user)) {
      memo.push(user)
    }
    return memo;
  }, [])
  const ownForms = forms.filter(form => form.organizationId === id)
  return { organization, ownUsers, ownForms, forms }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    deleteOrganization: (id) => dispatch(deleteOrganizationFromServer(id, history))
  }
}

export default connect(mapState, mapDispatch)(OrganizationInfo);