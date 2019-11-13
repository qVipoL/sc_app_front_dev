import React, { Component } from 'react'
import PropTypes from 'prop-types'

// MUI
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'

// Redux
import { connect } from 'react-redux'
import { submitComment } from '../../redux/actions/dataActions'

const styles = {
    textField: {
        marginBottom: '10px'
    },
    button: {
        marginTop: '20px',
        position: 'relative'
    },
    visibleSep: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
    },
    progress: {
        position: 'absolute'
    }
}

class CommentForm extends Component {
    state = {
        body: '',
        errors: {}
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({errors: nextProps.UI.errors})
        }
        if(!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({body:''})
        }
    }
    
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const commentData = {
            body: this.state.body
        }
        this.props.submitComment(this.props.postId ,commentData)
    }

    render() {
        const { classes, authenticated} = this.props
        const { errors } = this.state
        const commentFormMarkup = authenticated ? (
            <Grid item sm={12} style={{textAlign:'center'}}>
                <form onSubmit={this.handleSubmit}>
                    <TextField 
                        name="body"
                        type="text"
                        label="Comment on Post"
                        error={errors.comment ? true : false}
                        helperText={errors.comment}
                        value={this.state.body}
                        onChange={this.handleChange}
                        fullWidth
                        className={classes.textField} 
                    />
                    <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary"
                    className={classes.button}>
                        Submit
                    </Button>
                </form>
                <hr className={classes.visibleSep}/>
            </Grid>
        ) : null
        return commentFormMarkup
    }
}

CommentForm.propTypes = {
    submitComment: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired,
    postId: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    UI: state.UI,
    authenticated: state.user.authenticated
})

const mapActionsToProps = {
    submitComment
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CommentForm))
