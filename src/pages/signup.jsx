import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { isRegisterFormValid } from '../util/formValidation'
// MUI
import withStyles from '@material-ui/core/styles/withStyles'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Avatar from '@material-ui/core/Avatar'
// Icons
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
// Redux
import { connect } from 'react-redux'
import { signUpUser } from '../redux/actions/userActions'

const styles = (theme) => ({...theme.spreadIt})

class signup extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
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
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }
        const errors = isRegisterFormValid(newUserData)
        if(Object.entries(errors).length !== 0){
            this.setState({errors})
        }
        else{
            this.props.signUpUser(newUserData, this.props.history)
        }
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
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant="h4" className={classes.pageTitle}>
                        <p>Sign Up</p>
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

                        <TextField 
                        id="Confirm-Password" 
                        name="confirmPassword" 
                        type="password" 
                        label="Confirm-Password" 
                        className={classes.textField}
                        helperText={errors.confirmPassword} 
                        error={errors.confirmPassword ? true : false}
                        disabled={loading ? true : false}  
                        value={this.state.confirmPassword} 
                        onChange={this.handleChange} 
                        fullWidth />

                        <TextField 
                        id="User-Name" 
                        name="handle" 
                        type="text" 
                        label="User-Name" 
                        className={classes.textField}
                        helperText={errors.handle} 
                        error={errors.handle ? true : false}
                        disabled={loading ? true : false}  
                        value={this.state.handle} 
                        onChange={this.handleChange} 
                        fullWidth />

                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}

                        <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading ? true : false}>
                            Sign Up
                            {loading && (<CircularProgress size={30} className={classes.progress}/>)} 
                        </Button>
                        <br/>
                        <small>Already have an account? <Link to="/login" className={classes.signUpLink}>Log In</Link></small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    signUpUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps = {
    signUpUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(signup))

