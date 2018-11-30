import Markdown from 'react-markdown'
import React from 'react'
import TagsList, { } from './TagsList';
import { connect } from 'react-redux'

const QuestionDetailDisplay = ({ title, body, answer_count, tags }) => (
  <div>
    <h3>
      {title}
    </h3>
    {body ?
      <div>
        <div>
          <TagsList tags={tags} />

        </div>
        <div>
          <Markdown source={body} />
        </div>
        <div>
          {answer_count} Answers
        </div>
      </div>
      :
      <div>
        ... Loading Questions
      </div>
    }
  </div>
)

const mapStateToProps = (state, ownProps) => ({
  ...state.questions.find(({ question_id }) => question_id == ownProps.question_id)
})

export default connect(mapStateToProps)(QuestionDetailDisplay)