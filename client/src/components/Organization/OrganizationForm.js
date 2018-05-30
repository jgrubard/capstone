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
      typeId: organization ? organization.typeId : null,
      address: organization ? organization.address : '',
      city: organization ? organization.city : '',
      state: organization ? organization.state : '',
      zip: organization ? organization.zip : '',
      contact_name: organization ? organization.contact_name : '',
      contact_phone: organization ? organization.contact_phone: '',
      image: organization ? organization.contact_phone: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.addPhoto = this.addPhoto.bind(this);
  }

  // componentWillReceiveProps(nextProps) {
  //   const { organization } = nextProps;
  //   this.setState(organization);
  // }

  handleChange(ev) {
    const change = {}
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  addPhoto(ev) {
    const file = ev.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ image: reader.result });
    }
    reader.readAsDataURL(file);
  }

  onSave(ev) {
    ev.preventDefault();
    const { organization } = this.props;
    const { createOrUpdateOrganization } = this.props;
    const { id, name, organization_type, address, city, state, zip, contact_name, contact_phone, image } = this.state;
    createOrUpdateOrganization({ id, name, organization_type, address, city, state, zip, contact_name, contact_phone, image });
    // this.setState({name: '', organization_type: '', address: '', city: '', state: '', zip: '', contact_name: '', contact_phone: ''})
  }

  render() {
    const { handleChange, onSave, addPhoto } = this;
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
        <div>Add Image<input type='file' onChange={addPhoto}/></div>
        <div><button onClick={onSave}>Submit</button></div>
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
