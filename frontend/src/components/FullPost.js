import React, { Component } from 'react'
import ScoreItem from './ScoreItem'
import ListComments from './ListComments'
import { fetchCommentsAction, deletePostAction } from '../actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Modal from 'react-modal'
import EditPost from './EditPost'

class FullPost extends Component {

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

    componentDidMount(){
        console.log('componentDidMount comments dispatch with this.props.post_id equal to ' + this.props.post_id)
        this.fetchComments(this.props.post_id)
    }

    fetchComments = (post_id) => {
        console.log('about to fetch comments dispatch with post_id equal to ' + post_id)
        this.props.fetchCommentsDispatch(post_id)
    }

    render() {
        const post = this.props.post
        const post_id = this.props.post.id
        const allcomments = this.props.comments
        const { editPostModalOpen } = this.state
        let comments = {}
        console.log(comments)
        for (var key in allcomments) {
            if (allcomments[key].id === post_id) {
                console.log('%c COMMENTS ARE FOR POST # ','color:blue; font-weight: bold;',post_id)
                comments = allcomments[key]
            }
        }

        return (
            <div className='post-container'>
                <div className='score-item'>
                    <ScoreItem
                        post = {post} 
                        key={post.id}
                        />
                </div>
                <div className="post-detail">
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                    <p>category: {post.category}</p>
                    <p>author: {post.author}</p>
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
                <div className='listcomments-container'>
                    <h2>comments</h2>
                    <ListComments
                        comments = {this.props.comments}
                        parentId = {post.id}
                        post = {post}
                        />
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
        posts: state.posts,
        comments: state.comments
    }
  }  
  
  function mapDispatchToProps (dispatch) {
    return {
      fetchCommentsDispatch: (post_id)=> dispatch(fetchCommentsAction({post_id})),
      deletePostDispatch: (data) => dispatch(deletePostAction(data)),
    }
  }
  
  export default withRouter (connect(
    mapStateToProps,
    mapDispatchToProps,
  )(FullPost))
