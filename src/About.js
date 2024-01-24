import React from "react";
import IconBadge from "./IconBadge.js";
import { Link } from "react-router-dom"; // Import the Link component
import pictureOfMe from "./images/about_me_photo.png";
import "./App.css";

function About(props) {
  return (
    <div className="container-fluid about-container">
      <div
        style={{
          padding: `0.5em 1em 0em`,
          background: `#264653`,
          borderBottom: `solid 2px #201b24`,
        }}
        className="row"
      >
        <h2>About Me</h2>
      </div>
      <div className="row">
        <div className="col-lg-6 col-sm-12 text-container">
          <h4 className="my-5">Hi, my name is William Vennard</h4>
          <p>
            I specialize in UX/UI design and implementation with over 8 years of
            professional experience. I enjoy being creative and solving
            challanging problems. I currently live and work remotely in Denver,
            Colorado, where I enjoy to ski in the winter and rock climb in the
            summer.
          </p>

          <p>
            Click <a href="/WVResume-2024.pdf">here</a> to view my resume.
          </p>

          <p>Some of the tools I like to use and are most familar with are</p>
          <ul className="tools-list mt-5">
            <li>
              <IconBadge devTool="HTML" />
            </li>
            <li>
              <IconBadge devTool="CSS" />
            </li>
            <li>
              <IconBadge devTool="React" />
            </li>
            <li>
              <IconBadge devTool="Angular" />
            </li>
            <li>
              <IconBadge devTool="Bootstrap" />
            </li>
            <li>
              <IconBadge devTool="D3" />
            </li>
            <li>
              <IconBadge devTool="Jasmine" />
            </li>
          </ul>
        </div>
        <div className="col-lg-6 col-sm-12">
          <img id="my-photo" src={pictureOfMe} alt="its me" />
        </div>
      </div>
    </div>
  );
}

export default About;
