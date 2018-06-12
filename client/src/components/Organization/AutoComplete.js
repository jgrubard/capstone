import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateOrganizationOnServer } from '../../store';
import axios from 'axios';


class AutoComplete extends Component {
  constructor() {
    super();
    this.state = {
      predictions: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this)
  }

  onChange(ev) {
    (ev.target.value.length < 3) ?
      (this.setState({ predictions: [] }))
      : (
        ev.target.value.length > 3 &&
        axios.post('/api/autoComplete/getpredictions', { input: ev.target.value })
          .then(res => res.data)
          .then(predictions => {
            this.setState({ predictions })
          })
      );

  };

  onSelect(placeId) {
    const { createOrUpdateOrganization, organization } = this.props;
    // const { id, name, organization_type, address, city, state, zip, contact_name, contact_phone, image, textColor, latitude, longitude } = organization;
    axios.post('/api/autoComplete/getplace', { query: placeId })
      .then(res => res.data)
      .then((_address) => {
        _address = _address[0];
        // console.log("ADDDD", _address)
        let address = _address.formatted_address.split(', ');
        address[2] = address[2].split(' ');
        const { lat, lng } = _address.geometry.location;
        // const { address } = address[0];
        // const { city } = address[1];
        // const { state } = address[2][0];
        // const { zip } = address[2][1];
        // _organization = {
        //   id, name, organization_type,
        //   address: address[0],
        //   city: address[1],
        //   state: address[2][0],
        //   zip: address[2][1],
        //   contact_name, contact_phone, image, backgroundColor, textColor,
        //   latitude: lat,
        //   longitude: lng
        // }
        createOrUpdateOrganization({ id, name, organization_type, address: address[0], city: address[1], state: address[2][0], zip: address[2][1], contact_name, contact_phone, image, textColor, backgroundColor, latitude, longitude });
      })
      .catch(err => console.log(err))
  }

  render() {
    const { predictions } = this.state;
    const { onChange, onSelect } = this;
    return (
      <div>
        <input
          onChange={onChange}
          placeholder='Search your Address' />
        <ul>
          {predictions.length ? predictions.map(pred => (
            <li key={pred.place_id}
              onClick={() => onSelect(pred.place_id)}>{pred.description}</li>
          )) : null}
        </ul>
      </div>
    )
  }
}

const mapState = ({ organization }) => {
  return { organization }
}

const mapDispatch = (dispatch) => {
  return {
    createOrUpdateOrganization: (organization) => dispatch(updateOrganizationOnServer(organization))  }
}

export default connect(mapState, mapDispatch)(AutoComplete);