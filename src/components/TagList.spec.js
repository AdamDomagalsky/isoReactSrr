import React from 'react'
import TagsList from './TagsList'
import renderer from 'react-test-renderer'

describe('The tag list',()=>{
  it('renders as expected',()=>{
    const tree = renderer
      .create(<TagsList tags={['css','html','go']} />)
      .toJSON();

      console.log(tree)
      expect(tree).toMatchSnapshot()
  })
})
