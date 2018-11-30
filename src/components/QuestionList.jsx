import PropTypes from 'prop-types';
import QuestionListItem from './QuestionListItem'
import React from 'react'
import { connect } from 'react-redux'

const QuestionList = ({ questions }) =>
  (
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

QuestionList.propTypes = {
  questions: PropTypes.array.isRequired,
}

const mapStateToProps = ({ questions }) => ({
  questions
})

export default connect(mapStateToProps)(QuestionList)
