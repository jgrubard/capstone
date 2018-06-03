/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { createUserOrganizationOnServer, createFormOnServer } from '../../store';

class AddForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: '',
      }
      this.onChange = this.onChange.bind(this);
      this.onSave = this.onSave.bind(this);
    }

    onChange(ev) {
      const change = {}
      change[ev.target.name] = ev.target.value
      this.setState(change);
    }

    onSave(ev) {
      ev.preventDefault()
      const { createForm } = this.props;
      const name = this.state.name;
      const organizationId = this.props.organization.id;
      createForm({ name: name, organizationId: organizationId });
      this.setState({ name: '' });
    }

    render() {
      const { onChange, onSave } = this;
      const { organization } = this.props
      const { name} = this.state;
      return (
        <div>
          <div className="ui form">
          <div className="three fields">
          <input name='name' value={name} onChange={onChange} className='field'></input>
          <button className="field" onClick={onSave} className='ui grey button'>Add Category</button>
          <div className='field'></div>
          </div>
          </div>
        </div>
      )
    }
  }

  const mapState = ({ users }) => {
    return { users }
  }

  const mapDispatch = dispatch => {
    return {
      createForm: (form) => dispatch(createFormOnServer(form))
    }
  }

  export default connect(mapState, mapDispatch)(AddForm);
