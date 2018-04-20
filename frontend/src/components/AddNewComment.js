import React, { Component } from 'react'
import serializeForm from 'form-serialize'
import { connect } from 'react-redux'
import { addNewCommentAction } from '../actions'

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
      addNewCommentDispatch: (data) => dispatch(addNewCommentAction(data))
    }
  }

  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AddNewComment)