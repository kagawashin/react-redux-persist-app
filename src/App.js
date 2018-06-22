import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'

import logo from './logo.svg';
import './App.css';

const styles = theme = {
  contents: {
    position: "fixed",
    top: 56,
    bottom: 0,
    left: 0,
    width: "100%"
  },
  scrollable: {
    height: "100%",
    width: "100%",
    overflow: "scroll",
    WebkitOverflowScrolling: "touch",
  },
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <div className={classes.contents}>
          <div className={classes.scrollable}>
            <MyRoutes/>
          </div>
          <ReLoginDialog
              open={this.props.validToken===false}
          />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(App)
