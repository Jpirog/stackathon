import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./components/Home";
import SendAlert from './components/SendAlert';
import ShowAlerts from './components/ShowAlerts';
import Login from './components/Login';

class Routes extends Component {

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

const mapState = (state) => {
  return {
  };
};

const mapDispatch = (dispatch) => {
  return {
  };
};

export default withRouter(connect(mapState, mapDispatch)(Routes));
