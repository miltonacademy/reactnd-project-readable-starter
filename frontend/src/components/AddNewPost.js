import React, { Component } from 'react'
import serializeForm from 'form-serialize'
import { connect } from 'react-redux'
import { addNewPostAction } from '../actions'

class AddNewPost extends Component {

    addNewPost = (post) => {
        console.log('now adding post ',post)
        this.props.addNewPostDispatch(post)
        this.props.closeAddPostModal()
    }
    
    handleSubmit = (e)  => {
        e.preventDefault()
        const values = serializeForm(e.target, { hash: true} )
        console.log(values)
        console.log('this.props is now ',this.props)
        console.log('this.state is now ',this.state)
        this.addNewPost(values)
    }

    render() {
        return (
            <div>
                <p>&nbsp;</p>
                <h2>Add New Post</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="new-post-details">
                        <input type="text" name="title" placeholder="Title" /><br/>
                        <textarea name="body" rows="5" cols="40" placeholder="Body"></textarea><br/>
                        <input type="text" name="author" placeholder="Author" /><br/>
                        Category:<br/>
                        <select name="category" value>
                            <option value="React" selected>React</option>
                            <option value="Redux">Redux</option>
                            <option value="React">Udacity</option>
                        </select>
                        <br/>
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
      addNewPostDispatch: (data) => dispatch(addNewPostAction(data))
    }
  }

  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AddNewPost)