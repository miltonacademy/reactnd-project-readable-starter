import React, { Component } from 'react'
import serializeForm from 'form-serialize'
import { connect } from 'react-redux'
import { editPostAction } from '../actions'

class EditPost extends Component {

    editPost = (post) => {
        console.log('%c now *EDITING* post ','background: #222; color: #bada55',post)
        this.props.editPostDispatch(post)
        this.props.closeEditPostModal()
    }
    
    handleSubmit = (e)  => {
        const theOriginalPost = this.props.post
        e.preventDefault()
        const newInputs = serializeForm(e.target, { hash: true} )
        console.log('newInputs',newInputs)
        console.log('this.props is now ',this.props)
        const editedPost = {
             ...theOriginalPost,
             ...newInputs
        }
        this.editPost(editedPost)
    }

    render() {
        const thePost = this.props.post
        return (
            <div>
                <p>&nbsp;</p>
                <h2>Edit Post - {thePost.title}</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="new-post-details">
                        <input defaultValue={thePost.title} type="text" name="title" placeholder="Title" 
                           /><br/>
                        <textarea defaultValue={thePost.body} name="body" placeholder="Body" /><br/>
                        <select name="category" defaultValue={thePost.category}>
                            <option value="React">React</option>
                            <option value="Redux">Redux</option>
                            <option value="Udacity">Udacity</option>
                        </select>
                        <input type="hidden" name="id" value={thePost.id} />
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
        posts: state.posts
    }
  }  
  
  function mapDispatchToProps (dispatch) {
    return {
      editPostDispatch: (data) => dispatch(editPostAction(data))
    }
  }

  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(EditPost)