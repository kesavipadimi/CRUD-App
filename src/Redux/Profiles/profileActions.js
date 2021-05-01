import {getPosts, getProfiles, getComments, addComment, deleteComment} from '../../Services/service';
import {UPDATE_USER_LIST, UPDATE_POST_LIST, UPDATE_POST_COMMENTS, UPDATE_COMMENT} from '../../Redux/ActionTypes';

const getProfileData = () => (dispatch) => {
    getProfiles().then(res => {
        dispatch(updateUserList(res))
    });
} 

const getPostsData = (id) => (dispatch) => {
    getPosts(id).then(res => {
        dispatch(updatePostList(res))
    });
} 

const getCommentsData = (id) => (dispatch) => {
    getComments(id).then(res => {
        dispatch(updatePostComments(res))
    });
} 

const addPostComment = (payload) => (dispatch, getState) => {
    const {profile: {commentsList}} = getState();
    const randowKey = Math.floor(Math.random() * 101);

    addComment(payload).then(res => {
        const data = commentsList.length > 0 ? [...commentsList, {...res, id: randowKey}] : [{...res,  id: randowKey}];
        dispatch(updatePostComments(data))
    });
}  

const deletePostComment = (id) => (dispatch, getState) => {
    const {profile: {commentsList}} = getState();

    deleteComment(id).then(() => {
        const data = commentsList.length > 0 && commentsList.filter(item => item.id !== id);
        dispatch(updatePostComments(data))
    });
}  

const updateUserList = (payload) =>({
    type:UPDATE_USER_LIST,
    payload
});

const updatePostList = (payload) =>({
    type:UPDATE_POST_LIST,
    payload
});

const updatePostComments = (payload) =>({
    type:UPDATE_POST_COMMENTS,
    payload
});

const updateComment = (payload) => ({
    type: UPDATE_COMMENT,
    payload
});

const profileActions = {
    getProfileData,
    updateUserList,
    getPostsData,
    updatePostList,
    updatePostComments,
    getCommentsData,
    addPostComment,
    deletePostComment,
    updateComment
};

export default profileActions;
