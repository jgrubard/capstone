import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateOrganizationOnServer } from '../../store';

class TextColor extends Component {
    constructor(props) {
        super(props);
        const { organization } = props;
        this.state = {
            textColor: organization ? organization.textColor : '#000000'
        }
        this.handleChange = this.handleChange.bind(this)
        this.onSave = this.onSave.bind(this)

    }
    componentWillReceiveProps(nextProps) {
        const { textColor } = nextProps;
        this.setState(textColor);
    }

    handleChange(ev) {
        const change = {};
        change[ev.target.name] = ev.target.value;
        this.setState(change);
    }

    onSave(ev) {
        ev.preventDefault();
        const { createOrUpdateOrganization } = this.props;
        const { id, textColor } = this.state;
        createOrUpdateOrganization({ id, textColor });
        console.log("******state", textColor)
    }

    render() {
        const { handleChange, onSave } = this;
        const { organization } = this.props
        const { textColor } = this.state;
        return (
            <div>
                <form onSubmit={onSave}>
                    <input
                        type='checkbox'
                        value='#000000'
                        name='Black'
                        onChange={handleChange}
                    />
                    <input
                        type='checkbox'
                        value='#fff'
                        name='White'
                        onChange={handleChange}
                    />
                    <input
                        type='checkbox'
                        value='#969696'
                        name='Gray'
                        onChange={handleChange}
                    />
                    <div><button onClick={onSave} style={{ background: organization.backgroundColor, color: textColor }}>Save Text Color</button></div>
                </form>
            </div>
        )
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



export default connect(mapState, mapDispatch)(TextColor);