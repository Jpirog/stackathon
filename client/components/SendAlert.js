import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { getUser } from '../store/users';
import { addAlert } from '../store/alerts';
import dateFormat from 'dateformat';


class SendAlert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: "",
      message: "message area (if needed)",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentDidMount() {
    await this.props.getUser('jpirog@hotmail.com');
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    console.log('1',ev.target.alert.value)
    console.log('2',ev.target.trainline.value)
    console.log('3',ev.target.followstandards.checked)
    const eventTime = Date.now();
    const dateFmt = dateFormat(eventTime, "ddd, mmm d, yyyy");

    this.props.addAlert({
      timeReceived: eventTime,
      source: 'WEBSITE',
      sourceId: this.props.user.email,
      description: `${ev.target.trainline.value} - ${dateFmt}: ${ev.target.alert.value}`,
    })
  }
  handleChange(ev) {
    let { name, value, type } = ev.target;
    if (type === "select-one") {
      name = "state";
    }
    switch (name) {
      case "alert":
        if (ev.target.value.length > 128) return;
        break;
    }
    this.setState(
      Object.assign({}, this.state, { [name]: value }, { enableSave: false })
    );
  }
  render(){
    if (!this.props.user){
      return (<h1>LOADING</h1>)
    }
  return (
    <div>
      <h1>Submit an Alert</h1>
      <h3>Thank you for notifying potential passengers about issues along the train line.</h3>
      <h4>Please be sure to follow the rules of conduct:</h4>
      <ul>
        <li>Please no inappropriate language in the message</li>
        <li>Alerts should be for events that are in progress, not in the past</li>
        <li>Alerts should not be sent where there is an impact of less than 15 minutes </li>
        <li>The train line and current time will be sent along with your message to subscribers</li>
      </ul>

      <form id="subalert" onSubmit={this.handleSubmit}>
        <label>Train line:</label>
        <select name="trainline" onChange={this.handleChange}>
          <option value="upnw"> Metra UP - Northwest</option>
        </select>

        <br />
        <label>Alert text:</label>
        <textarea name="alert" value={this.state.alert} onChange={this.handleChange} placeholder="Enter text here" maxLength={128} rows={2} cols={70}>
        </textarea>

        <br />
        <input type="checkbox" name="followstandards" />
            My alert is following the rules of conduct as listed above

        <br />
        <button type="submit">Submit</button>
      </form>
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
    addAlert: (alert) => dispatch(addAlert(alert)),
  })
};

export default withRouter(connect(mapState, mapDispatchToProps)(SendAlert));
