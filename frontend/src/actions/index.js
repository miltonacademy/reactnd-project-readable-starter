import * as ReadableAPI from '../utils/ReadableAPI'

export const DELETE_POST = 'DELETE_POST'
export const ADD_NEW_POST = 'ADD_NEW_POST'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const VOTE_UP = 'VOTE_UP'
export const VOTE_DOWN = 'VOTE_DOWN'
export const UPDATE_POST = 'UPDATE_POST'
export const EDIT_POST = 'EDIT_POST'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const SORTBY_SCORE = 'SORTBY_SCORE'
export const SORTBY_DATE = 'SORTBY_DATE'
export const ADD_NEW_COMMENT = 'ADD_NEW_COMMENT'
export const VOTE_UP_COMMENT = 'VOTE_UP_COMMENT'
export const VOTE_DOWN_COMMENT = 'VOTE_DOWN_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export const deletePost = post => ({
        type: DELETE_POST,
        post
});

export const deleteComment = comment => ({
    type: DELETE_COMMENT,
    comment
});

export const editPost = post => ({
    type: EDIT_POST,
    post
});

export const editComment = comment => ({
    type: EDIT_COMMENT,
    comment
});

export const updatePost = post => ({
    type: UPDATE_POST,
    post
});

export const updateComment = comment => ({
    type: UPDATE_COMMENT,
    comment
});

export const voteUp = post => ({
    type: VOTE_UP,
    post,
});

export const voteDown = post => ({
    type: VOTE_DOWN,
    post,
});

export const voteUpComment = comment => ({
    type: VOTE_UP_COMMENT,
    comment,
});

export const voteDownComment = comment => ({
    type: VOTE_DOWN_COMMENT,
    comment,
});

export const addNewPost = post => ({
    type: ADD_NEW_POST,
    post
});

export const receivePosts = posts => ({
    type: RECEIVE_POSTS,
    posts
});

export const sortByScore = sortValue => ({
    type: SORTBY_SCORE,
    sortValue
});

export const sortByDate = sortValue => ({
    type: SORTBY_DATE,
    sortValue
});

export const receiveComments = comments => ({
    type: RECEIVE_COMMENTS,
    comments
});

export const addNewComment = comment => ({
    type: ADD_NEW_COMMENT,
    comment
});

export const fetchPostsAction = () => dispatch => (
    ReadableAPI.getPosts()
    .then(posts => dispatch(receivePosts(posts)))
);

export const fetchCommentsAction = (post_id) => dispatch => {
    console.log('%c fetchCommentsAction before API call the post_id.post_id value is','color:#990000;font-weight:bold',post_id.post_id)
    ReadableAPI.getComments(post_id.post_id)
    .then(comments => dispatch(receiveComments(comments)))
}

export const deletePostAction = (post) => dispatch => {
    ReadableAPI.deletePost(post)
    .then(posts => dispatch(deletePost(post)))
}

export const editPostAction = (post) => dispatch => {
    console.log('%c editPostAction before API call the POST value is','color:red',post)
    ReadableAPI.editPost(post)
    .then(posts => dispatch(editPost(post)))
}

export const deleteCommentAction = (comment) => dispatch => {
    ReadableAPI.deleteComment(comment)
    .then(comments => dispatch(deleteComment(comment)))
}

export const editCommentAction = (comment) => dispatch => {
    console.log('%c editCommentAction before API call the COMMENT value is','color:red',comment)
    ReadableAPI.editComment(comment)
    .then(comments => dispatch(editComment(comment)))
}

export const sortByScoreAction = (sortByParameter) => dispatch => {
    dispatch(sortByScore(sortByParameter))
}

export const sortByDateAction = (sortByParameter) => dispatch => {
    dispatch(sortByDate(sortByParameter))
}

export const voteUpAction = (post) => dispatch => {
    ReadableAPI.voteUp(post)
    .then(post => dispatch(voteUp(post)))
    .then(post => dispatch(updatePost(post)))
    console.log('%c voteUpAction after API call the POST value is','color:red',post)
}

export const voteDownAction = (post) => dispatch => {
    ReadableAPI.voteDown(post)
    .then(post => dispatch(voteDown(post)))
    .then(post => dispatch(updatePost(post)))
}

export const voteUpCommentAction = (comment) => dispatch => {
    ReadableAPI.voteUpComment(comment)
    .then(comment => dispatch(voteUpComment(comment)))
    .then(comment => dispatch(updateComment(comment)))
    console.log('%c voteUpCommentAction after API call the POST value is','color:red',comment)
}

export const voteDownCommentAction = (comment) => dispatch => {
    ReadableAPI.voteDownComment(comment)
    .then(comment => dispatch(voteDownComment(comment)))
    .then(comment => dispatch(updateComment(comment)))
}

export const addNewPostAction = (post) => dispatch => {
    const uuid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    console.log('addNewPost action creator pre-post is ',post)
    let postToAPI = {
        id: `${uuid}`,
        timestamp: Date.now(),
        title: post.title,
        body: post.body,
        author: post.author,
        category: post.category,
        voteScore: 1,
        //deleted: false,
        //commentCount: 12
    }
    console.log('addNewPost action creator post-post is ',postToAPI)
    ReadableAPI.addNewPost(postToAPI)
    .then(() => { 
        console.log("postToAPI is %O", postToAPI);
        dispatch(addNewPost(postToAPI));
      })
}

export const addNewCommentAction = (comment) => dispatch => {
    const uuidComment = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    let commentToAPI = {
        id: `${uuidComment}`,
        timestamp: Date.now(),
        body: comment.body,
        author: comment.author,
        voteScore: 1,
        parentId: comment.parentId
    }
    ReadableAPI.addNewComment(commentToAPI)
    .then(() => { 
        console.log("commentToAPI is %O", commentToAPI);
        dispatch(addNewComment(commentToAPI));
      })
}

