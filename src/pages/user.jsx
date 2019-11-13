import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Post from '../components/post/Post'
import StaticProfile from '../components/profile/StaticProfile'

//MUI
import Grid from '@material-ui/core/Grid'

//Redux
import { connect } from 'react-redux'
import { getUserData } from '../redux/actions/dataActions'


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

        const PostsMarkup = loading ? 
        (<p>LOADING...</p>) : posts === null ? (
            <p>No Posts For This User</p>
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
            <Grid container spacing={10}>
                <Grid item sm={8} sx={12}>
                    {PostsMarkup}
                </Grid>
                <Grid item sm={4} sx={12}>
                    {this.state.profile === null ? (
                        <p>LOADING...</p>
                    ) : (<StaticProfile profile={this.state.profile} />)}
                </Grid>
            </Grid>
        )
    }
}

user.propTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
})

const mapActionsToProps = {
    getUserData
}


export default connect(mapStateToProps, mapActionsToProps)(user)
