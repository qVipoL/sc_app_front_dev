import React, { Component } from 'react'
import MyButton from '../../util/MyButton'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

// MUI
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'

// Redux
import { connect } from 'react-redux'
import { likePost, unLikePost } from '../../redux/actions/dataActions'

export class LikeButton extends Component {
    likedPost = () => {
        if(this.props.user.likes && this.props.user.likes.find(like => like.postId === this.props.postId)){
            return true
        }
        return false
    }

    likePost = () => {
        this.props.likePost(this.props.postId)
    }

    unLikePost = () => {
        this.props.unLikePost(this.props.postId)
    }

    render() {
        const { user: { authenticated } } = this.props
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
        return likeButton
    }
}

LikeButton.propTypes = {
    likePost: PropTypes.func.isRequired,
    unLikePost: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
    likePost,
    unLikePost
}

export default connect(mapStateToProps, mapActionsToProps)(LikeButton)
