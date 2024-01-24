import * as d3 from "d3";

function initKeyBindings () {
  document.addEventListener('keydown', (event) => {
    if(event.key === 'ArrowLeft' || event.key === 'ArrowUp' || event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      snakeGame.snakeDirection = directionHelper(event.key)
    }
  });
  document.addEventListener("touchstart", touchHandler);
}

// makes sure you cant double back on yourself
function directionHelper(direction) {
  if (snakeGame.snakeDirection === 'ArrowLeft' && direction === 'ArrowRight') { return snakeGame.snakeDirection }
  if (snakeGame.snakeDirection === 'ArrowRight' && direction === 'ArrowLeft') { return snakeGame.snakeDirection }
  if (snakeGame.snakeDirection === 'ArrowUp' && direction=== 'ArrowDown') { return snakeGame.snakeDirection }
  if (snakeGame.snakeDirection === 'ArrowDown' && direction === 'ArrowUp') { return snakeGame.snakeDirection }
    return direction
}

// for mobile devices
function touchHandler(e) {
  e.preventDefault();
  if(e.touches) {
    let width = e.view.innerWidth;
    let height = e.view.innerHeight;
    let x = e.touches[0].pageX 
    let y = e.touches[0].pageY 
    let direction;
    if (x<width/3) {
      direction = 'ArrowLeft';
    } else if (x>(width - width/3)) {
      direction = 'ArrowRight';
    } else if (y<height/3) {
      direction = 'ArrowUp';
    } else {
      direction = 'ArrowDown';
    }
    snakeGame.snakeDirection = directionHelper(direction)
  }
}

class SnakeGame {
  constructor() {
    this.playing = false;
    this.count = 0;
    this.foodCord = [];
    this.headCord = [];
    this.snakeBody = [];
    this.foodOnBoard = false;
    this.score = 0;
    this.speed = 200;
    this.snakeTail = [];
    this.snakeDirection = 'ArrowRight';
    this.lastSnakeDirection = '';
    this.gameTicker = "";
    this.segmentDim = 10;
    this.boardWidth = 300;
    this.boardHeight = 300;
    this.segmentRadius = 5;

  }

  // Might be a better way to do this.
  // put into another class and simply reset?
  initGame() {
    d3.selectAll(".game-intro").remove();
    d3.select('#score').style("display", "block")
    d3.select('#start-game').style("display", "none")
    d3.select('#board').remove();
    d3.select('#end-text').remove();
    this.headCord = [0,0];
    this.snakeBody = [];
    this.score = 0;
    this.speed = 200;
    this.bombCount = 0
    this.snakeDirection = 'ArrowRight';
    this.snakeBody.push(this.headCord);
    this.playing = true;

    initKeyBindings();

    d3.select('#game-space')
      .append('svg')
      .attr('id', 'board')
      .attr('width', this.boardWidth)
      .attr('height', this.boardHeight)
      .append('rect')
      .attr('class', 'snake head')
      .attr("id", "segment" + (this.snakeBody.length-1))
      .attr('width', this.segmentDim)
      .attr('height', this.segmentDim)
      .attr('x', this.headCord[0])
      .attr('y', this.headCord[1])
      .attr("ry", this.segmentRadius)
      .attr("rx", this.segmentRadius)
      .attr('fill', 'red')

    // do this with d3
    d3.select('#score-count')
      .text(this.score)

    d3.select('#pause-game')
      .style("display", "block")

    this.spawnFood();
    this.gameTick();
  }

  randomBoardCord() {
    let segDim = this.segmentDim;
    let x = (Math.round(Math.random()*this.boardWidth/segDim)*segDim) - segDim;
    let y = (Math.round(Math.random()*this.boardHeight/segDim)*segDim) - segDim;
    // keep food on map
    if (x > this.boardWidth) { x = this.boardWidth - segDim}
    if (x < 0) { x = 0 }
    if (y > this.boardHeight) {y = this.boardHeight - segDim}
    if (y < 0) { y = 0 }

    return [x,y];
  }

  spawnFood() {
    this.foodCord = this.randomBoardCord()

    d3.select('#board').append('rect')
      .attr("id", "food")
      .attr("width", this.segmentDim)
      .attr("height", this.segmentDim)
      .attr("x", this.foodCord[0])
      .attr("y", this.foodCord[1])
      .attr("ry", this.segmentRadius)
      .attr("rx", this.segmentRadius)
      .attr("fill", "limegreen")
      .style("opacity", 0)
      .transition()
      .duration(1000)
      .style("opacity", 1)

    this.foodOnBoard = true;
  }

