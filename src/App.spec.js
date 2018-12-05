const delay2 = (ms) => new Promise(resolve => setTimeout(resolve, ms))

import delay from 'redux-saga'

it('async test1', done =>{
  setTimeout(done,100)
})

it('async test2', () =>{
  return new Promise(resolve=> setTimeout(resolve,100))
})

it('async test3', async () => {
  await delay(100)
})