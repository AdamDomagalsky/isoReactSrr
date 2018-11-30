import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import React from 'react'
import TagsList from './TagsList'
import { withStyles } from '@material-ui/core/styles';

const styles = {
  button: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
  },
}

const QuestionListItem = ({ classes, title, tags, question_id }) =>
  (
    <div>
      <h3>{title}</h3>
      <TagsList tags={tags} />
      <Button className={classes.button} component={Link} to={`/questions/${question_id}`} >
        More Info!
    </Button>
    </div>
  )

QuestionListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  question_id: PropTypes.number.isRequired,
}

export default withStyles(styles)(QuestionListItem)