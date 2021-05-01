import {UPDATE_USER_LIST, UPDATE_POST_LIST, UPDATE_POST_COMMENTS, UPDATE_COMMENT} from '../../Redux/ActionTypes';

const initailState = {
    userList:[],
    postList:[],
    commentsList: [],
    comment: ""
}

const profileReducer = (state=initailState, action) =>{
    const {type, payload} = action;

    switch(type){
        case UPDATE_USER_LIST:
            return {...state, userList:payload}
        case UPDATE_POST_LIST:
            return {...state, postList: payload}    
        case UPDATE_POST_COMMENTS:
            return {...state, commentsList: payload}
        case UPDATE_COMMENT:
            return {...state, comment: payload}
        default :
            return state;
    }
}

export default profileReducer;