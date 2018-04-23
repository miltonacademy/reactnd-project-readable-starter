import React, { Component } from 'react'
import serializeForm from 'form-serialize'
import { connect } from 'react-redux'
import { addNewCommentAction, updatePostAction } from '../actions'

class AddNewComment extends Component {

    addNewComment = (comment) => {
        console.log('now adding comment ',comment)
        this.props.addNewCommentDispatch(comment)
        this.props.closeAddCommentModal()
    }
    
    handleSubmit = (e)  => {
        e.preventDefault()
        const values = serializeForm(e.target, { hash: true} )
        console.log(values)
        console.log('this.props is now ',this.props)
        console.log('this.state is now ',this.state)
        this.addNewComment(values)
        //need to trigger updatePost with the post
        //need to get the post from props using the post ID value
        const postIDToReRender = values.parentId
        const posts = this.props.posts
        let postToReRender = {}
        console.log('HANDLE SUBMIT VALUES BE ',values)
        console.log('postIDToReRender be',postIDToReRender)
        console.log('this.props.posts be',this.props.posts)
        for (var key in posts) {
            if (posts[key].id === postIDToReRender) {
                console.log('%c POST TO RE-RENDER IS ','color:green; font-weight: bold;',postIDToReRender)
                postToReRender = posts[key]
                console.log('%c RE-RENDER POST ','color:green; font-weight: bold;',postToReRender)
            }
        }
        let post = { post : postToReRender}
        console.log('post.post.commentCount pre',post.post.commentCount)
        post.post.commentCount ++
        console.log('post.post.commentCount post',post.post.commentCount)
        this.props.updatePostDispatch(post)
    }

    render() {
        const parent_id = this.props.parentId
        console.log('COMMENT TO ADD PARENT ID IS ',parent_id)
        return (
            <div>
                <p>&nbsp;</p>
                <h2>Add New Comment</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="new-post-details">
                        <textarea name="body" rows="5" cols="40" placeholder="Body"></textarea><br/>
                        <input type="text" name="author" placeholder="Author" /><br/>
                        <input type="hidden" name="parentId" value={parent_id} />
                        <br/>
                        <button>SUBMIT COMMENT</button>
                    </div>
                </form>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        posts: state.posts
    }
  }  
  
  function mapDispatchToProps (dispatch) {
    return {
      addNewCommentDispatch: (data) => dispatch(addNewCommentAction(data)),
      updatePostDispatch: (data) => dispatch(updatePostAction(data)),
    }
  }

  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AddNewComment)