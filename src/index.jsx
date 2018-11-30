import App from './App'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import ReacDOM from 'react-dom'
import React from 'react'
import createHistory from 'history/createBrowserHistory'
import getStore from './getStore'

const history = createHistory()
const store = getStore(history)

const fetchDataForLocation = () => {
  store.dispatch({ type: `REQUEST_FETCH_QUESTIONS` })
}

const render = (_App) => {
  ReacDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history} >
        <_App />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('AppContainer')
  )
}

// TODO: https://github.com/gaearon/react-hot-loader
if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default
    render(NextApp)
  })
}

// render(App)

store.subscribe(() => {
  const state = store.getState()
  if (state.questions.length > 0) {
    console.info('Mouinting app')
    render(App)
  } else {
    console.info('App not yet mounting')
  }
})


fetchDataForLocation()