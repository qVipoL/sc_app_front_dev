import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types'
import MyButton from '../util/MyButton'

// MUI
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

// Icons
import ChatIcon from '@material-ui/icons/Chat'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'

// Redux
import { connect } from 'react-redux'
import { likePost, unLikePost } from '../redux/actions/dataActions'

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

export class Post extends Component {
    likedPost = () => {
        if(this.props.user.likes && this.props.user.likes.find(like => like.postId === this.props.post.postId)){
            return true
        }
        return false
    }

    likePost = () => {
        this.props.likePost(this.props.post.postId)
    }

    unLikePost = () => {
        this.props.unLikePost(this.props.post.postId)
    }

    render() {
        dayjs.extend(relativeTime)
        const { classes, post: { body, createdAt, userImage, userHandle, postId, likeCount, commentCount }, user: { authenticated } } = this.props
        const likeButton = !authenticated ? (
            <MyButton tip="Like">
                <Link to='/login'>
                    <FavoriteBorder color="primary" />
                </Link>
            </MyButton>
        ) : (
            this.likedPost() ? (
                <MyButton tip="Un Like" onClick={this.unLikePost}>
                    <FavoriteIcon color="primary"/>
                </MyButton>
            ) : (
                <MyButton tip="Like" onClick={this.likePost}>
                    <FavoriteBorder color="primary"/>
                </MyButton>
            )
        )
        return (
            <Card className={classes.card}>
                <CardMedia image={userImage} title="Profile image" className={classes.image}/>
                <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">{userHandle}</Typography>
                    <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant="body1">{body}</Typography>
                    {likeButton}
                    <span className={classes.smallSpan}>{likeCount} Likes</span>
                    <MyButton tip="comments">
                        <ChatIcon color="primary" />
                    </MyButton>
                    <span className={classes.smallSpan}>{commentCount} Comments</span>
                </CardContent>
            </Card>
        )
    }
}

Post.propsTypes = {
    likePost: PropTypes.func.isRequired,
    unLikePost: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
    likePost,
    unLikePost
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Post))

