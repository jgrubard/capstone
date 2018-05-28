/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { createUserOrganizationOnServer } from '../../store';

class AddForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        email: '',
        findUser:null,
        errormessage: false
      }
      this.onChange = this.onChange.bind(this);
      this.onSave = this.onSave.bind(this);
      this.onSearch=this.onSearch.bind(this)
    }

    // componentWillReceiveProps(nextProps) {
    //   const { user } = nextProps;
    //   if (user.id) {
    //     const { id, firstName, lastName, email, password } = user
    //     this.setState({ id, firstName, lastName, email, password })
    //   }
    // }

    onChange(ev) {
      const change = {}
      change[ev.target.name] = ev.target.value
      this.setState(change);
    }

    onSearch(ev){
      const findUser=this.props.users.find(user=>user.email===this.state.email)
      if(findUser){this.setState({findUser:findUser});}
      else{this.setState({errormessage:true})}
    }

    onSave(ev) {
      ev.preventDefault()
      const { updateUser } = this.props;
      const userId = this.state.findUser.id;
      const organizationId = this.props.organization.id;
      console.log(userId,organizationId)
      this.props.createUserOrganization({userId:userId,organizationId:organizationId});
      this.setState({errormessage:false});
      this.setState({findUser:null});

    }

    render() {
      const { onChange, onSave, onSearch } = this;
      const { user, users, organization } = this.props
      const { email, findUser, errormessage} = this.state;
      return (
        <div>
          <div>
          <input name='email' value={email} onChange={onChange}></input><button onClick={onSearch}>Search by email</button>
          {/* <button onClick={onSave}>Save</button> */}
          {findUser? <div>{findUser.firstName} {findUser.lastName}<button onClick={onSave}>Add {findUser.firstName} to {organization.name}</button></div>: errormessage? <p>Can't find this user</p>:null  }
          </div>
        </div>
      )
    }
  }

  const mapState = ({state,users}) => {
    return { users }
  }

  const mapDispatch = (dispatch) => {
    return {
      createUserOrganization: (userorganization) => dispatch(createUserOrganizationOnServer(userorganization))
    }
  }

  export default connect(mapState, mapDispatch)(AddForm);
