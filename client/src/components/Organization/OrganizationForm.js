import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateOrganizationOnServer } from '../../store';

class OrganizationForm extends Component {
  constructor(props) {
    super(props);
    const { organization } = props;
    this.state = {
      id: organization ? organization.id : undefined,
      name: organization ? organization.name : '',
      organization_type: organization ? organization.organization_type : '',
      address: organization ? organization.address : '',
      city: organization ? organization.city : '',
      state: organization ? organization.state : '',
      zip: organization ? organization.zip : '',
      contact_name: organization ? organization.contact_name : '',
      contact_phone: organization ? organization.contact_phone: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  handleChange(ev) {
    const change = {}
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  onSave(ev) {
    ev.preventDefault();
    const { createOrUpdateOrganization } = this.props;
    const { id, name, organization_type, address, city, state, zip, contact_name, contact_phone  } = this.state;
    createOrUpdateOrganization({ id, name, organization_type, address, city, state, zip, contact_name, contact_phone  });
    // this.setState({ name: '' })
  }

  render() {
    const { handleChange, onSave } = this;
    const { name, organization_type, address, city, state, zip, contact_name, contact_phone } = this.state;
    return (
      <div>
        <div>Organization Name<input name='name' value={name} onChange={handleChange} /></div>
        <div>Type<input name='organization_type' value={organization_type} onChange={handleChange} /></div>
        <div>Address<input name='address' value={address} onChange={handleChange} /></div>
        <div>City<input name='city' value={city} onChange={handleChange} /></div>
        <div>State<input name='state' value={state} onChange={handleChange} /></div>
        <div>Zip<input name='zip' value={zip} onChange={handleChange} /></div>
        <div>Contact Name<input name='contact_name' value={contact_name} onChange={handleChange} /></div>
        <div>Contact Phone<input name='contact_phone' value={contact_phone} onChange={handleChange} /></div>
        <button onClick={onSave}>Submit</button>
      </div>
    );
  }
}

const mapState = (state, { organization }) => {
  return { organization }
}

const mapDispatch = (dispatch) => {
  return {
    createOrUpdateOrganization: (organization) => dispatch(updateOrganizationOnServer(organization))
  }
}

export default connect(mapState, mapDispatch)(OrganizationForm);
