import React, { Component, Fragment } from 'react';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';

import { connect } from 'react-redux';
import Registermodal from './Auth/ModalReg';
import Logout from './Auth/Logout';
import LoginModal from './Auth/LoginModal';
import PropTypes from 'prop-types'
import { isAssignmentExpression } from '@babel/types';

class AppNavBar extends Component {

        state = {
            isOpen: false
        }

        static propTypes = {
            auth: PropTypes.object.isRequired
        }
        
        toggle = () => {
            this.setState({
                isOpen: !this.state.isOpen
            })
        }

        render() {
        const { user, isAuthenticated } = this.props.auth;

        const authLinks = (
            <Fragment>
                <NavItem>
                    <span classname="navabr-text mr-3">
                        <strong>{ user ? `Welcome! ${user.name}`: 'NULL' }</strong>
                    </span>
                </NavItem>
                <NavItem>
                    <Logout/>
                </NavItem>
            </Fragment>
        )

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <Registermodal/>
                </NavItem>
                <NavItem>
                    <LoginModal/>
                </NavItem>
            </Fragment>
        )

        return (
            <div>
            <Navbar color="dark" dark expand="md" className="mb-5">
                <Container>
                    <NavbarBrand href="/"> ShoppingList</NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            { isAuthenticated ? authLinks: guestLinks}
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(AppNavBar);
