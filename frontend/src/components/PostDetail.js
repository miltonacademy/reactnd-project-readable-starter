import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import FullPost from './FullPost'

class PostDetail extends Component {

    render() {
        const posts = this.props.posts
        const post_id = this.props.match.params.post_id
        let post = {}
        let doesPostExist = false
        console.log('%c POSTDETAIL PROPS','color:red',this.props)
        console.log('%c POSTDETAIL PROPS MATCH PARAMS','color:blue; font-weight: bold;',this.props.match.params)
        for (var key in posts) {
            if (posts[key].id === post_id) {
                console.log('%c YOU ARE ON POST # ','color:green; font-weight: bold;',post_id)
                post = posts[key]
                doesPostExist = true
            }
        }
        if (doesPostExist===true) {
            return (
                <div>
                  <FullPost
                      post={post}
                      post_id = {post_id}
                      />
                </div>
              )
        } else {
            return (
                <div>
                  <h1>404</h1>
                  <p>The post you are looking for has been deleted or does not exist.
                      Click on the header to return to the homepage</p>
                </div>
              )
        }


    }
}

function mapStateToProps (state) {
    return {
        posts: state.posts,
    }
  }  
  
  function mapDispatchToProps (dispatch) {
    return {
    //   deletePostDispatch: (data) => dispatch(deletePostAction(data)),
    //   fetchPostsDispatch: ()=> dispatch(fetchPostsAction())
    }
  }

export default withRouter (connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PostDetail))