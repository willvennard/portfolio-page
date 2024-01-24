import React from "react"; // Import the Component component from React
import { Link } from "react-router-dom"; // Import the Link component
import IconBadge from "./IconBadge.js";
import "./App.css";

function OrderedList(props) {
  const list = props.list;
  const listItems = list.map((item) => (
    <li key={item.toString()}>
      <IconBadge devTool={item.toString()} />
    </li>
  ));
  return <ul className="tools-list">{listItems}</ul>;
}

class Content extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row text-container">
        <div className="col-xs-12 col-sm-6">
          <div className="project-title">
            <h4>{this.props.title}</h4>
          </div>
          <div hidden={!this.props.roll} className="my-2 font-weight-bold">
            {this.props.roll}
          </div>
          <p>{this.props.description}</p>
          <p>{this.props.descriptionLong}</p>
          <SourceLink props={this.props} />
          <OrderedList list={this.props.tools} />
        </div>
        <div className="col-xs-12 col-sm-6">
          <Thumbnail props={this.props} />
        </div>
      </div>
    );
  }
}

function SourceLink(props) {
  if (props.props.sourceLink) {
    return (
      <div>
        <a href={props.props.sourceLink}>View Source</a>
      </div>
    );
  } else {
    return null;
  }
}

function Thumbnail(props) {
  // use a tag if using extenal link
  if (props.props.link) {
    if (props.props.externalLink === "true") {
      return (
        <div className="project">
          <div className="project-image project-image-hover">
            <a href={props.props.link}>
              <div className="click-to-view">click to view</div>
              <img src={props.props.image} alt="Project Thumbnail" />
            </a>
          </div>
        </div>
      );
    } else {
      return (
        <div className="project">
          <div className="project-image project-image-hover">
            <Link to={props.props.link}>
              <div className="click-to-view">click to view</div>
              <img src={props.props.image} alt="Project Thumbnail" />
            </Link>
          </div>
        </div>
      );
    }
  } else {
    return (
      <div className="project">
        <div className="project-image">
          <img src={props.props.image} alt="Project Thumbnail" />
        </div>
      </div>
    );
  }
}

export default Content;
