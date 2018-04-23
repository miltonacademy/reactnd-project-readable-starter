import { combineReducers } from 'redux'
//import * as ReadableAPI from '../utils/ReadableAPI'

import {
    DELETE_POST,
    RECEIVE_POSTS,
    ADD_NEW_POST,
    VOTE_DOWN,
    VOTE_UP,
    UPDATE_POST,
    EDIT_POST,
    RECEIVE_COMMENTS,
    SORTBY_SCORE,
    SORTBY_DATE,
    ADD_NEW_COMMENT,
    VOTE_UP_COMMENT,
    VOTE_DOWN_COMMENT,
    UPDATE_COMMENT,
    EDIT_COMMENT,
    DELETE_COMMENT,
} from '../actions'

const initialPostState = {
    "init1": {
      id: '',
      timestamp: null,
      title: '',
      body: '',
      author: '',
      category: '',
      voteScore: null,
      deleted: null,
      commentCount: null
    },
  }

const initialCommentState = {
    "init2": {
        id: '894tuq4ut84ut8v4t8wun89g',
        parentId: "8xf0y6ziyjabvozdd253nd",
        timestamp: 1468166872634,
        body: 'Hi there! I am a TEMPORARY COMMENT.',
        author: 'thingtwo',
        voteScore: 6,
        deleted: false,
        parentDeleted: false
    },
}

const initialSortState = {
    'sortByParameter': 'INITIALIZED'
}

function posts (state=initialPostState,action) {
    switch(action.type) {
        case DELETE_POST :
            let newState = {...state}
            let thePosts = Object.values(newState)
            console.log('thePosts is %O',thePosts)
            console.log('action is %O',action)
            let filteredPosts = thePosts.filter((p)=> p.id !== action.post)
            console.log('filteredPosts after initial filtering is %O',filteredPosts)
            let returnedState = {}
            filteredPosts.forEach((p,i)=>
                returnedState[`"${i}"`] = p
            )
            console.log('returnedState is %O',returnedState)
            return returnedState
            
        case RECEIVE_POSTS :
            console.log('function posts case RECEIVE_POSTS runs')
            return {...action.posts}
        case ADD_NEW_POST : 
            console.log('state  be ',state)
            console.log('...state  be ',{...state})
            let nextKey = Object.keys(state).length
            console.log(  'logging the thing',          {
                    ...state,
                    [`${nextKey}`]: action.post
                }
                )
            return {
                ...state,
                [`${nextKey}`]: action.post
            }
        case EDIT_POST :
            console.log('%c REDUCER EDIT_POST FIRES * * *','color:green')
            let editPostState = {...state}
            let postToEdit = action.post.id
            console.log('%c postToEdit * * *','color:green',postToEdit)
            console.log('%c editPostState * * * %O','color:green',postToEdit)
            for (var keyslot in editPostState) {
                if (editPostState[keyslot].id === postToEdit) {
                    editPostState[keyslot] = action.post
                }
            }
            return {
                ...editPostState
            }    
        case VOTE_UP :
            let upVoteState = {...state}
            let postToVoteOn = action.post.id
            for (var key in upVoteState) {
                if (upVoteState[key].id === postToVoteOn) {
                    upVoteState[key].option = 'upVote'
                }
            }
            return {
                ...upVoteState
            }
        case VOTE_DOWN :
            let downVoteState = {...state}
            let postToDownVoteOn = action.post.id
            for (var keyval in downVoteState) {
                if (downVoteState[keyval].id === postToDownVoteOn) {
                    downVoteState[keyval].option = 'downVote'
                }
            }
            return {
                ...downVoteState
            } 
        case UPDATE_POST :
            let updatePostState = {...state}
            console.log('*** updatePostState is',updatePostState)
            console.log('***action.post is',action.post)
            let postToUpdateID = action.post.post.id
            console.log('updatePostState is %O',updatePostState)
            console.log('*UPDATE_POST REDUCER* action.post.post.voteScore is',action.post.post.voteScore)
            //updatePostState.voteScore = action.post.voteScore
            for (var keyvalue in updatePostState) {
                console.log('** ** iterating post' + keyvalue, updatePostState[keyvalue]);
                console.log('** ** POST ID updatePostState[keyvalue].id = ', updatePostState[keyvalue].id);
                if (updatePostState[keyvalue].id === postToUpdateID) {
                    updatePostState[keyvalue] = action.post.post
                }
            }
            return {
                ...updatePostState
            }     
        default:
            console.log('function posts default runs')
            return state
    }
}


