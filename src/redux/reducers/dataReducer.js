import { SET_POSTS, SUBMIT_COMMENT, LOADING_DATA, LIKE_POST, UNLIKE_POST, DELETE_POST, CREATE_POST, SET_POST } from '../types'

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
            if(state.post.postId === action.payload.postId){
                state.post = action.payload
            }
            return { ...state }

        case DELETE_POST:
            let indeX = state.posts.findIndex((post) => post.postId === action.payload)
            state.posts.splice(indeX, 1)
            return { ...state }

        case CREATE_POST:
            return { ...state, posts: [ action.payload.resPost, ...state.posts ]}

        case SET_POST:
            return {
                ...state,
                post: action.payload
            }

        case SUBMIT_COMMENT:
            return {
                ...state,
                post: {
                    ...state.post,
                    commentCount: state.post.commentCount++,
                    comments: [action.payload, ...state.post.comments]
                }
            }
        
            
        default:
            return state
    }
}