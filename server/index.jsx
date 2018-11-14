'use strict'

import { question, questions } from "../data/api-real-url";

import express from 'express'
import fetch from 'node-fetch'
import fs from 'fs-extra'
import webpack from 'webpack'

const port = process.env.PORT || 2999
const app = express();

const mockDelay = (ms) => new Promise((resolve) => setTimeout(() => resolve(`mockDelay(${ms})`), ms))

// Flag to use Live data from stackexchange API --useLiveData
const useLiveData = process.argv.includes('--useLiveData')

if (process.env.NODE_ENV == 'development') {
  const config = require('../webpack.config.dev.babel').default
  const compiler = webpack(config)

  app.use(require('webpack-dev-middleware')(compiler, {
    logLevel: 'warn',
  }))

  app.use(require('webpack-hot-middleware')(compiler))

}

async function getQuestions() {
  let data;
  if (useLiveData) {
    data = await fetch(questions).then(res => res.json())

    return data
  } else {
    data = await fs.readFile('./data/mock-questions.json')

    return JSON.parse(data)
  }
}

async function getQuestion(question_id) {
  let data;
  if (useLiveData) {
    data = await fetch(question(question_id)).then(res => res.json())

    return data
  } else {
    const questions = await getQuestions()
    const question = questions.items.find(_question => _question.question_id == question_id)
    question.body = `Mock question body: ${question_id}`
    data = { items: [question] }

    return data
  }
}

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



app.get(['/'], async (req, res) => {
  let index = await fs.readFile('./public/index.html', 'utf-8')
  res.send(index)
})


app.listen(port, '0.0.0.0', () => console.info(`App listeining on ${port}`))
