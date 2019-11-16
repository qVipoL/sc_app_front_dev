import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
// Components
import Post from '../components/post/Post'
import Profile from '../components/profile/Profile'
import StaticProfile from '../components/profile/StaticProfile'
import PostSkeleton from '../util/PostSkeleton'
import ProfileSkeleton from '../util/ProfileSkeleton'
// MUI
import Grid from '@material-ui/core/Grid'
import withStyles from '@material-ui/core/styles/withStyles'
// Redux
import { connect } from 'react-redux'
import { getUserData } from '../redux/actions/dataActions'

const styles = (theme) => ({...theme.spreadIt})

class user extends Component {
    state = {
        profile: null,
        postIdparam: null
    }
    
    componentDidMount(){
        const handle = this.props.match.params.handle
        const postId = this.props.match.params.postId

        if(postId) this.setState({ postIdparam: postId })

        this.props.getUserData(handle)
        axios.get(`/user/${handle}`)
            .then(res => {
                this.setState({ profile: res.data.user })
            })
            .catch(err => console.log(err))
    }

    render() {
        const { posts, loading } = this.props.data
        const { postIdparam } = this.state
        const classes = this.props.classes
        const PostsMarkup = loading ? 
        (<PostSkeleton />) : posts === null ? (
            <p>This User Has No Posts</p>
        ) : !postIdparam ? (
            posts.map(post => <Post key={post.postId} post={post}/>)
        ) : (
            posts.map(post => {
                if(post.postId !== postIdparam)
                    return <Post key={post.postId} post={post}/>
                else
                    return <Post key={post.postId} post={post} openDialog/>
            })
        )

        return (
            <Grid container spacing={10} className={classes.simpleBg}>
                <Grid item xs={12} md={4}>
                    {this.state.profile === null ? (
                        <ProfileSkeleton />
                    ) : this.props.userHandle === this.props.match.params.handle ? (<Profile />) : (<StaticProfile profile={this.state.profile} />)}
                </Grid>
                <Grid item xs={12} md={8}>
                    {PostsMarkup}
                </Grid>
            </Grid>
        )
    }
}

user.propTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    userHandle: PropTypes.string
}

const mapStateToProps = state => ({
    data: state.data,
    userHandle: state.user.credentials.handle
})

const mapActionsToProps = {
    getUserData
}


export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(user))
