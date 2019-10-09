import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AppIcon from '../images/icon.png'
import axios from 'axios'

// MUI
import withStyles from '@material-ui/core/styles/withStyles'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const styles = {
    form: {
        textAlign: 'center'
    },
    formIcon: {
        maxWidth: '25%',
        opacity: 0.3,
        marginTop: '10px' 
    },
    textField: {
        marginBottom: '10px'
    },
    button: {
        marginTop: '20px' 
    },
    pageTitle: {
        marginBottom: '5px'
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem'
    }
}

export class login extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            email: '',
            password: '',
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

        const userData = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post('/login', userData)
        .then(res => {
            console.log(res.data)
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
                        error={errors.email ? true : false} 
                        value={this.state.password} 
                        onChange={this.handleChange} 
                        fullWidth />

                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}

                        <Button type="submit" variant="contained" color="primary" className={classes.button}>Log In</Button>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(login)