  moveSnake(index, cord) {
    d3.select('#segment' + index)
      .attr("x", cord[0])
      .attr("y", cord[1]);

    if (+index !== this.snakeBody.length-1) {
      let nextIdx = index + 1;
      let oldCord = this.snakeBody[index];
      this.moveSnake(nextIdx, oldCord)
    }
    this.snakeBody[index] = [cord[0], cord[1]];
  }

  gameLost() {
    clearTimeout(this.gameTicker);
    console.log('Game over.')
    if(!this.playing) { return; }
    this.playing = false;

    // remove old stuff and show game over
    d3.select('#food').transition()
      .duration(1000)
      .style("opacity", 0)
      .remove();

    d3.selectAll(".snake").transition()
      .duration(1000)
      .style("opacity", 0)
      .remove();

    d3.select('#bomb-text').remove();

    d3.select('#bomb')
      .transition()
      .duration(1000)
      .style("opacity", 0)
      .remove();

    d3.select('#end-text').remove();
    d3.select('#game-space')
      .append('h3')
      .text('GAME OVER')
      .attr('id', 'end-text')
      .style("opacity", 0)
      .transition()
      .duration(1000)
      .style("opacity", 1)

    d3.select('#pause-game')
      .style("display", "none")

    d3.select('#start-game')
      .style("display", "block")
      
  }

  gameTick() {
    if(this.paused) {
      return
    }
    this.count++;
    if(this.snakeDirection === 'ArrowLeft') {
      this.headCord[0] = this.headCord[0] - this.segmentDim;
    }else if(this.snakeDirection === 'ArrowUp') {
      this.headCord[1] = this.headCord[1] - this.segmentDim;
    }else if(this.snakeDirection === 'ArrowRight') {
      this.headCord[0] = this.headCord[0] + this.segmentDim;
    }else if(this.snakeDirection === 'ArrowDown') {
      this.headCord[1] = this.headCord[1] + this.segmentDim;
    }
    //headCord = [0,0]
    this.snakeTail = [this.snakeBody[this.snakeBody.length-1][0], this.snakeBody[this.snakeBody.length-1][1]];

    this.moveSnake(0, this.headCord);

    if (this.foodCord.length > 0) {
      if(this.foodCord[0] === this.headCord[0] && this.foodCord[1] === this.headCord[1]) {
        console.warn('FOOD EATEN!!!')
        this.score++;
        if (this.speed > 100) {
          this.speed = this.speed-10;
        }

        d3.select("#score-count")
          .text(this.score)

        d3.select('#food').remove();
        this.foodOnBoard = false;

        this.snakeBody.push(this.snakeTail)

        d3.select('#board').append('rect')
          .attr("class", "snake")
          .attr("id", "segment" + (this.snakeBody.length-1))
          .attr("width", this.segmentDim)
          .attr("height", this.segmentDim)
          .attr("x", this.snakeTail[0])
          .attr("y", this.snakeTail[1])
          .attr("ry", this.segmentRadius)
          .attr("rx", this.segmentRadius)
          .attr("fill", "purple");
      }
    }

    if(this.count%5 === 0 && !this.foodOnBoard) {
      this.spawnFood();
    }

    // put bomb stuff in seperate function
    if(this.snakeBombs === undefined) {
      this.snakeBombs = new SnakeBombs(this);
    }

    // bomb tick
    if (this.snakeBombs.liveBomb) {
      //console.log('This bomb is ticking...', this.snakeBombs.bombCount)
      // count down in seconds
      let slowCount = Math.round(1000/this.speed);
      if (+this.snakeBombs.bombCount > 0 && this.count%slowCount === 1) {
        this.snakeBombs.bombCount = this.snakeBombs.bombCount - 1;
        d3.select('#bomb-text')
          .text(this.snakeBombs.bombCount)
      } else if (this.snakeBombs.bombCount <= 0){
        // boom
        console.log("Boom!")
        this.snakeBombs.bombGoesBoom();
      }
    }

    // spawn bomb
    if(this.score > 0 && this.count%10 === 0 && !this.snakeBombs.liveBomb) {
      this.snakeBombs.spawnBomb();
    }

    // losing conditions
    if(this.headCord[0] >= this.boardWidth || this.headCord[0] < 0 // off the sides 
      || this.headCord[1] < 0 || this.headCord[1] >= this.boardHeight) { // off the top or bottom
      console.log('Snakes out of the box!')
      this.gameLost();
      return
    }
    for (let segment of this.snakeBody) {
      if (this.snakeBody.indexOf(segment) === 0) {
        continue
      }
      if(this.headCord[0] === segment[0] && this.headCord[1] === segment[1]) {
        console.log('You bit your own tail...')
        this.gameLost()
        return
      }
    }

    let that = this;
    this.gameTicker = setTimeout(function() {
      that.gameTick()
    }, that.speed);
  }

}

