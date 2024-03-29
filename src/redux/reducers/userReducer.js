import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER, LIKE_POST, UNLIKE_POST, MARK_NOTIFICATIONS_READ, CLEAR_NOTIFICATIONS } from '../types'

const initialState = {
    authenticated: false,
    credentials: {},
    likes: [],
    notifications: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            }

        case SET_UNAUTHENTICATED:
            return initialState

        case SET_USER:
            return {
                authenticated: true,
                loading: false,
                ...action.payload
            }
        
        case LOADING_USER:
            return {
                ...state,
                loading: true
            }

        case LIKE_POST:
            return {
                ...state,
                likes: [
                    ...state.likes,
                    {
                        userHandle: state.credentials.handle,
                        postId: action.payload.postId
                    }
                ]
            }
        
        case UNLIKE_POST:
            return {
                ...state,
                likes: state.likes.filter(like => like.postId !== action.payload.postId)
            }

        case MARK_NOTIFICATIONS_READ:
            state.notifications.forEach(notification => notification.read = true)
            return{
                ...state
            }

        case CLEAR_NOTIFICATIONS:
            return{
                ...state,
                notifications: []
            }

        default:
            return state
    }
}