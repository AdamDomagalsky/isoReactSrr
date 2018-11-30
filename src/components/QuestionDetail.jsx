import Markdown from 'react-markdown/with-html'
import PropTypes from 'prop-types';
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

// QuestionDetailDisplay.propTypes = {
//   questions: PropTypes.array.isRequired,
//   title: PropTypes.string.isRequired,
//   body: PropTypes.object.isRequired,
//   answer_count: PropTypes.number.isRequired,
//   tags: PropTypes.string.isRequired,
// }

const mapStateToProps = (state, ownProps) => ({
  ...state.questions.find(({ question_id }) => question_id == ownProps.question_id)
})

export default connect(mapStateToProps)(QuestionDetailDisplay)