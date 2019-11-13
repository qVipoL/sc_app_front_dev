import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton'
import DeletePost from './DeletePost'
import PostDialog from './PostDialog'
import LikeButton from './LikeButton'
// MUI
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

// Icons
import ChatIcon from '@material-ui/icons/Chat'

// Redux
import { connect } from 'react-redux'

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20
    },
    image: {
        minWidth: 200,
        objectFit: 'cover'
    },
    content: {
        padding: 25
    },
    smallSpan: {
      fontSize: '20px'
    }
}

class Post extends Component {
    render() {
        dayjs.extend(relativeTime)
        const { classes, post: { body, createdAt, userImage, userHandle, postId, likeCount, commentCount }, user: { authenticated, credentials: { handle } } } = this.props
        const deleteButton = authenticated && userHandle === handle ? (
            <DeletePost postId={postId} />
        ) : (<div></div>)
        return (
            <Card className={classes.card}>
                <CardMedia image={userImage} title="Profile image" className={classes.image}/>
                <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">{userHandle}</Typography>
                    {deleteButton}
                    <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant="body1">{body}</Typography>
                    <LikeButton postId={postId} />
                    <span className={classes.smallSpan}>{likeCount} Likes</span>
                    <MyButton tip="comments">
                        <ChatIcon color="primary" />
                    </MyButton>
                    <span className={classes.smallSpan}>{commentCount} Comments</span>
                    <PostDialog postId={postId} userHandle={userHandle} openDialog={this.props.openDialog} />
                </CardContent>
            </Card>
        )
    }
}

Post.propsTypes = {
    user: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
}

const mapStateToProps = (state) => ({
    user: state.user
})


export default connect(mapStateToProps, null)(withStyles(styles)(Post))

