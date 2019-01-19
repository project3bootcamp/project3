import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../actions/authentication';
import classnames from 'classnames';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

class Register extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirm: '',
            errors: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirm: this.state.password_confirm
        }
        this.props.registerUser(user, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/')
        }
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
//if the current user is logged and trys to register a new user it wil prevent this and redirect to home route
    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }
//classnames will render conditional errors 
    render() {
        const { errors } = this.state;
        return(
        <div>
           <Grid container spacing={56} >
            <Grid item xs={12}>
              <Grid container justify="center" spacing={16} >
            <form onSubmit={ this.handleSubmit }>
                <Paper className="form-group">
                    <h2 style={{marginBottom: '40px'}}>Registration</h2>
                    <TextField
                    style={{width: 500}}
                    type="text"
                    label="Name"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.name
                    })}
                    name="name"
                    onChange={ this.handleInputChange }
                    value={ this.state.name }
                    margin="normal"
                    variant="outlined"
                    />
                    {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                </Paper>
                <Paper className="form-group">
                    <TextField
                    style={{width: 500}}
                    type="email"
                    label="Email"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.email
                    })}
                    name="email"
                    onChange={ this.handleInputChange }
                    value={ this.state.email }
                    margin="normal"
                    variant="outlined"
                    />
                    {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                </Paper>
                <Paper className="form-group">
                    <TextField
                    style={{width: 500}}
                    type="password"
                    label="Password"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.password
                    })}
                    name="password"
                    onChange={ this.handleInputChange }
                    value={ this.state.password }
                    margin="normal"
                    variant="outlined"
                    />
                    {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                </Paper>
                <Paper className="form-group">
                    <TextField
                    style={{width: 500}}
                    type="password"
                    label="Confirm Password"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.password_confirm
                    })}
                    name="password_confirm"
                    onChange={ this.handleInputChange }
                    value={ this.state.password_confirm }
                    margin="normal"
                    variant="outlined"
                    />
                    {errors.password_confirm && (<div className="invalid-feedback">{errors.password_confirm}</div>)}
                </Paper>
                <Paper className="form-group">
                    <Button type="submit" className="btn btn-primary" style={{width: 500}}> 
                        Register User
                    </Button>
                </Paper>
            </form>
            </Grid> 
            </Grid>
            </Grid>
        </div>
        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
//connects file to redux store
export default connect(mapStateToProps,{ registerUser })(withRouter(Register))