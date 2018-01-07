import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import combined from '../reducers'

const loggerMiddleware = createLogger()

function reduxStore(state = {}) {
  const loggerMiddleware = createLogger()
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const store = createStore(
    combined,
    state,
    composeEnhancers(applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )),
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
  )

  return store
}

export default reduxStore()
