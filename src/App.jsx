import "regenerator-runtime/runtime";

import Grid from '@material-ui/core/Grid';
import QuestionList from './components/QuestionList';
import React from 'react'
import { connect } from 'react-redux'
// material-ui
import withRoot from './withRoot'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    textAlign: 'left',
    paddingLeft: theme.spacing.unit * 20,
  },
});

const AppDisplay = ({ test, classes }) =>
  <Grid className={classes.root}>
    <h1>Iso React {test}</h1>
    <QuestionList />
  </Grid>

const mapStateToProps = (state, ownProps) => {
  return {
    ...state
  }
}

// export default AppDisplay
// export default connect(mapStateToProps)(AppDisplay)

export default withRoot(withStyles(styles)(connect(mapStateToProps)(AppDisplay)))
