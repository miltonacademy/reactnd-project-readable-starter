import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { connect } from 'react-redux'
import { deletePostAction, fetchPostsAction } from '../actions'
import ListPosts from './ListPosts'
import PostDetail from './PostDetail'
import { Route, withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

class App extends Component {

  componentDidMount(){
    this.fetchPosts()
  }
  
  fetchPosts = () => {
    this.props.fetchPostsDispatch()
    console.log('state after fetchPostsDispatch is ',this.state)
  }

  render() {
    const posts = this.props.posts
    const sortValue = this.props.sortValue

    return (
      <div className="App">
      <Link
          to="/"
          className="header-nav"
          >
       <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Readable</h1>
        </header>
        </Link>
        <Route exact path="/" render={()=> (
          <ListPosts
            posts={posts}
            
            sortValue={sortValue}
            />
        )}/> 
        <Route name="ListPosts" exact path="/:category/" render={()=> (
          <ListPosts
            posts={posts}
            sortValue={sortValue}
            />
        )}/> 
        <Route name="postDetail" exact path="/:category/:post_id" render={()=> (
          <PostDetail
            posts={posts}
            />
        )}/> 
      </div>
    );
  }
}


function mapStateToProps (state) {
  return {
      posts: state.posts,
  }
}  

function mapDispatchToProps (dispatch) {
  return {
    deletePostDispatch: (data) => dispatch(deletePostAction(data)),
    fetchPostsDispatch: ()=> dispatch(fetchPostsAction())
  }
}

export default withRouter (connect(
  mapStateToProps,
  mapDispatchToProps,
)(App))

