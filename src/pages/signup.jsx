import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AppIcon from '../images/icon.png'
import axios from 'axios'
import { Link } from 'react-router-dom'

import themeObj from '../util/theme'
// MUI
import withStyles from '@material-ui/core/styles/withStyles'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = () => ({...themeObj})

export class signup extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            loading: false,
            errors: {}
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit(event){
        event.preventDefault()

        this.setState({
            loading: true
        })

        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }

        axios.post('/signup', newUserData)
        .then(res => {
            localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`)
            this.setState({loading: false})
            this.props.history.push('/')
        })
        .catch(err => {
            this.setState({
                errors: err.response.data,
                loading: false
            })
        })
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const { classes } = this.props
        const { errors, loading } = this.state

        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <img src={AppIcon} alt="icon" className={classes.formIcon}/>
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
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(signup)

