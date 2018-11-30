import 'regenerator-runtime/runtime'

import { Button, Grid } from '@material-ui/core'
import { Link, Route, Switch } from 'react-router-dom'

import QuestionDetail from './components/QuestionDetail'
import QuestionList from './components/QuestionList'
import React from 'react'
import { connect } from 'react-redux'
// material-ui
import { withRoot } from './withRoot'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    textAlign: 'left',
    paddingLeft: theme.spacing.unit * 20,
  },
  homePageButton: {
    variant: 'outlined',
    size: 'medium',
    color: 'primary',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  }
});

const AppDisplay = ({ classes }) =>
  <Grid className={classes.root}>
    <Button component={Link} to="/" className={classes.homePageButton} >
      Iso React
    </Button>
    <Switch>
      <Route exact path="/" render={() => <QuestionList />} />
      <Route exact path="/questions/:id" render={({ match }) => <QuestionDetail question_id={match.params.id} />} />
      <Route render={() => (<div>Not Found Page</div>)} />
    </Switch>
  </Grid>

const mapStateToProps = (state, ownProps) => {
  return {
    ...state
  }
}

export default withRoot(withStyles(styles)(connect(mapStateToProps)(AppDisplay)))