import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

export class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  // async componentDidMount() {
  //   await this.props.getProducts();
  // }
  render() {


    return (
      <div>Hello World</div>
    )
  }
}
const mapState = (state, ownProps) => {
  return {
    // username: state.auth.username,
    // products: state.products.filter((product) => product.isFeatured),
  };
};
const mapDispatchToProps = {
//  getProducts,
};
export default withRouter(connect(mapState, mapDispatchToProps)(Home));
