import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton'
import withStyles from '@material-ui/core/styles/withStyles'

// MUI
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'

// Redux
import { connect } from 'react-redux'
import { deletePost } from '../../redux/actions/dataActions'

const styles = {
}

class DeletePost extends Component {
    state = {
        open: false
    }
    handleOpen = () => {
        this.setState({ open:true })
    }
    handleClose = () => {
        this.setState({ open:false })
    }
    deletePost = () => {
        this.props.deletePost(this.props.postId)
        this.setState({ open:false })
    }
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <MyButton tip="Delete Post" onClick={this.handleOpen} btnClassName={classes.deleteButton}>
                    <DeleteOutlineIcon color="secondary" />
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <DialogTitle>Are U Sure M8?</DialogTitle>
                    <DialogActions>
                        <Button onClick={this.deletePost} color="secondary">
                            Delete
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        )
    }
}

DeletePost.propTypes = {
    deletePost: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired
}

const mapActionsToProps = {
    deletePost
}

export default connect(null, mapActionsToProps)(withStyles(styles)(DeletePost))
