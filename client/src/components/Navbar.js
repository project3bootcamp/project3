import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { AppBar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import black from '@material-ui/core/colors/grey';

//import Grid from '@material-ui/core/Grid';

const navStyle = {

}

class Navbar extends Component {

    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;
        const authLinks = (
            <div>
                <Button style={{ color: black[50] }} onClick={this.onLogout.bind(this)}>
                    <img src={user.avatar} alt={user.name} title={user.name}
                        className="rounded-circle"
                        style={{ width: '25px', marginRight: '5px' }} />
                    Logout
                </Button>
                <Link style={{ marginLeft: 0, marginRight: 0, width: 100, fontSize:13, color: black[50] }} to="/">Profile</Link>
            </div>
        )
        const guestLinks = (
            <div>
                <Typography variant="h6" style={{ flexGrow: 2, color: black[50] }}>
                    <Link style={{ color: black[50] }} to="/register">Register</Link>
                </Typography>
                <Typography variant="h6" style={{ flexGrow: 2, color: black[50] }}>
                    <Link style={{ color: black[50] }} to="/login">Sign In</Link>
                </Typography>
            </div>
        )
        return (
            <div style={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar >
                        <Link style={{ marginLeft: 0, marginRight: 0, width: 1500, color: black[50] }} to="/actorsMatch">Actor Movie Match</Link>
                        <div id="navbarSupportedContent">
                            {isAuthenticated ? authLinks : guestLinks}
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}
Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));