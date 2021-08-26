import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { getUser } from '../store/users';
import { getAlerts } from '../store/alerts';
import dateFormat from 'dateformat';
import ReactPaginate from "react-paginate";

class ShowAlerts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertsPerPage: 5,
      currentPage: 0,
    };
  }

  async componentDidMount() {
    await this.props.getUser('jpirog@hotmail.com');
    await this.props.getAlerts({ offset: 0, limit: this.state.alertsPerPage })
  }
  
  handlePageClick = async (data) => {
    const { selected } = data;
    const start = selected * this.state.alertsPerPage;
    await this.props.getAlerts({ offset: start, limit: this.state.alertsPerPage })
    this.setState({...this.state, currentPage: selected})
  }

  render(){
    if (!this.props.user || !this.props.alerts){
      return (<h1>Loading alerts...</h1>)
    }

    const eventTime = Date.now();
    const dateFmt = dateFormat(eventTime, "ddd, mmm d, yyyy");
    return (
      <div>
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount={Math.ceil(this.props.alertsCount / this.state.alertsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
        />
        <table>
          <thead>
            <tr>
              <th>Source</th>
              <th>Date/Time</th>
              <th>Description</th>
              <th>Appropriateness</th>
              <th>Sentiment</th>
            </tr>
            {this.props.alerts.map(c => 
              <tr key={c.id}>
                <td>{ c.source }</td>
                <td>{ dateFormat(c.timeReceived,'ddd, mmm d, yyyy, h:MM:ss TT')} </td>
                <td>{ c.description }</td>
                <td style={{whiteSpace: "pre-wrap"}}>{ JSON.stringify(c.appropriateness, null, 2 ) }</td>
                <td style={{whiteSpace: "pre-wrap"}}>{ JSON.stringify(c.sentiment, null, 2 ) }</td>
              </tr>
              )
            }
          </thead>
        </table>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    user: state.users.user,
    alerts: state.alerts.alerts,
    alertsCount: state.alerts.count
  };
};

const mapDispatchToProps = (dispatch) => {
  return ({
    getUser: (email) => dispatch(getUser(email)),
    getAlerts: (parms) => dispatch(getAlerts(parms)),
  })
};

export default withRouter(connect(mapState, mapDispatchToProps)(ShowAlerts));
