describe('The Question List Component',()=>{
  beforeEach(()=>{
    console.log('b4 each!');
  })
  beforeAll(()=>{
    console.log('b4 all!');
  })

  afterEach(()=>{
    console.log('after each!');
  })

  afterAll(()=>{
    console.log('after All!');
  })

  it('should display a list of items',()=>{
    expect(2+'2').toEqual('22')
  })

  it.skip('should be the meaning of life',()=>{
    expect(2+'2').toEqual('222')
  })
})

// .skip - test wont run ||
// .only - only this test will run >
// b4all afterall
// b4each aftereach