function comments (state=initialCommentState,action) {
    switch(action.type) {
        case RECEIVE_COMMENTS :
            console.log('reducer function Comments case RECEIVE_COMMENTS runs')
            return {...action.comments}
        case ADD_NEW_COMMENT : 
            console.log('ADD_NEW_COMMENT state  be ',state)
            console.log('ADD_NEW_COMMENT ...state  be ',{...state})
            let nextKey = Object.keys(state).length
            console.log(  'ADD_NEW_COMMENT logging the thing',          {
                    ...state,
                    [`${nextKey}`]: action.comment
                }
                )
            return {
                ...state,
                [`${nextKey}`]: action.comment
            }
        case VOTE_UP_COMMENT :
            let upVoteCommentState = {...state}
            let commentToVoteOn = action.comment.id
            for (var key in upVoteCommentState) {
                if (upVoteCommentState[key].id === commentToVoteOn) {
                    upVoteCommentState[key].option = 'upVote'
                }
            }
            return {
                ...upVoteCommentState
            }
        case VOTE_DOWN_COMMENT :
            let downVoteCommentState = {...state}
            let commentToDownVoteOn = action.comment.id
            for (var keyval in upVoteCommentState) {
                if (downVoteCommentState[keyval].id === commentToDownVoteOn) {
                    downVoteCommentState[keyval].option = 'downVote'
                }
            }
            return {
                ...downVoteCommentState
            }
        case EDIT_COMMENT :
            console.log('%c REDUCER EDIT_COMMENT FIRES * * *','color:green')
            let editCommentState = {...state}
            let commentToEdit = action.comment.id
            console.log('%c commentToEdit * * *','color:green',commentToEdit)
            console.log('%c editCommentState * * * %O','color:green',editCommentState)
            for (var keyslott in editCommentState) {
                if (editCommentState[keyslott].id === commentToEdit) {
                    editCommentState[keyslott] = action.comment
                }
            }
            return {
                ...editCommentState
            }  
        case UPDATE_COMMENT :
            let updateCommentState = {...state}
            let commentToUpdateID = action.comment.comment.id
            console.log('updateCommentState is %O',updateCommentState)
            console.log('*UPDATE_POST REDUCER* action.comment.comment.id',action.comment.comment.id)
            //updatePostState.voteScore = action.post.voteScore
            for (var keyvalueComment in updateCommentState) {
                console.log('** ** iterating post' + keyvalueComment, updateCommentState[keyvalueComment]);
                console.log('** ** POST ID updateCommentState[keyvalueComment].id = ', updateCommentState[keyvalueComment].id);
                if (updateCommentState[keyvalueComment].id === commentToUpdateID) {
                    updateCommentState[keyvalueComment] = action.comment.comment
                }
            }
            return {
                ...updateCommentState
            }   
        case DELETE_COMMENT :
            let newCommentState = {...state}
            let theComments = Object.values(newCommentState)
            console.log('theComments is %O',theComments)
            console.log('action is %O',action)
            let filteredComments = theComments.filter((c)=> c.id !== action.comment)
            console.log('filteredComments after initial filtering is %O',filteredComments)
            let returnedCommentState = {}
            filteredComments.forEach((c,i)=>
                returnedCommentState[`"${i}"`] = c
                )
            console.log('returnedCommentState is %O',returnedCommentState)
            return returnedCommentState                 
        default:
            console.log('ADD_NEW_COMMENT reducer function Comments case default runs')
            return state   
    }
}

function sortValue (state=initialSortState,action) {
    switch(action.type) {
        case SORTBY_SCORE :
            const theSortObj = {
                sortByParameter : action.sortValue
            }
            console.log('{...theSortObj} value is',{...theSortObj})
            return {...theSortObj}
        case SORTBY_DATE :
            const theDateSortObj = {
                sortByParameter : action.sortValue
            }
            console.log('{...theSortObj} value is',{...theDateSortObj})
            return {...theDateSortObj}
        default:
            console.log('reducer function Comments case default runs')
            return state   
    }
}

export default combineReducers({
    posts, comments, sortValue
  })
