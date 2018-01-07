import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from './stores'
import AsyncApp from './containers/AsyncApp'

ReactDOM.render(
  <Provider store={store}>
    <AsyncApp />
  </Provider>,
  document.getElementById('app')
)