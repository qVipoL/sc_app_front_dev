import React, { Component } from 'react'
import PropTypes from 'prop-types'
// Components
import Post from '../components/post/Post'
import PostSkeleton from '../util/PostSkeleton'
import Profile from '../components/profile/Profile'
import ProfileSkeleton from '../util/ProfileSkeleton'
import { HomeMediaQuery } from '../util/mediaQueries'
//MUI
import withStyles from '@material-ui/core/styles/withStyles'
//Redux
import { connect } from 'react-redux'
import { getPosts } from '../redux/actions/dataActions'

const styles = (theme) => ({...theme.spreadIt})

class home extends Component {
    componentDidMount(){
        this.props.getPosts()
    }
    render() {
        const { posts, loading } = this.props.data
        const classes = this.props.classes
        let recentPostsMarkup = !loading ? (posts.map(post => <Post key={post.createdAt} post={post} />)) : (<PostSkeleton />)
        let profileMarkUp = !loading ? (<Profile />) : (<ProfileSkeleton />)
        return (
            <HomeMediaQuery postsMarkUp={recentPostsMarkup} classes={classes} profileMarkUp={profileMarkUp} authenticated={this.props.authenticated} />
        )
    }
}

home.propTypes = {
    getPosts: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data,
    authenticated: state.user.authenticated
})

const mapActionsToProps = {
    getPosts
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(home))
