import {
  REQUEST_POSTS,
  REQUEST_POSTS_RESOLVED,
  REQUEST_POSTS_REJECTED,
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT
} from '../constants'


export function requestPosts(payload) {
  return {
    type: REQUEST_POSTS,
    payload
  }
}

/**
 * [requestPostsResolved description]
 * @param  {[type]} payload [description]
 * {
 *   subreddit: '',
 *   promise: 'resolved',
 *   posts: [],
 *   updateAt: 0
 * }
 * @return {[type]}         [description]
 */
export function requestPostsResolved(payload) {
  return {
    type: REQUEST_POSTS_RESOLVED,
    payload
  }
}

/**
 * [requestPostsRejected description]
 * @param  {[type]} payload [description]
 * {
 *   subreddit: '',
 *   error: null
 * }
 * @return {[type]}         [description]
 */
export function requestPostsRejected(payload) {
  return {
    type: REQUEST_POSTS_RESOLVED,
    payload
  }
}

/**
 * [selectSubreddit description]
 * @param  {[type]} payload [description]
 * {
 *   subreddit: '',
 * }
 * @return {[type]}         [description]
 */
export function selectSubreddit(payload) {
  return {
    type: SELECT_SUBREDDIT,
    payload
  }
}

/**
 * [invalidateSubreddit description]
 * @param  {[type]} payload [description]
 * {
 *   subreddit: '',
 * }
 * @return {[type]}         [description]
 */
export function invalidateSubreddit(payload) {
  return {
    type: INVALIDATE_SUBREDDIT,
    payload
  }
}
