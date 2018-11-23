import Chip from '@material-ui/core/Chip'
import List from '@material-ui/core/List';
import PropTypes from 'prop-types'
import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit,
  },
});

const TagsList = ({ tags, classes }) => (
  <List>
    {tags.map(tag => <Chip
      key={tag}
      label={tag}
      className={classes.chip}
      component="a"
      href="#chip"
      clickable />
    )}
  </List>
)

TagsList.propTypes = {
  classes: PropTypes.object.isRequired,
  tags: PropTypes.array.isRequired,
};

export default withStyles(styles)(TagsList)