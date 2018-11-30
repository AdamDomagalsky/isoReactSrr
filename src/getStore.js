import * as reducers from './reducers'

import { applyMiddleware, combineReducers, createStore } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'

import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import fetchQuestionSaga from './sagas/fetch-questions-saga'
import fetchQuestionsSaga from './sagas/fetch-question-saga'
import { identity } from 'lodash'

export default function (history, defaultState = {}) {
  const rMiddleware = routerMiddleware(history)
  const sagaMiddleware = createSagaMiddleware()
  const middlewareChain = [rMiddleware, sagaMiddleware]
  // if (process.env.NODE_ENV === 'development') {
  //   const logger = createLogger()
  //   middlewareChain.push(logger)
  // }

  const store = createStore(combineReducers({...reducers, router: connectRouter(history) }), defaultState, applyMiddleware(...middlewareChain))
  sagaMiddleware.run(fetchQuestionsSaga)
  sagaMiddleware.run(fetchQuestionSaga)

  return store
}
