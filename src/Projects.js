import React from "react";
import Thumbnail from "./Thumbnail.js"; // Import the Thumbnail component
import "./App.css";
import snakeThumbnail from "./images/snake-project.png";
import d3PlotThumbnail from "./images/gradient-one-plot.png";
import d3CalThumbnail from "./images/gradient-one-cal.png";
import planitThumbnail from "./images/planit-thumbnail.png";
import idealThumbnail from "./images/ideal-pancakes-thumbnail.png";
import eftThumbnail from "./images/eft-thumbnail.png";

let backgroundStyle = {
  //backgroundImage: `linear-gradient(to bottom right, red, yellow)`,
  // backgroundImage: `url(${Background})`,
  // backgroundAttachment: 'fixed',
  // backgroundRepeat: `no-repeat, repeat`,
  // backgroundSize: `100%`,
  // background:`#2A9D8F`
};

function Projects(props) {
  return (
    <div className="container-fluid project-container" style={backgroundStyle}>
      <div
        style={{
          padding: `0.5em 1em 0em`,
          background: `#2A9D8F`,
          borderBottom: `solid 2px #201b24`,
        }}
        className="row"
      >
        <h2>Recent Projects</h2>
      </div>
      <div className="row">
        <div className="col-12 projects-row">
          <Thumbnail
            link="https://www.idealpancakes.com"
            sourceLink=""
            image={idealThumbnail}
            title="Ideal Pancakes"
            externalLink="true"
            tools={["React", "Bootstrap", "JS"]}
            description="Recipe sharing platform and community."
            descriptionLong="Something something"
            roll="co-founder"
          />
        </div>
        <div className="col-12 projects-row">
          <Thumbnail
            link=""
            sourceLink=""
            image={eftThumbnail}
            title="USDA - Engineering Field Tools"
            externalLink="true"
            tools={["React", "Bootstrap", "JS"]}
            description="Suite of engineering tools for commercial hydrology and general farming practices."
            descriptionLong="Something something"
            roll="tech lead &#38; developer"
          />
        </div>
        <div className="col-12 projects-row">
          <Thumbnail
            link=""
            sourceLink=""
            image={d3PlotThumbnail}
            title="Interactive Plot for GradientOne"
            externalLink="true"
            tools={["D3", "Angular", "JS"]}
            description="Real Oscilloscope data plotted using D3.
                         Features include dynamic zoom, auto reduction, markers, and much more."
            descriptionLong="These plots are a key feature of GradientOne which allows users to remotely
                             fetch data from their lab equipment and interact with it in the web UI."
            roll="front-end developer"
          />
        </div>
        <div className="col-12 projects-row">
          <Thumbnail
            link=""
            sourceLink=""
            image={d3CalThumbnail}
            title="Calendar App for GradientOne"
            externalLink="true"
            tools={["Angular", "JS"]}
            description="A calendar application designed to allow reservation and utilization tracking for assets."
            descriptionLong="This product allows lab technicians and test engineers to reserve specific instruments connected to the
                             GradientOne platform."
            roll="front-end developer"
          />
        </div>
        <div className="col-12 projects-row">
          <Thumbnail
            link="/planit"
            sourceLink=""
            image={planitThumbnail}
            title="Maps Project"
            externalLink="false"
            tools={["Google Maps", "React", "JS"]}
            description="Basic application demonstrating react-google-maps and the Google Maps API."
            descriptionLong="I started this project to get familiar with using APIs and with the
                             ultimate goal of building a full blown travel planning application.
                             I had fun incorporating a bit of graphic design and marketing to make
                             the product seem more real."
            roll="creator"
          />
        </div>
        <div className="col-12 projects-row">
          <Thumbnail
            link="/snake"
            sourceLink=""
            image={snakeThumbnail}
            title="Snake"
            externalLink="false"
            tools={["D3", "JS"]}
            description="The classic arcade game you know and love. Plus bombs!"
            descriptionLong="This game was created using only JS and D3.
                             It was a fun coding challenge to try to recreate one of my favorite childhood arcade games.
                             You can really get creative with the added features."
            roll="creator"
          />
        </div>
      </div>
    </div>
  );
}

export default Projects;
