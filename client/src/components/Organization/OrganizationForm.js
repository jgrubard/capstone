import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateOrganizationOnServer } from '../../store';

class OrganizationForm extends Component {
  constructor(props) {
    super(props);
    const { organization} = props;
    this.state = {
      id: organization ? organization.id : undefined,
      name: organization ? organization.name : '',
      typeId: organization ? organization.typeId : null,
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
    const {types}=this.props;
    const change = {}
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  onSave(ev) {
    ev.preventDefault();
    const { organization }=this.props;
    const { createOrUpdateOrganization } = this.props;
    const { id, name, typeId, address, city, state, zip, contact_name, contact_phone  } = this.state;
    createOrUpdateOrganization({ id, name, typeId, address, city, state, zip, contact_name, contact_phone  });
    if(organization){
    this.setState({ typeId: typeId})
    } else{
    this.setState({name:'', typeId:null, address:'', city:'', state:'', zip:'', contact_name:'', contact_phone:''})
    }
  }

  render() {
    const { handleChange, onSave } = this;
    const { name, typeId, address, city, state, zip, contact_name, contact_phone } = this.state;
    const { types, organization }=this.props;
    var thisType;
    var otherTypes;
    if(organization){
      thisType=types.find(type => type.id === organization.typeId)
      otherTypes = types.filter(eachType => eachType.id != organization.typeId)
    } else{
      thisType = null;
      otherTypes = types;
    }
      

    return (
      <div>
        <div>Organization Name<input name='name' value={name} onChange={handleChange} /></div>
        <div>
          <select value={typeId} name='typeId' onChange={handleChange}>
          {thisType?<option value={thisType.id}>{thisType.name}</option>:<option value={null}>Select Type</option>}
          {otherTypes.map(type => <option key={type.id} value={type.id}>{type.name}</option>)
          }
        </select>
        </div>
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

const mapState = ({state,types}, { organization }) => {
  return { organization, types }
}

const mapDispatch = (dispatch) => {
  return {
    createOrUpdateOrganization: (organization) => dispatch(updateOrganizationOnServer(organization))
  }
}

export default connect(mapState, mapDispatch)(OrganizationForm);
