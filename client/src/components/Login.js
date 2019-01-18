import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authentication';
import classnames from 'classnames';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
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
            email: this.state.email,
            password: this.state.password,
        }
        this.props.loginUser(user);
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
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

    render() {
        const {errors} = this.state;
        return(
        <div> 
          <Grid container spacing={56} >
            <Grid item xs={12}>
              <Grid container justify="center" spacing={6} >
                    <form onSubmit={ this.handleSubmit }>                   
                        <Paper className="form-group">
                        <h2 style={{marginBottom: '10px', marginTop: '10px'}}>Login</h2>
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
                            fullWidth
                            />
                            {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                        </Paper>
                        <Paper className="form-group">
                            <TextField
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
                            fullWidth
                            />
                            {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                        </Paper>
                        <Paper className="form-group">
                            <Button type="submit" className="btn btn-primary">
                                Login User
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

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export  default connect(mapStateToProps, { loginUser })(Login)