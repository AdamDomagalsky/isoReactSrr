'use strict'

import {
  MuiThemeProvider,
  createGenerateClassName,
  createMuiTheme,
} from '@material-ui/core/styles'
import { question, questions } from '../data/api-real-url'

import App from '../src/App' // Fronend part in backend :D
import { ConnectedRouter } from 'connected-react-router'
import JssProvider from 'react-jss/lib/JssProvider' // material UI ssr
import { Provider } from 'react-redux' // Fronend part in backend :D
import React from 'react' // Fronend part in backend :D
import ReactDOMServer from 'react-dom/server' // Fronend part in backend :D
import { SheetsRegistry } from 'jss' // css in js for mui
import bodyParser from 'body-parser'
import createHistory from 'history/createMemoryHistory'
import express from 'express'
import fetch from 'node-fetch'
import fs from 'fs-extra'
import getStore from '../src/getStore' // Fronend part in backend :D
import green from '@material-ui/core/colors/green';
import path from 'path'
import purple from '@material-ui/core/colors/purple';
import { theme } from '../src/withRoot' // mui shared theme with frontend
import webpack from 'webpack'

// const bodyParser = require('body-parser')


const port = process.env.PORT || 3000
const app = express();
app.use(bodyParser.json())

const mockDelay = (ms) => new Promise((resolve) => setTimeout(() => resolve(`mockDelay(${ms})`), ms))

// Flag to use Live data from stackexchange API --useLiveData
const useLiveData = process.argv.includes('--useLiveData')
// SSR flag
const useServerRender = process.argv.includes('--useServerRender')

if (process.env.NODE_ENV == 'development') {
  const config = require('../webpack.config.dev.babel').default
  const compiler = webpack(config)

  app.use(require('webpack-dev-middleware')(compiler, {
    logLevel: 'warn',
  }))

  app.use(require('webpack-hot-middleware')(compiler))
} else {
  app.use(express.static(path.resolve(__dirname, '../dist')))
}

app.use

// Api fetching
async function getQuestions() {
  let data;
  if (useLiveData) {
    data = await fetch(questions).then(res => res.json())
    // console.log(data);
    return data
  } else {
    data = await fs.readFile('./data/mock-questions.json')
    // console.log(JSON.parse(data));
    return JSON.parse(data)
  }
}

async function getQuestion(question_id) {

  let data;
  if (useLiveData) {
    data = await fetch(question(question_id)).then(res => res.json())

    return data
  } else {
    let questions = await getQuestions()
    let question = questions.items.find(_question => _question.question_id == question_id)

    question.body = `Mock question body: ${question_id}`
    data = { items: [question] }

    return data
  }
}

// ACRA android test
let toReturn = { this: 'empty' };
app.post('/api/acra', async (req, res) => {
  // console.log(req.body) // populated!
  toReturn = req.body
  console.log(req.headers.authorization);
  res.json(toReturn)
})

app.get('/api/acra', async (req, res) => {
  // console.log(toReturn) // populated!

  res.json(toReturn)
})


app.get('/api/questions', async (req, res) => {
  const data = await getQuestions()
  await mockDelay(150)
  res.json(data)
})

app.get('/api/questions/:id', async (req, res) => {
  const data = await getQuestion(req.params.id)
  await mockDelay(150)
  res.json(data)
})

app.get(['/', '/questions/:id'], async (req, res) => {
  let index = await fs.readFile('./public/index.html', 'utf-8')

  // SSR check
  if (useServerRender) {
    // Store init
    const initialState = {
      questions: []
    }

    const history = createHistory({
      initialEntries: [req.path],
    })

    const question_id = req.params.id
    if (question_id) {
      const response = await getQuestion(question_id)
      const questionDetails = response.items[0]

      initialState.questions = [{ ...questionDetails, question_id }]
    } else {
      const questions = await getQuestions();

      initialState.questions = questions.items
    }


    const store = getStore(history, initialState)

    // Material UI
    // Create a sheetsRegistry instance.
    const sheetsRegistry = new SheetsRegistry();
    // Create a sheetsManager instance.
    const sheetsManager = new Map();
    // Css-in-js Create a new class name generator.
    const generateClassName = createGenerateClassName();

    const appRendered = ReactDOMServer.renderToString(
      <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
          <Provider store={store}>
            <ConnectedRouter history={history}>
              <App />
            </ConnectedRouter>
          </Provider>
        </MuiThemeProvider>
      </JssProvider>
    )

    index = index.replace('<%= preloadApplication %>', appRendered)
    // IMPORTANT! make it after ReactDOMServer.renderToString
    // Grab the CSS from our sheetsRegistry.
    const css = sheetsRegistry.toString()
    index = index.replace('<%= preloadCSSApplication %>', `<style id="jss-server-side">${css}</style>`)
    index = index.replace('<%= preloadBundleApplication %>', `<script type="text/babel" src="./bundle.js"></script>`)
  } else {
    index = index.replace('<%= preloadApplication %>', 'Plz w8 coz app is loading...')
    index = index.replace('<%= preloadCSSApplication %>', 'Plz w8 coz muiCSS is loading...')
    index = index.replace('<%= preloadBundleApplication %>', '<script src="./bundle.js"></script>')
  }

  res.send(index)
})


app.listen(port, '0.0.0.0', () => console.info(`App listeining on ${port}`))
