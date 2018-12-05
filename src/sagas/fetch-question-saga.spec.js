import fetch from 'isomorphic-fetch'
import { handleFetchQuestion } from './fetch-question-saga'

describe('Fetch questions saga',()=>{

  beforeAll(()=>{
    fetch.__setValue([{question_id:32}])
  })

  it('should fetch the questions from stack', async ()=>{
    console.log('Test Runing');
    const gen = handleFetchQuestion({question_id:32})
    const { value } = await gen.next()
    expect(value).toEqual([{question_id:32}])
    expect(fetch).toHaveBeenLastCalledWith('/api/questions/32')
  })
})