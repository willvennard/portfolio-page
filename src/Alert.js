import React from "react";
import AlertMessageTest from "./AlertMessage.js";
class AlertMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 3600,
    };
    this.handleClick = this.clickThis.bind(this);
  }

  componentDidMount() {
    // start countdown
    this.interval = setInterval(() => {
      this.countDown();
    }, 300);
  }

  countDown() {
    // this.state.minutes =
    if (this.state.counter > 0) {
      this.state.counter--;
      this.minutes = Math.floor(this.state.counter / 60);
      this.seconds = this.state.counter % 60;
      if (String(this.minutes).length === 1) {
        this.minutes = "0" + this.minutes;
      }
      if (String(this.minutes).length === 0) {
        this.minutes = "00" + this.minutes;
      }
      if (String(this.seconds).length === 1) {
        this.seconds = "0" + this.seconds;
      }

      this.setState({ counter: this.state.counter });
    } else {
      clearInterval(this.interval);
    }
  }

  clickThis() {
    console.warn("YOOO THIS WAS CLICKED!", this);
  }

  render() {
    return (
      <div>
        <p>
          Self-Destruct In {this.minutes} : {this.seconds}
        </p>

        <button onClick={this.clickThis}>Hello Alert!</button>
      </div>
    );
  }
}
export default AlertMessage;
