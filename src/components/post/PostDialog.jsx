import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import LikeButton from './LikeButton'
import Comments from './Comments'
import CommentForm from './CommentForm'
// Redux
import { connect } from 'react-redux'
import { getPost, clearErrors } from '../../redux/actions/dataActions'

//material ui
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import CircularProgress from '@material-ui/core/CircularProgress'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

//icons
import ChatIcon from '@material-ui/icons/Chat'
import CloseIcon from '@material-ui/icons/Close'
import UnfoldMore from '@material-ui/icons/UnfoldMore'


const styles = {
    closeButton: {
        position: 'absolute',
        left: '90%',
        top: '8%'
    },
    invisibleSep: {
        border: 'none',
        margin: 4
    },
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 20
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    },
    smallSpan: {
        fontSize: '20px'
    },
    visibleSep: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
    }
}

class PostDialog extends Component{
    state = {
        open: false,
        oldPath: '',
        newPath: ''
    }

    componentDidMount(){
        if(this.props.openDialog){
            this.handleOpen()
        }
    }

    handleOpen = () => {
        let oldPath = window.location.pathname
        
        const { userHandle, postId } = this.props
        const newPath = `/users/${userHandle}/post/${postId}`

        if(oldPath === newPath) oldPath = `/users/${userHandle}`

        window.history.pushState(null, null, newPath)
        this.setState({ open: true, oldPath, newPath })
        this.props.getPost(this.props.postId)
    }

    handleClose = () => {
        window.history.pushState(null, null, this.state.oldPath)
        this.setState({ open: false })
        this.props.clearErrors()
    }

    render(){
        const { classes, post: { postId, body, createdAt, likeCount, commentCount, userImage, userHandle, comments }, UI: {loading}} = this.props
        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={200} thickness={2} />
            </div>
        ) : (
            <Grid container spacing={10} >
                <Grid item sm={5}>
                    <img src={userImage} alt="Profile" className={classes.profileImage} />
                </Grid>
                <Grid item sm={7}>
                    <Typography
                        component={Link}
                        color="primary"
                        variant="h5"
                        to={`/users/${userHandle}`}>
                            @{userHandle}
                    </Typography>
                    <hr className={classes.invisibleSep}/>
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSep}/>
                    <Typography variant="body1">
                        {body}
                    </Typography>
                    <LikeButton postId={postId} />
                    <span className={classes.smallSpan}>{likeCount} Likes</span>
                    <MyButton tip="comments">
                        <ChatIcon color="primary" />
                    </MyButton>
                    <span className={classes.smallSpan}>{commentCount} Comments</span>
                </Grid>
                <hr className={classes.visibleSep}/>
                <CommentForm postId={postId} />
                <Comments comments={comments} />
            </Grid>
        )
        return (
            <React.Fragment>
                <MyButton onClick={this.handleOpen} tip="expand post" tipClassName={classes.expandButton}>
                    <UnfoldMore color="primary" />
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon color="secondary" />
                    </MyButton>
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </React.Fragment>
        )
    }
}

PostDialog.propTypes = {
    getPost: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    clearErrors: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
}

const mapStateToProps = (state) => ({
    UI: state.UI,
    post: state.data.post
});

const mapActionsToProps = {
    getPost,
    clearErrors
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostDialog))

