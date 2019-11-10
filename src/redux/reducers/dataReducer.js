import { SET_POSTS, LOADING_DATA, LIKE_POST, UNLIKE_POST } from '../types'

const initialState = {
    posts: [],
    post: {},
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case LOADING_DATA:
            return { ...state, loading: true }

        case SET_POSTS:
            return { ...state, posts: action.payload, loading: false }

        case UNLIKE_POST:
        case LIKE_POST:
            let index = state.posts.findIndex((post) => post.postId === action.payload.postId)
            state.posts[index] = action.payload
            return { ...state }

        default:
            return state
    }
}