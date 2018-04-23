import React, { Component } from 'react'
import PreviewPost from './PreviewPost'
import AddNewPost from './AddNewPost'
import Modal from 'react-modal'
import sortBy from 'sort-by'
import { sortByScoreAction, sortByDateAction } from '../actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

class ListPosts extends Component {
    state = {
        addPostModalOpen : false,
    }

    sortByScore = (sortByParameter) => {
        this.props.sortByScoreDispatch(sortByParameter)
    }

    sortByDate = (sortByParameter) => {
        console.log("HELOOOOOOO DOUGIE")
        this.props.sortByDateDispatch(sortByParameter)
    }

    openAddPostModal = () => {
        this.setState(() => ({
            addPostModalOpen : true,
        }))
    }

    closeAddPostModal = () => {
        this.setState(() => ({
            addPostModalOpen: false,
        }))
    }

    render(){
        const posts = this.props.posts
        const posts_category = this.props.match.params.category
        const sortingParamVar = this.props.sortValue.sortByParameter
        const { addPostModalOpen } = this.state
        let postsFilteredByCategory = posts
        //console.log('%c YOU ARE ON POST CATEGORY ### ','color:green; font-weight: bold;',posts_category)
        if (posts_category !== undefined){
            postsFilteredByCategory = {}
            for (var key in posts) {
                if (posts[key].category === posts_category) {
                    console.log('%c YOU ARE ON POST CATEGORY ### ','color:green; font-weight: bold;',posts_category)
                    //postsFilteredByCategory = postsFilteredByCategory.concat(posts[key])
                    postsFilteredByCategory[key] = posts[key]
                    console.log('%c postsFilteredByCategory IS ','color:green; font-weight: bold;',postsFilteredByCategory)
                }
            }
        } else {
            postsFilteredByCategory = posts
        }


        var postsToSort = Object.values(postsFilteredByCategory)
        let sortedPosts = postsToSort.sort(sortBy(sortingParamVar))

        return (
            <div>

                <button
                        className='icon-btn'
                        onClick={()=>this.sortByScore('-voteScore')}>
                        SORT BY HIGH SCORE
                    </button>
                    <button
                        className='icon-btn'
                        onClick={()=>this.sortByScore('voteScore')}>
                        SORT BY LOW SCORE
                    </button>    
                
                    <button
                        className='icon-btn'
                        onClick={()=>this.sortByDate('-timestamp')}>
                        SORT BY NEWEST
                    </button>
                    <button
                        className='icon-btn'
                        onClick={()=>this.sortByDate('timestamp')}>
                        SORT BY OLDEST
                    </button>    
                <p>&nbsp;</p>
                <strong>Categories:&nbsp;&nbsp;</strong>
                <Link
                    to="/react/"
                    className="add-contact"
                    >
                <button
                    className='icon-btn'
                    >
                    REACT
                </button>    
                </Link>
                <Link
                    to="/redux/"
                    className="add-contact"
                    >
                <button
                    className='icon-btn'
                    >
                    REDUX
                </button>    
                </Link>
                <Link
                    to="/udacity/"
                    className="add-contact"
                    >
                <button
                    className='icon-btn'
                    >
                    UDACITY
                </button>    
                </Link>
                <p>&nbsp;</p>
                <button
                        className='icon-btn'
                        onClick={()=>this.openAddPostModal()}>
                        ADD NEW POST
                    </button>
                {Object.keys(sortedPosts).map(key => (
                    <div key={sortedPosts[key].id} className='preview-post-container'>
                        <PreviewPost 
                            post = {sortedPosts[key]} 
                            key={sortedPosts[key].id}
                            />
                    </div>
                ))} 

                <Modal
                className='modal'
                overlayClassName='overlay'
                isOpen={addPostModalOpen}
                onRequestClose={this.closeAddPostModal}
                contentLabel='Modal'
                >
                    <AddNewPost
                        closeAddPostModal={this.closeAddPostModal}
                        />
                </Modal>     
                
                
            </div>
            
        )
    }
}

function mapStateToProps (state) {
    return {
        posts: state.posts,
        sortValue: state.sortValue
    }
  }  

function mapDispatchToProps (dispatch) {
    return {
        sortByScoreDispatch: (data) => dispatch(sortByScoreAction(data)),
        sortByDateDispatch: (data) => dispatch(sortByDateAction(data)),
    }
  }


  export default withRouter (connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ListPosts))  