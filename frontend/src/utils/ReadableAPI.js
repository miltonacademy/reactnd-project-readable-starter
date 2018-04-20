const api = "http://localhost:3001"

let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

  const headers = {
    'Accept': 'application/json',
    'Authorization': token
  }

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const getPosts = () =>
    fetch(`${api}/posts`, { headers })
      .then(res => res.json())
      .then(posts => posts)

export const getComments = (post_id) => {
  console.log ('%c ReadableAPI getComments for post_id = %0','color:orange', post_id)
  return fetch(`${api}/posts/${post_id}/comments`, { headers })
  .then(res => res.json())
  .then(comments => comments)
}



export const deletePost = (post) =>
  fetch(`${api}/posts/${post}`, { method: 'DELETE', headers })
    .then(res => res.json())
    .then(data => data.post)

export const deleteComment = (comment) =>
  fetch(`${api}/comments/${comment}`, { method: 'DELETE', headers })
    .then(res => res.json())
    .then(data => data.post)    

export const editPost = (post) =>
  fetch(`${api}/posts/${post.id}`, { 
    method: 'PUT', 
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post) 
    })
    .then(res => res.json())
    .then(data => data.post)

export const editComment = (comment) =>
    fetch(`${api}/comments/${comment.id}`, { 
      method: 'PUT', 
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment) 
      })
      .then(res => res.json())
      .then(data => data.comment)

export const addNewPost = (post) =>
    fetch(`${api}/posts`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post)
    }).then(res => res.json())
      .catch(function(error) {
        console.log("Unable to add post: " + error);
      });    

export const voteUp = (post) =>
    {
      let upVotePayload = {option: 'upVote'}
      return fetch(`${api}/posts/${post}`, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(upVotePayload)
      }).then(res => res.json())
        //.then(something => console.log("**WOW** the VOTEUP result is %O", something))        
    }

export const voteDown = (post) =>
    {
      let downVotePayload = {option: 'downVote'}
      return fetch(`${api}/posts/${post}`, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(downVotePayload)
      }).then(res => res.json())
        //.then(something => console.log("**WOW** the VOTEUP result is %O", something))        
    }

export const addNewComment = (comment) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment)
  }).then(res => res.json())
    .catch(function(error) {
      console.log("Unable to add comment: " + error);
    });      
   
export const voteUpComment = (comment) =>
    {
      let upVotePayload = {option: 'upVote'}
      return fetch(`${api}/comments/${comment}`, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(upVotePayload)
      }).then(res => res.json())
        //.then(something => console.log("**WOW** the VOTEUP result is %O", something))        
    }    
export const voteDownComment = (comment) =>
    {
      let downVotePayload = {option: 'downVote'}
      return fetch(`${api}/comments/${comment}`, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(downVotePayload)
      }).then(res => res.json())
        //.then(something => console.log("**WOW** the VOTEUP result is %O", something))        
    }    