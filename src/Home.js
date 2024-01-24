import React from "react";
import { Link } from "react-router-dom"; // Import the Link component
import "./App.css";
import * as d3 from "d3";

class LoadAnimation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isPaused: true };
    this.data = [];
    this.colorPallet = ["#264653", "#2A9D8F", "#E9C46A", "#F4A261", "#E76F51"];
    this.colorPallets = {
      sunset: ["#264653", "#2A9D8F", "#E9C46A", "#F4A261", "#E76F51"],
      blues: [
        "#7400B8",
        "#6930C3",
        "#5E60CE",
        "#5390D9",
        "#4EA8DE",
        "#48BFE3",
        "#56CFE1",
        "#64DFDF",
        "#72EFDD",
        "#80FFDB",
      ],
      fire: [
        "#6A040F",
        "#9D0208",
        "#D00000",
        "#DC2F02",
        "#E85D04",
        "#F48C06",
        "#FAA307",
        "#FFBA08",
      ],
      sunrise: [
        "#F94144",
        "#F3722C",
        "#F8961E",
        "#F9C74F",
        "#90BE6D",
        "#43AA8B",
        "#577590",
      ],
    };
    this.squareDim = {};
    this.svgWidth = 500;
    this.svgHeight = 500;
    this.numberOfDivistions = 30;
    this.patterns = {
      heart_30: {
        frames: [
          // row 1
          [
            { idx: 342, fill: "#cd041c" },
            { idx: 343, fill: "#cd041c" },
            { idx: 347, fill: "#cd041c" },
            { idx: 348, fill: "#cd041c" },
            // row 2
            { idx: 371, fill: "#cd041c" },
            { idx: 372, fill: "#cd041c" },
            { idx: 373, fill: "#cd041c" },
            { idx: 374, fill: "#cd041c" },
            { idx: 376, fill: "#cd041c" },
            { idx: 377, fill: "#cd041c" },
            { idx: 378, fill: "#cd041c" },
            { idx: 379, fill: "#cd041c" },
            //row 3
            { idx: 400, fill: "#cd041c" },
            { idx: 401, fill: "#cd041c" },
            { idx: 402, fill: "white" },
            { idx: 403, fill: "white" },
            { idx: 404, fill: "#cd041c" },
            { idx: 405, fill: "#cd041c" },
            { idx: 406, fill: "#cd041c" },
            { idx: 407, fill: "#cd041c" },
            { idx: 408, fill: "#cd041c" },
            { idx: 409, fill: "#cd041c" },
            { idx: 410, fill: "#cd041c" },
            // row 4
            { idx: 430, fill: "#cd041c" },
            { idx: 431, fill: "#cd041c" },
            { idx: 432, fill: "white" },
            { idx: 433, fill: "#cd041c" },
            { idx: 434, fill: "#cd041c" },
            { idx: 435, fill: "#cd041c" },
            { idx: 436, fill: "#cd041c" },
            { idx: 437, fill: "#cd041c" },
            { idx: 438, fill: "#cd041c" },
            { idx: 439, fill: "#cd041c" },
            { idx: 440, fill: "#cd041c" },
            // row 5
            { idx: 460, fill: "#cd041c" },
            { idx: 461, fill: "#cd041c" },
            { idx: 462, fill: "#cd041c" },
            { idx: 463, fill: "#cd041c" },
            { idx: 464, fill: "#cd041c" },
            { idx: 465, fill: "#cd041c" },
            { idx: 466, fill: "#cd041c" },
            { idx: 467, fill: "#cd041c" },
            { idx: 468, fill: "#cd041c" },
            { idx: 469, fill: "#cd041c" },
            { idx: 470, fill: "#cd041c" },
            // row 6
            { idx: 491, fill: "#cd041c" },
            { idx: 492, fill: "#cd041c" },
            { idx: 493, fill: "#cd041c" },
            { idx: 494, fill: "#cd041c" },
            { idx: 495, fill: "#cd041c" },
            { idx: 496, fill: "#cd041c" },
            { idx: 497, fill: "#cd041c" },
            { idx: 498, fill: "#cd041c" },
            { idx: 499, fill: "#cd041c" },
            // row 7
            { idx: 522, fill: "#cd041c" },
            { idx: 523, fill: "#cd041c" },
            { idx: 524, fill: "#cd041c" },
            { idx: 525, fill: "#cd041c" },
            { idx: 526, fill: "#cd041c" },
            { idx: 527, fill: "#cd041c" },
            { idx: 528, fill: "#cd041c" },
            // row 8
            { idx: 553, fill: "#cd041c" },
            { idx: 554, fill: "#cd041c" },
            { idx: 555, fill: "#cd041c" },
            { idx: 556, fill: "#cd041c" },
            { idx: 557, fill: "#cd041c" },
            // row 9
            { idx: 584, fill: "#cd041c" },
            { idx: 585, fill: "#cd041c" },
            { idx: 586, fill: "#cd041c" },
            // row 10
            { idx: 615, fill: "#cd041c" },
          ],

          // row 1
          [
            { idx: 342, fill: "#cd041c" },
            { idx: 343, fill: "#cd041c" },
            { idx: 347, fill: "#cd041c" },
            { idx: 348, fill: "#cd041c" },
            // row 2
            { idx: 371, fill: "#cd041c" },
            { idx: 372, fill: "#cd041c" },
            { idx: 373, fill: "#cd041c" },
            { idx: 374, fill: "#cd041c" },
            { idx: 376, fill: "#cd041c" },
            { idx: 377, fill: "#cd041c" },
            { idx: 378, fill: "#cd041c" },
            { idx: 379, fill: "#cd041c" },
            //row 3
            { idx: 401, fill: "#cd041c" },
            { idx: 402, fill: "#cd041c" },
            { idx: 403, fill: "white" },
            { idx: 404, fill: "#cd041c" },
            { idx: 405, fill: "#cd041c" },
            { idx: 406, fill: "#cd041c" },
            { idx: 407, fill: "#cd041c" },
            { idx: 408, fill: "#cd041c" },
            { idx: 409, fill: "#cd041c" },
            // row 4
            { idx: 431, fill: "#cd041c" },
            { idx: 432, fill: "#cd041c" },
            { idx: 433, fill: "white" },
            { idx: 434, fill: "#cd041c" },
            { idx: 435, fill: "#cd041c" },
            { idx: 436, fill: "#cd041c" },
            { idx: 437, fill: "#cd041c" },
            { idx: 438, fill: "#cd041c" },
            { idx: 439, fill: "#cd041c" },
            // row 5
            { idx: 461, fill: "#cd041c" },
            { idx: 462, fill: "#cd041c" },
            { idx: 463, fill: "#cd041c" },
            { idx: 464, fill: "#cd041c" },
            { idx: 465, fill: "#cd041c" },
            { idx: 466, fill: "#cd041c" },
            { idx: 467, fill: "#cd041c" },
            { idx: 468, fill: "#cd041c" },
            { idx: 469, fill: "#cd041c" },
            // row 6
            { idx: 492, fill: "#cd041c" },
            { idx: 493, fill: "#cd041c" },
            { idx: 494, fill: "#cd041c" },
            { idx: 495, fill: "#cd041c" },
            { idx: 496, fill: "#cd041c" },
            { idx: 497, fill: "#cd041c" },
            { idx: 498, fill: "#cd041c" },
            // row 7
            { idx: 522, fill: "#cd041c" },
            { idx: 523, fill: "#cd041c" },
            { idx: 524, fill: "#cd041c" },
            { idx: 525, fill: "#cd041c" },
            { idx: 526, fill: "#cd041c" },
            { idx: 527, fill: "#cd041c" },
            { idx: 528, fill: "#cd041c" },
            // row 8
            { idx: 553, fill: "#cd041c" },
            { idx: 554, fill: "#cd041c" },
            { idx: 555, fill: "#cd041c" },
            { idx: 556, fill: "#cd041c" },
            { idx: 557, fill: "#cd041c" },
            // row 9
            { idx: 584, fill: "#cd041c" },
            { idx: 585, fill: "#cd041c" },
            { idx: 586, fill: "#cd041c" },
            // row 10
            { idx: 615, fill: "#cd041c" },
          ],
        ],
      },
      space_invader_30: {
        frames: [
          [
            342,
            348,
            373,
            377,
            402,
            403,
            404,
            405,
            406,
            407,
            408,
            431,
            432,
            434,
            435,
            436,
            438,
            439,
            460,
            461,
            462,
            463,
            464,
            465,
            466,
            467,
            468,
            469,
            470,
            490,
            492,
            493,
            494,
            495,
            496,
            497,
            498,
            500,
            520,
            522,
            528,
            530,
            553,
            554,
            556,
            557,
          ],

          [
            372,
            378,
            400,
            403,
            407,
            410,
            430,
            432,
            433,
            434,
            435,
            436,
            437,
            438,
            440,
            460,
            461,
            462,
            464,
            465,
            466,
            468,
            469,
            470,
            490,
            491,
            492,
            493,
            494,
            495,
            496,
            497,
            498,
            499,
            500,
            521,
            522,
            523,
            524,
            525,
            526,
            527,
            528,
            530,
            552,
            558,
            581,
            589,
          ],
        ],
      },
    };

    this.passiveAnimationListener = undefined;
    // This binding is necessary to make `this` work in the callback
    this.passiveAnimation = this.passiveAnimation.bind(this);
  }

  componentDidMount() {
    this.startAnimation();
    let that = this;
    window.addEventListener("blur", function () {
      that.pauseAnimation(that);
    });
    window.addEventListener("focus", function () {
      that.playAnimation(that);
    });
  }

  pauseAnimation(that) {
    clearInterval(that.passiveAnimationListener);
  }

  playAnimation(that) {
    clearInterval(that.passiveAnimationListener);
    that.passiveAnimationListener = setInterval(that.passiveAnimation, 3000);
  }

  generateDataPoints() {
    this.data = [];
    this.squareDim.width = this.svgWidth / this.numberOfDivistions;
    this.squareDim.height = this.svgHeight / this.numberOfDivistions;
    // y axis
    for (let iy = 0; iy < this.numberOfDivistions; iy++) {
      // x axis
      for (let ix = 0; ix < this.numberOfDivistions; ix++) {
        let x = ix * this.squareDim.width;
        let y = iy * this.squareDim.height;
        // random first position and ordered grid as second positoin
        let square = {
          x1: Math.floor(Math.random() * this.svgWidth),
          y1: Math.floor(Math.random() * this.svgHeight),
          x2: x,
          y2: y,
        };
        this.data.push(square);
      }
    }
  }

  mouseoverAnimation(i, isRipple) {
    let random = Math.random();
    let randomColorIdx = Math.floor(Math.random() * this.colorPallet.length);
    let rect = d3.select("#rect" + i);
    rect
      .transition()
      .duration(500)
      // .style("opacity", random)
      .attr("fill", this.colorPallet[randomColorIdx])
      .attr("x", this.data[i].x1)
      .attr("y", this.data[i].y1)
      .transition()
      .duration(1500)
      // .style("opacity", 1)
      .attr("x", this.data[i].x2)
      .attr("y", this.data[i].y2);

    // create ripple effect
    if (!isRipple) {
      const radius = 1;
      let neighbors = [];
      for (let xIndex = -radius; xIndex <= radius; xIndex++) {
        let dataIdx = +i + xIndex;
        for (let yIndex = -radius; yIndex <= radius; yIndex++) {
          dataIdx = dataIdx - yIndex * this.numberOfDivistions;
          // if in bounds
          if (
            dataIdx >= 0 &&
            dataIdx < this.data.length &&
            neighbors.indexOf(dataIdx)
          ) {
            neighbors.push(dataIdx);
          }
        }
      }
      let isRipple = true;
      for (let neighbor of neighbors) {
        this.mouseoverAnimation(neighbor, isRipple);
        // setTimeout(() => {  this.mouseoverAnimation(neighbor, isRipple) }, 10);
      }
    }
  }

  mouseoutAnimation(i, isRipple) {
    let random = Math.random();
    let randomColorIdx = Math.floor(Math.random() * this.colorPallet.length);
    let rect = d3.select("#rect" + i);
    rect
      .transition()
      .duration(1000)
      .style("opacity", 1)
      .attr("fill", this.colorPallet[randomColorIdx]);
  }

  drawMosaic(pattern, frameIndex, onLoad) {
    d3.selectAll(".mosaic").remove();
    let frame = pattern.frames[frameIndex];
    let svg = d3.select("#animationSVG");
    for (let square of frame) {
      let rect;
      let fillColor;
      if (typeof square === "object") {
        rect = this.data[square.idx];
        fillColor = square.fill;
      } else {
        rect = this.data[square];
        fillColor = "black";
      }
      if (rect === undefined) {
        return;
      }
      let random = Math.random();
      if (onLoad) {
        // setTimeout(() => {
        svg
          .append("rect")
          .attr("class", "mosaic")
          .attr("x", Math.floor(Math.random() * this.svgWidth))
          .attr("y", Math.floor(Math.random() * this.svgHeight))
          .attr("width", this.squareDim.width)
          .attr("height", this.squareDim.width)
          .attr("fill", fillColor)
          .style("opacity", 0)
          .transition()
          .duration(1000)
          .attr("x", rect.x2)
          .attr("y", rect.y2)
          .style("opacity", 1);
        // }, 100);
      } else {
        svg
          .append("rect")
          .attr("class", "mosaic")
          .attr("x", rect.x2)
          .attr("y", rect.y2)
          .attr("width", this.squareDim.width)
          .attr("height", this.squareDim.width)
          .attr("fill", fillColor);
      }
    }
  }

  startMosaicAnimation(pattern) {
    let that = this;
    let curIndex = 0;
    function advancePatternFrame(pattern, that) {
      if (curIndex >= pattern.frames.length) {
        curIndex = 0;
      }
      that.drawMosaic(pattern, curIndex);
      ++curIndex;
    }
    let intervalID = setInterval(function () {
      advancePatternFrame(pattern, that);
    }, 1000);
  }

  passiveAnimation() {
    d3.selectAll(".animation-rect")
      .transition()
      .delay(function (d, i) {
        return 1000 * Math.random();
      })
      .duration(1000)
      .style("opacity", 0.8)
      .transition()
      .duration(1200)
      .style("opacity", 1);
  }

  startAnimation() {
    // set random color pallet
    d3.selectAll(".mosaic").remove();
    let colorPalletKeys = Object.keys(this.colorPallets);
    let randomColorPallet = Math.floor(Math.random() * colorPalletKeys.length);

    let patternKeys = Object.keys(this.patterns);
    let randomAnimation = Math.floor(Math.random() * patternKeys.length);
    let pattern = this.patterns[patternKeys[randomAnimation]];

    this.colorPallet = this.colorPallets[colorPalletKeys[randomColorPallet]];
    // setup SVG and begin drawing rectangles
    let svgDiv = document.getElementById("home-animation");

    let that = this;
    // create svg
    let svg = d3
      .select(svgDiv)
      .append("svg")
      .attr("id", "animationSVG")
      .attr("viewBox", "0, 0," + this.svgWidth + "," + this.svgHeight);

    this.generateDataPoints();

    setTimeout(() => {
      this.drawMosaic(pattern, 0, true);
      this.startMosaicAnimation(pattern);
    }, 250);
    clearInterval(this.passiveAnimationListener);
    for (let idx in this.data) {
      setTimeout(() => {
        this.drawRectangle(svg, idx);
      }, 10);
    }

    // start passive animation
    setTimeout(() => {
      this.passiveAnimationListener = setInterval(this.passiveAnimation, 3000);
    }, 3000);
  }

  drawRectangle(svg, idx) {
    let randomColor = Math.floor(Math.random() * this.colorPallet.length);
    let rect = this.data[idx];
    let that = this;

    svg
      .append("rect")
      .attr("id", "rect" + idx)
      .attr("class", "animation-rect")
      .attr("x", rect.x1)
      .attr("y", rect.y1)
      .attr("width", 1)
      .attr("height", 1)
      .attr("fill", this.colorPallet[randomColor])
      .text(idx)
      .style("opacity", 0)
      .transition()
      .duration(1500)
      .attr("width", this.squareDim.width)
      .attr("height", this.squareDim.height)
      .style("opacity", 1)
      .attr("y", rect.y2)
      .attr("x", rect.x2);

    // Turned this off bc it conflicts with passive animation
    // apply mouseover animation after initial draw animation
    // if(+idx === this.data.length-1) {
    //     setTimeout(() => {
    //         for(let i in this.data) {
    //             d3.select("#rect"+i)
    //                 .on("mouseover", function() { that.mouseoverAnimation(i) })
    //                 .on("mouseout", function() { that.mouseoutAnimation(idx) })
    //         }
    //     }, 1500);
    // }
  }

  render() {
    return <div id="home-animation"></div>;
  }
}

function Home(props) {
  return (
    <div className="container-fluid home-container">
      <div className="home-section">
        <h2 className="mb-3">Web Design & Developer Services</h2>
        <h4>by William Vennard</h4>
      </div>
      <LoadAnimation />
    </div>
  );
}

export default Home;
