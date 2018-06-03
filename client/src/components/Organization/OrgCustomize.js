import React from 'react';
import { connect } from 'react-redux';
import { deleteFormFromServer } from '../../store';
import AddForm from './AddForm';
import { Link } from 'react-router-dom';
import ColorPicker from './ColorPicker';
import TextColor from './TextColor';

const OrgCustomize = ({ organization, id, ownForms, forms, deleteForm }) => {
  if (!organization) return null
  return (
    <div>
      <h2>{organization.name}</h2>
      <h4>Categories That Members Can Answer</h4>
      <ul>
        {
          ownForms.map(form => (
            <li key={form.id}>
              {form.name}
              <button onClick={() => deleteForm(form.id)}>Delete Category</button>
            </li>
          ))
        }
      </ul>
      <AddForm organization={organization} />
      <h4>Select Your Page's Background Color</h4>
      <ColorPicker organization={organization} />
      <h4>Select Your Page's Text Color</h4>
      <TextColor organization={organization} />
    </div>
  );
}

const mapState = ({ organizations, users, userOrganizations, forms }, { id }) => {
  const organization = organizations.find(org => org.id === id);
  const ownForms = forms.filter(form => form.organizationId === id)
  return { organization, ownForms, forms }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    deleteForm: (id) => dispatch(deleteFormFromServer(id, history)),
  }
}

export default connect(mapState, mapDispatch)(OrgCustomize);
