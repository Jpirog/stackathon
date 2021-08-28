import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

export class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit(ev){
    ev.preventDefault();
    this.props.history.push('/home/');
  }

  render() {
    return (
      <div>
        <img id="loginimg" src="https://wgntv.com/wp-content/uploads/sites/5/2017/05/metra.jpeg?strip=1" />
        <div id="logintitle">#ALERT!</div>
        <div id="loginform"><p id="loginhead">Please enter your login credentials</p>
          <form onSubmit={this.handleSubmit} >
            <div className="formfield">
              <label htmlFor="username">User name:</label><br/>
              <input name="username" type="text" autoFocus/>
            </div>
            <div className="formfield">
              <label htmlFor="password">Password:</label><br/>
              <input name="password" type="password" />
            </div>
            <Link to="/home/">
              <button name="submit" type="submit">Submit</button>
            </Link>
          </form>
        </div>
      </div>    
    )
  }
}

const mapState = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return ({
  })
};

export default withRouter(connect(mapState, mapDispatchToProps)(Login));
