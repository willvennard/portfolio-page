import React from "react";
import { Link } from "react-router-dom"; // Import the Link component
import "./App.css";

class CopyEmail extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {isPaused: true};
    this.email = props.email;
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    navigator.clipboard.writeText(this.email);
    alert(this.email + " is now copyied to your clipboard");
  }

  render() {
    return (
      <div>
        <a
          id="my-email"
          title="click to copy to clipboard"
          onClick={this.handleClick}
        >
          {this.email}
        </a>
      </div>
    );
  }
}

function Contact(props) {
  return (
    <div className="container-fluid contact-container">
      <div
        style={{
          padding: `0.5em 1em 0em`,
          background: `rgb(228 78 38)`,
          borderBottom: `solid 2px #201b24`,
        }}
        className="row"
      >
        <h2>Contact Me</h2>
      </div>
      <div className="row contact-row">
        <div className="col-12 text-container">
          <h4>Interested in working together or simply have questions?</h4>
          <p>Feel free to contact me via email, phone or social media.</p>
        </div>
        <div className="col-12 text-container">
          <p>William Vennard</p>
          <p>
            <CopyEmail email="willvennard@gmail.com" />
          </p>
          <p>(608) 770 - 6478</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
