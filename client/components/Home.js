import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { getUser } from '../store/users';

export class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    await this.props.getUser('jpirog@hotmail.com');
  }
  render() {
    if (!this.props.user){
      return (<h1>LOADING</h1>)
    }
    return (

      <div>
        <img id="menuimg" src="https://wgntv.com/wp-content/uploads/sites/5/2017/05/metra.jpeg?strip=1" />
        <div id="menutitle">#ALERT!</div>
        <div id="menuform"><p id="menuhead">Hello {this.props.user.name}</p>
        <ol>
          <li><Link to="/sendalert">Report an incident</Link></li>
          <li><Link to="/showalerts">View incidents</Link></li>
          <li><Link to="/">Edit profile</Link></li>
          <li><Link to="/">Logout</Link></li>
        </ol>
        </div>
      </div>
    )
  }
}
const mapState = (state) => {
  return {
    user: state.users.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return ({
    getUser: (email) => dispatch(getUser(email)),
  })
};
export default withRouter(connect(mapState, mapDispatchToProps)(Home));
