import App from './App'
import { Provider } from 'react-redux'
import ReacDOM from 'react-dom'
import React from 'react'
import getStore from './getStore'

const store = getStore()

const fetchDataForLocation = () => {
  store.dispatch({ type: `REQUEST_FETCH_QUESTIONS` })
}

const render = (_App) => {
  ReacDOM.render(
    <Provider store={store}>
      <_App />
    </Provider>,
    document.getElementById('AppContainer')
  )
}

render(App)
fetchDataForLocation()