class SnakeBombs {
  constructor(snakeGame) {
    this.snakeGame = snakeGame;

    this.bombCord = [];
    this.liveBomb = false;
    this.bombCount = 0;
    this.explosionRadius = 2;
  }

  spawnBomb() {
    this.bombCord = this.snakeGame.randomBoardCord();
    this.bombCount = 5;
    d3.select('#board').append('rect')
      .attr("id", "bomb")
      .attr("width", this.snakeGame.segmentDim)
      .attr("height", this.snakeGame.segmentDim)
      .attr("x", this.bombCord[0])
      .attr("y", this.bombCord[1])
      .attr("ry", this.snakeGame.segmentRadius)
      .attr("rx", this.snakeGame.segmentRadius)
      .attr("fill", "orange")
      .style("opacity", 0)
      .attr("stroke", "red")
      .transition()
      .duration(1000)
      .style("opacity", 1)

    d3.select('#board').append('text')
      .attr('id', 'bomb-text')
      .text(this.bombCount)
      .style('fill', 'black')
      .style('font-size', '65%')
      .attr("transform", "translate("+(this.bombCord[0]+this.snakeGame.segmentDim/4)+","+(this.bombCord[1]+this.snakeGame.segmentDim-1)+")");

    this.liveBomb = true;
  }

  bombGoesBoom () {
    
    let colorScale = d3.scaleLinear()
      .domain([0, this.explosionRadius])
      .range(['red', 'yellow']);

    let explosionArea = [];
    for(let i = 1; i <= this.explosionRadius; i++) {
      let start = this.bombCord;
      for(let xDim = -i; xDim <= i; xDim++) {
        for(let yDim = -i; yDim <= i; yDim++) {
          let newX = start[0] + (xDim*this.snakeGame.segmentDim)
          let newY = start[1] + (yDim*this.snakeGame.segmentDim)
          let newCord = [newX, newY];
          if(!explosionArea.includes(newCord)) {
            explosionArea.push(newCord)
          }
        }
      }
    }
    for(let block of explosionArea) {
      // distance in block units
      let distance = distanceBetweenPoints(this.bombCord, block)/this.snakeGame.segmentDim

      d3.select('#board').append('rect')
        .attr("class", "boom")
        .attr("width", this.snakeGame.segmentDim)
        .attr("height", this.snakeGame.segmentDim)
        .attr("x", block[0])
        .attr("y", block[1])
        .attr("ry", this.snakeGame.segmentRadius)
        .attr("rx", this.snakeGame.segmentRadius)
        .attr("fill", colorScale(distance))
        .style("opacity", 1)
        .attr("stroke", "red")
        .transition()
        .duration(1500)
        .style("opacity", 0)
        .attr("fill", "blue")
        .attr("width", 1)
        .attr("height", 1)
        .remove();
    }

    d3.select('#bomb-text').remove();
    d3.select('#bomb')
      .transition()
      .duration(1500)
      .style("opacity", 0)
      .remove();

    this.bombCount = 0;
    this.liveBomb = false;

    this.isHeadInExplosion()
  }

  isHeadInExplosion() {
    let bombR = this.explosionRadius;
    let segDim = this.snakeGame.segmentDim;
    let explosionXRange = [this.bombCord[0]-segDim*bombR, this.bombCord[0]+segDim*bombR];
    let explosionYRange = [this.bombCord[1]-segDim*bombR, this.bombCord[1]+segDim*bombR];
    let detectX = this.snakeGame.headCord[0] >= explosionXRange[0] && this.snakeGame.headCord[0] <= explosionXRange[1];
    let detectY = this.snakeGame.headCord[1] >= explosionYRange[0] && this.snakeGame.headCord[1] <= explosionYRange[1];
    if (detectX && detectY) {
      console.log("Ouch, killed by a bomb...")
      this.snakeGame.gameLost();
    }
  }
  
}

function distanceBetweenPoints (pointA, pointB) {
  let x0 = pointA[0];
  let x1 = pointB[0];
  let y0 = pointA[1];
  let y1 = pointB[1];
  let x = Math.pow((x1-x0), 2);
  let y = Math.pow((y1-y0), 2)
  let distance = Math.pow((x + y), 0.5);

  return distance;
}

let snakeGame = new SnakeGame();
export function startSnakeGame() {
  console.log('startSnakeGame: Start game!!')
  snakeGame.initGame()
}

export function pauseSnakeGame() {
  if (snakeGame.paused) {
    snakeGame.paused = false;
    snakeGame.gameTick();
  } else {
    snakeGame.paused = true;
  }

}
