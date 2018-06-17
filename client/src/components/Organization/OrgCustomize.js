import React from 'react';
import { connect } from 'react-redux';
import { deleteFormFromServer } from '../../store';
import AddForm from './AddForm';
import { Link } from 'react-router-dom';
import ColorPicker from './ColorPicker';
import TextColor from './TextColor';

const OrgCustomize = ({ organization, id, ownForms, forms, deleteForm }) => {
  if (!organization) return null
  var orgId = id;
  return (
    <div class="org-background">
      <div class="container">
        <div class="row">

          <div class="col-lg-3">
            <h3 class="my-4"></h3>
            <div class="list-group">
              <Link to={`/organizations/${orgId}/users`} class="list-group-item">Manage Members</Link>
              <Link to={`/organizations/${orgId}/requests`} href="#" class="list-group-item">Manage Requests</Link>
              <Link to={`/organizations/${orgId}/customize`} href="#" class="list-group-item active">Customize My Page</Link>
              <Link to={`/organizations/${orgId}/account`} href="#" class="list-group-item">Account Details</Link>
            </div>
          </div>

          <div class="col-lg-9" >
            <div class="card mt-4 card-body">
              <h2>Categories That Members Can Answer</h2>
              <span>&nbsp;</span>
              <ul class="list-group list-group-flush">
                {
                  ownForms.map(form => (
                    <li class="list-group-item" key={form.id}>
                      {form.name}&nbsp;
              <button className="btn2 btn-warning btn-sm" style={{ float: 'right' }} onClick={() => deleteForm(form.id)}>Delete</button>
                    </li>
                  ))
                }
              </ul>
              <span>&nbsp;</span>
              <AddForm organization={organization} />
              <span>&nbsp;</span>
              <span>&nbsp;</span>



              <h2>App's Background Color</h2>
              <span>&nbsp;</span>
              <ColorPicker organization={organization} />
              <span>&nbsp;</span>
              <span>&nbsp;</span>


              <h2>App's Text Color</h2>
              <span>&nbsp;</span>
              <TextColor organization={organization} />
              <span>&nbsp;</span>
              <span>&nbsp;</span>
            </div>
          </div>

        </div>
      </div>
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
