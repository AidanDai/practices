import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { selectSubreddit, invalidateSubreddit } from '../actions'
import { getPosts } from '../services/posts'
import Picker from '../components/Picker'
import Posts from '../components/Posts'

class AsyncApp extends Component {

  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props

    dispatch(getPosts(selectedSubreddit))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedSubreddit !== this.props.selectedSubreddit) {
      const { dispatch, selectedSubreddit } = nextProps

      dispatch(getPosts(selectedSubreddit))
    }
  }

  handleChange(nextSubreddit) {
    this.props.dispatch(selectSubreddit({ subreddit: nextSubreddit }))
  }

  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch, selectedSubreddit } = this.props

    dispatch(invalidateSubreddit({ subreddit: selectedSubreddit }))
    dispatch(getPosts(selectedSubreddit))
  }

  render() {
    const { selectedSubreddit, posts, promise, updatedAt } = this.props

    return (
      <div>
        <Picker value={selectedSubreddit}
          onChange={this.handleChange}
          options={[ 'all', 'funny', 'videos', 'pics', 'gifs', 'gaming', 'Music', 'Music', 'Music' ]}
        />
        <p>
          {
            updatedAt &&
            <span>
              Last updated at {new Date(updatedAt).toLocaleTimeString()}. {' '}
            </span>
          }
          {
            promise !== 'pending' &&
            <a href='#'
              onClick={this.handleRefreshClick}
            >
              Refresh
            </a>
          }
        </p>
        {
          promise === 'pending' && posts.length === 0 && <h2>Loading...</h2>
        }
        {
          promise === 'rejected' && posts.length === 0 && <h2>Empty. Fetch is rejected!</h2>
        }
        {
          posts.length > 0 &&
          <div style={{ opacity: promise === 'pending' ? 0.5 : 1 }}>
            <Posts posts={posts} />
          </div>
        }
      </div>
    )
  }
}

AsyncApp.propTypes = {
  selectedSubreddit: PropTypes.string.isRequired,
  promise: PropTypes.string.isRequired,
  updatedAt: PropTypes.number,
  posts: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectedSubreddit, postsBySubreddit } = state
  const {
    promise,
    posts: posts,
    updatedAt
  } = postsBySubreddit[selectedSubreddit] || { promise: 'pending', posts: [], updatedAt: 0 }

  return {
    selectedSubreddit,
    promise,
    updatedAt,
    posts
  }
}

export default connect(mapStateToProps)(AsyncApp)
