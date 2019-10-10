import React, { Component } from 'react'
import Post from '../components/Post';
import axios from 'axios'
import Grid from '@material-ui/core/Grid'

//MUI
import CircularProgress from '@material-ui/core/CircularProgress';


export class home extends Component {
    constructor(props){
        super(props);

        this.state = {
            posts: null
        }
    }
    componentDidMount(){
        axios.get('/posts')
        .then(res => {
            this.setState({
                posts: res.data
            })
            console.log(this.state)
        })
        .catch(err => console.log(err))
    }
    render() {
        let recentPostsMarkup = this.state.posts
         ? (this.state.posts.map(post => <Post key={post.createdAt} post={post} />))
         : (<CircularProgress thickness='20' />)
        return (
            <Grid container spacing={10}>
                <Grid item sm={8} sx={12}>
                    <h1>{recentPostsMarkup}</h1>
                </Grid>
                <Grid item sm={4} sx={12}>
                    <p>Profile</p>
                </Grid>
            </Grid>
        )
    }
}

export default home
