import { combineReducers } from 'redux'

import {
  REQUEST_POSTS,
  REQUEST_POSTS_RESOLVED,
  REQUEST_POSTS_REJECTED,
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT
} from '../constants'

const initialSubreddit = 'all'

function selectedSubreddit(state = initialSubreddit, action) {
  switch(action.type) {
    case SELECT_SUBREDDIT:
      return action.payload.subreddit
    default:
      return state
  }
}

const initialReceivedPost = {
  promise: 'pending',
  didInvalidate: false,
  posts: []
}

function receivedPosts(state = initialReceivedPost, action) {
  switch (action.type) {
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        promise: 'pending'
      })
    case REQUEST_POSTS_RESOLVED:
      return Object.assign({}, state, {
        promise: 'resolved',
        posts: action.payload.posts,
        updatedAt: Date.now()
      })
    case REQUEST_POSTS_REJECTED:
      return Object.assign({}, state, {
        promise: 'rejected'
      })
    case INVALIDATE_SUBREDDIT:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    default:
      return state
  }
}

function postsBySubreddit(state = {}, action) {
  switch (action.type) {
    case REQUEST_POSTS:
    case REQUEST_POSTS_RESOLVED:
    case REQUEST_POSTS_REJECTED:
    case INVALIDATE_SUBREDDIT:
      return Object.assign({}, state, {
        [action.payload.subreddit]: receivedPosts(state[action.payload.subreddit], action)
      })
    default:
      return state
  }
}

const reducers = {
  postsBySubreddit: postsBySubreddit,
  selectedSubreddit: selectedSubreddit
}

const combined = combineReducers(reducers)

module.exports = combined
