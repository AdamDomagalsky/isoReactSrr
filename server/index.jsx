'use strict'

import express from 'express'
import fs from 'fs-extra'
import webpack from 'webpack'
import yields from 'express-yields'

const port = process.env.PORT || 2999
const app = express();

const useLiveData = process.argv.includes('--useLiveData')
console.log(useLiveData);
function* getQuestions() {
  let data
  if (useLiveData) {
    data = yield
  } else {
    data = yield fs.readFile('./data/mock-questions.json', 'utf-8')
  }
}



if (process.env.NODE_ENV == 'development') {
  const config = require('../webpack.config.dev.babel').default
  const compiler = webpack(config)

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
  }))

  app.use(require('webpack-hot-middleware')(compiler))

}

app.get(['/'], function* (req, res) {
  let index = yield fs.readFile('./public/index.html', 'utf-8')
  res.send(index)
})

app.listen(port, '0.0.0.0', () => console.info(`App listeining on ${port}`))
