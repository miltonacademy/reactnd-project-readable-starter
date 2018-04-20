import React, { Component } from 'react'
import { connect } from 'react-redux'
import { voteUpAction, voteDownAction } from '../actions'

class ScoreItem extends Component {
    voteUp = (post) => {
        console.log('now voteUp for post ',post)
        this.props.upVoteDispatch(post.id)
    }

    voteDown = (post) => {
        console.log('now voteDown for post ',post)
        this.props.downVoteDispatch(post.id)
    }

    render(){
        const post = this.props.post
        return (
            <div>
                <button
                    className='icon-btn'
                    onClick={()=>this.voteUp(post)}>
                    upVote
                </button>
                <h3>score: {post.voteScore}</h3>
                <button
                    className='icon-btn'
                    onClick={()=>this.voteDown(post)}>
                    downVote
                </button>
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
        upVoteDispatch: (data) => {
            dispatch(voteUpAction(data))
            },
        downVoteDispatch: (data) => {
            dispatch(voteDownAction(data))
            },
        }
  }

  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ScoreItem)