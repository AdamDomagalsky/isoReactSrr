import * as reducers from './reducers'

import { applyMiddleware, combineReducers, createStore } from 'redux'

import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import fetchQuestionsSaga from './sagas/fetch-questions.saga'
import { identity } from 'lodash'

export default function (defaultState) {
  const sagaMiddleware = createSagaMiddleware()
  const middlewareChain = [sagaMiddleware]
  if (process.env.NODE_ENV === 'development') {
    const logger = createLogger()
    middlewareChain.push(logger)
  }

  const store = createStore(combineReducers({...reducers}), defaultState, applyMiddleware(...middlewareChain))
  sagaMiddleware.run(fetchQuestionsSaga)

  return store
}
