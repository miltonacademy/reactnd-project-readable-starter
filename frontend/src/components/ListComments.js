import React, { Component } from 'react'
//import ScoreItem from './ScoreItem'
import ShowComment from './ShowComment'
import AddNewComment from './AddNewComment'
import Modal from 'react-modal'

class ListComments extends Component {
    state = {
        addCommentModalOpen : false,
    }

    openAddCommentModal = () => {
        this.setState(() => ({
            addCommentModalOpen : true,
        }))
    }

    closeAddCommentModal = () => {
        this.setState(() => ({
            addCommentModalOpen: false,
        }))
    }

    render() {
        const comments = this.props.comments
        const { addCommentModalOpen } = this.state

        return (
            <div className='post-container'>
                    <button
                        className='icon-btn'
                        onClick={()=>this.openAddCommentModal()}>
                        ADD NEW COMMENT
                    </button>
                {Object.keys(comments).map(key => (
                    <div key={comments[key].id} className='preview-post-container'>
                        <ShowComment
                            comment = {comments[key]} 
                            key={comments[key].id}
                            />
                    </div>
                ))} 

                <Modal
                className='modal'
                overlayClassName='overlay'
                isOpen={addCommentModalOpen}
                onRequestClose={this.closeAddCommentModal}
                contentLabel='Modal'
                >
                    <AddNewComment
                        closeAddCommentModal={this.closeAddCommentModal}
                        parentId={this.props.parentId}
                        post = {this.props.post}
                        />
                </Modal>     

            </div>
        )
    }
}

export default ListComments
