import React, { Component, Fragment } from 'react';
import { logout } from '../../actions/authactions';
import { connect } from 'react-redux';
import { NavLink } from 'reactstrap';
import PropTypes from 'prop-types';


export class Logout extends Component {

    static propTypes = {
        logout: PropTypes.func.isRequired
    }

    render() {
        return (
            <Fragment>
                <NavLink onclick={this.props.logout} href="#">

                </NavLink>
            </Fragment>
        )
    }
}

export default connect (null, { logout })(Logout);
