import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Components
import Post from '../components/post/Post'
import Profile from '../components/profile/Profile'

//MUI
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'

//Redux
import { connect } from 'react-redux'
import { getPosts } from '../redux/actions/dataActions'


export class home extends Component {
    componentDidMount(){
        this.props.getPosts()
    }
    render() {
        const { posts, loading } = this.props.data
        let recentPostsMarkup = !loading
         ? (posts.map(post => <Post key={post.createdAt} post={post} />))
         : (<CircularProgress thickness={20} />)
        return (
            <Grid container spacing={10}>
                <Grid item sm={8} sx={12}>
                    <h1>{recentPostsMarkup}</h1>
                </Grid>
                <Grid item sm={4} sx={12}>
                    <Profile />
                </Grid>
            </Grid>
        )
    }
}

home.propTypes = {
    getPosts: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data
})

const mapActionsToProps = {
    getPosts
}

export default connect(mapStateToProps, mapActionsToProps)(home)
