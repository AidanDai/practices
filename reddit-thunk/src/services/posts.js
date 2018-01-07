import fetch from 'isomorphic-fetch'
import { requestPosts, requestPostsResolved, requestPostsRejected } from '../actions'

export function getPosts(subreddit) {
	return (dispatch) => {
    dispatch(requestPosts({ subreddit: subreddit }))

    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then(json => {
        dispatch(requestPostsResolved({
          subreddit: subreddit,
          promise: 'resolved',
          posts: json.data.children.map(child => child.data),
          updateAt: Date.now()
        }))
      })
      .catch(error => {
        dispatch({
          subreddit: subreddit,
          promise: 'rejected',
          error: error
        })
      })
  }
}
