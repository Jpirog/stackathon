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

      <div>Hello {this.props.user.name}
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
