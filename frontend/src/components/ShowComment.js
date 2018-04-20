import React, { Component } from 'react'
import ScoreComment from './ScoreComment'
import Modal from 'react-modal'
import EditComment from './EditComment'
import { deleteCommentAction } from '../actions'
import { connect } from 'react-redux'

class ShowComment extends Component {
    state = {
        editCommentModalOpen : false,
    }

    openEditCommentModal = ({ comment }) => {
        this.setState(() => ({
            editCommentModalOpen : true,
            comment
        }))
      }

    closeEditCommentModal = () => {
        this.setState(() => ({
            editCommentModalOpen: false,
        }))
    }

    deleteComment = (comment) => {
        console.log('now deleting comment ID',comment.id)
        this.props.deleteCommentDispatch(comment.id)
    }

    render() {
        const comment = this.props.comment
        const { editCommentModalOpen } = this.state
 
        return (
            <div className='preview-comment-container'>
                <div className='score-item'>
                    <ScoreComment
                        comment = {comment} 
                        key={comment.id}
                        />
                </div>
                <div className="comment-detail">
                    <p>{comment.body}</p>
                    <p>author: {comment.author}</p>
                    <button
                        className='icon-btn'
                        onClick={()=>this.openEditCommentModal({comment})}>
                        EDIT
                    </button>
                    <button
                        className='icon-btn'
                        onClick={()=>this.deleteComment(comment)}>
                        DELETE
                    </button>
                </div>
                <Modal
                    className='modal'
                    overlayClassName='overlay'
                    isOpen={editCommentModalOpen}
                    onRequestClose={this.closeEditCommentModal}
                    contentLabel='Modal'
                >
                    <EditComment
                        comment= {comment}
                        key={comment.id}
                        closeEditCommentModal={this.closeEditCommentModal}
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
        deleteCommentDispatch: (data) => dispatch(deleteCommentAction(data)),
    }
  }

export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ShowComment)
