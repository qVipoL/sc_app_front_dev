import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AppIcon from '../images/icon.png'
import { Link } from 'react-router-dom'

import themeObj from '../util/theme'
// MUI
import withStyles from '@material-ui/core/styles/withStyles'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
// Redux
import { connect } from 'react-redux'
import { loginUser } from '../redux/actions/userActions'

const styles = () => ({...themeObj})

export class login extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            email: '',
            password: '',
            errors: {}
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({
                errors: nextProps.UI.errors
            })
        }
    }

    handleSubmit(event){
        event.preventDefault()
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(userData, this.props.history)
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const { classes, UI: { loading } } = this.props
        const { errors } = this.state

        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <img src={AppIcon} alt="icon" className={classes.formIcon}/>
                    <Typography variant="h4" className={classes.pageTitle}>
                        <p>Login</p>
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField
                        id="email"
                        name="email" 
                        type="email" 
                        label="Email" 
                        className={classes.textField}
                        helperText={errors.email} 
                        error={errors.email ? true : false}
                        disabled={loading ? true : false} 
                        value={this.state.email} 
                        onChange={this.handleChange} 
                        fullWidth />

                        <TextField 
                        id="password" 
                        name="password" 
                        type="password" 
                        label="Password" 
                        className={classes.textField}
                        helperText={errors.password} 
                        error={errors.password ? true : false}
                        disabled={loading ? true : false}  
                        value={this.state.password} 
                        onChange={this.handleChange} 
                        fullWidth />

                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}

                        <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading ? true : false}>
                            Log In
                            {loading && (<CircularProgress size={30} className={classes.progress}/>)} 
                        </Button>
                        <br/>
                        <small>Dont have an account? <Link to="/signup" className={classes.signUpLink}>Sign Up</Link></small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login))
