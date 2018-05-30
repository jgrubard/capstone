import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateOrganizationRequestOnServer } from '../../store';

class OrganizationRequests extends Component {
  constructor() {
    super();
    this.state = { requestStatus: '' }
    this.accept = this.accept.bind(this);
    this.decline = this.decline.bind(this);
  }

  accept(id, userId, organizationId) {
    this.setState({ requestStatus: 'accepted' });
    this.props.updateRequest({ id, userId, organizationId, status: 'accepted' })
  }

  decline(id, userId, organizationId) {
    this.setState({ requestStatus: 'declined' });
    this.props.updateRequest({ id, userId, organizationId, status: 'declined' })
  }

  render() {
    const { ownUsers, organization, organizationRequests } = this.props;
    const { accept, decline } = this;
    return (
      <div>
        {
          ownUsers.map(user => {
            const ownRequest = organizationRequests.find(request => request.userId === user.id && request.organizationId === organization.id);
            const { id, userId, organizationId } = ownRequest;
            return (
              <div key={user.id}>
                {user.fullName}
                <button onClick={() => accept(id, userId, organizationId)}>Accept</button>
                <button onClick={() => decline(id, userId, organizationId)}>Decline</button>
                { this.state.requestStatus === 'accepted' && 'Accepted' }
                { this.state.requestStatus === 'declined' && 'Declined' }
              </div>
            )
          })
        }
      </div>
    );
  }
}

const mapState = ({ users, organizations, organizationRequests }, { organization }) => {
  const ownUsers = organizationRequests.reduce((memo, request) => {
    users.forEach(user => {
      if(request.organizationId === organization.id && request.userId === user.id) {
        if(!memo.includes(user)) {
          memo.push(user)
        }
      }
    })
    return memo;
  }, [])
  return {
    organization,
    ownUsers,
    organizationRequests
  }
}

const mapDispatch = dispatch => {
  return {
    updateRequest: (orgReq) => dispatch(updateOrganizationRequestOnServer(orgReq)),
  }
}

export default connect(mapState, mapDispatch)(OrganizationRequests)
