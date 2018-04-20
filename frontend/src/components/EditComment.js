import React, { Component } from 'react'
import serializeForm from 'form-serialize'
import { connect } from 'react-redux'
import { editCommentAction } from '../actions'

class EditComment extends Component {

    editComment = (comment) => {
        console.log('%c now *EDITING* comment ','background: #222; color: #bada55',comment)
        this.props.editCommentDispatch(comment)
        this.props.closeEditCommentModal()
    }
    
    handleSubmit = (e)  => {
        const theOriginalComment = this.props.comment
        e.preventDefault()
        const newInputs = serializeForm(e.target, { hash: true} )
        console.log('newInputs',newInputs)
        console.log('this.props is now ',this.props)
        const editedComment = {
             ...theOriginalComment,
             ...newInputs
        }
        this.editComment(editedComment)
    }

    render() {
        const theComment = this.props.comment
        console.log('theComment is',theComment)
        return (
            <div>
                <p>&nbsp;</p>
                <h2>Edit Comment</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="new-post-details">
                        <textarea rows="5" cols="40" defaultValue={theComment.body} name="body" placeholder="Body" /><br/>
                        <input type="hidden" name="id" value={theComment.id} />
                        <button>SUBMIT</button>
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
        posts: state.posts,
        comments: state.comments,
    }
  }  
  
  function mapDispatchToProps (dispatch) {
    return {
      editCommentDispatch: (data) => dispatch(editCommentAction(data))
    }
  }

  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(EditComment)