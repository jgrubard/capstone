import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateOrganizationOnServer } from '../../store';

class OrganizationForm extends Component {
  constructor(props) {
    super(props);
    const { organization } = props;
    this.state = {
      id: organization ? organization.id : '',
      name: organization ? organization.name : '',
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
    const { id, name } = this.state;
    createOrUpdateOrganization({ id, name });
    this.setState({ name: '' })
  }

  render() {
    const { handleChange, onSave } = this;
    const { name } = this.state;
    return (
      <div>
        <h3>Organization Form</h3>
        <input name='name' value={name} onChange={handleChange} />
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
