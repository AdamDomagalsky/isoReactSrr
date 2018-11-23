import React from 'react'
import TagsList from './TagsList'
import { connect } from 'react-redux'

const QuestionListItem = ({ title, tags }) => (
  <div>
    <h3>{title}</h3>
    <TagsList tags={tags} />
  </div>
)


const QuestionList = ({ questions }) => (
  <div>
    {questions && questions.length ?
      <div>
        {questions.map(question => <QuestionListItem key={question.question_id} {...question} />)}
      </div>
      :
      <div>
        ... Loading questions ...
    </div>
    }
  </div>
)

const mapStateToProps = ({ questions }) => ({
  questions
})

export default connect(mapStateToProps)(QuestionList)

