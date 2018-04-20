import React, { Component } from 'react'
import ScoreItem from './ScoreItem'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import EditPost from './EditPost'
import { deletePostAction } from '../actions'
import { Link } from 'react-router-dom'

class PreviewPost extends Component {

    state = {
        editPostModalOpen : false,
    }

    openEditPostModal = ({ post }) => {
        this.setState(() => ({
            editPostModalOpen : true,
            post
        }))
      }

    closeEditPostModal = () => {
        this.setState(() => ({
            editPostModalOpen: false,
        }))
    }


    deletePost = (post) => {
        console.log('now deleting post ID',post.id)
        this.props.deletePostDispatch(post.id)
    }

    render(){
        const post = this.props.post
        const { editPostModalOpen } = this.state

        return (
            <div className='preview-post-container'>
                <div className='score-item'>
                    <ScoreItem
                        post = {post} 
                        key={post.id}
                        />
                </div>
                <div className='preview-post-content'>
                    <Link to={`/${post.category}/${post.id}`}
                        ><h3>{post.title}</h3></Link>
                    <p>author: {post.author}</p>
                    <p>category: {post.category}</p>
                    <p>comments: ({post.commentCount})</p>
                    <button
                        className='icon-btn'
                        onClick={()=>this.openEditPostModal({post})}>
                        EDIT
                    </button>
                    <button
                        className='icon-btn'
                        onClick={()=>this.deletePost(post)}>
                        DELETE
                    </button>
                </div>
                
                
                        
                <Modal
                className='modal'
                overlayClassName='overlay'
                isOpen={editPostModalOpen}
                onRequestClose={this.closeEditPostModal}
                contentLabel='Modal'
                >
                    <EditPost
                        post = {post}
                        key={post.id}
                        closeEditPostModal={this.closeEditPostModal}
                        />
                </Modal> 
                
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
        deletePostDispatch: (data) => dispatch(deletePostAction(data)),
    }
  }

export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PreviewPost)
