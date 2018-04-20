import React, { Component } from 'react'
import { connect } from 'react-redux'
import { voteUpCommentAction, voteDownCommentAction } from '../actions'

class ScoreComment extends Component {
    voteUpComment = (comment) => {
        console.log('now voteUp for comment ',comment)
        this.props.upVoteCommentDispatch(comment.id)
    }

    voteDownComment = (comment) => {
        console.log('now voteDownComment for comment ',comment)
        this.props.downVoteCommentDispatch(comment.id)
    }

    render(){
        const comment = this.props.comment
        console.log('!@*&#^% comment in ScoreComment component is',comment)
        return (
            <div>
                <button
                    className='icon-btn'
                    onClick={()=>this.voteUpComment(comment)}>
                    upVote
                </button>
                <h3>score: {comment.voteScore}</h3>
                <button
                    className='icon-btn'
                    onClick={()=>this.voteDownComment(comment)}>
                    downVote
                </button>
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
        upVoteCommentDispatch: (data) => {
            dispatch(voteUpCommentAction(data))
            },
        downVoteCommentDispatch: (data) => {
            dispatch(voteDownCommentAction(data))
            },
        }
  }

  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ScoreComment)