import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton'

// Redux
import { connect } from 'react-redux'
import { createPost, clearErrors } from '../../redux/actions/dataActions'

//material ui
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import CircularProgress from '@material-ui/core/CircularProgress'
import withStyles from '@material-ui/core/styles/withStyles'

//icons
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'

const styles = {
    submitButton: {
        position: 'relative'
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: '90%',
        top: '8%'
    },
    textField: {
        marginBottom: '10px'
    }
}

class CreatePost extends Component {
    state = {
        open: false,
        body: '',
        errors: {}
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({
                errors: nextProps.UI.errors
            })
        }
        if(!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({body:'', open: false, errors: {}})
        }
    }

    handleOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.props.clearErrors()
        this.setState({ open: false, errors: {} })
    }

    handleChange = (e) => {
        this.setState({ [ e.target.name ] : e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const newPost = {
            body: this.state.body
        }
        this.props.createPost(newPost)
    }

    render() {
        const { errors } = this.state
        const { classes, UI: { loading }} = this.props
        return (
            <React.Fragment>
                <MyButton onClick={this.handleOpen} tip="Create Post">
                    <AddIcon color="secondary" />
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon color="secondary" />
                    </MyButton>
                    <DialogTitle>Create New Post</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                name="body"
                                type="text"
                                label="Post!"
                                fullWidth
                                multiline
                                rows="3"
                                placeholder="POST ME"
                                error={ errors.error ? true : false }
                                helperText={errors.error}
                                className={classes.textField}
                                onChange={this.handleChange} 
                                disabled={loading}
                            />
                            <Button type="submit"
                                variant="contained" 
                                color="primary" 
                                className={classes.submitButton} 
                                disabled={loading}>
                                    Submit
                                    { loading && (
                                        <CircularProgress size={30} className={classes.progressSpinner} />
                                    )}
                             </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </React.Fragment>
        )
    }
}

CreatePost.propTypes = {
    createPost: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    UI: state.UI
});

const mapActionsToProps = {
    createPost,
    clearErrors
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CreatePost))
