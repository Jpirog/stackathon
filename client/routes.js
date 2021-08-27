import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./components/Home";
import SendAlert from './components/SendAlert';
import ShowAlerts from './components/ShowAlerts';
import Login from './components/Login';

/**
 * COMPONENT
 */
class Routes extends Component {
  // componentDidMount() {
  //   this.props.loadInitialData();
  // }

  render() {

    return (
      <div>
        <Switch>
          <Route path="/" exact component={ Login } />
          <Route path="/home" component={ Home } />
          <Route path="/sendalert" component={ SendAlert } />
          <Route path="/showalerts" component={ ShowAlerts } />
        </Switch>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    //isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    // loadInitialData() {
    //   dispatch(me());
    // },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
