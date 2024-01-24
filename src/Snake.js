import React from "react"
import './App.css';
import { startSnakeGame, pauseSnakeGame } from './SnakeApp.js';


function startGame () {
	startSnakeGame();
}

function pauseGame () {
	pauseSnakeGame();
}

class PauseGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isPaused: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }
  handleClick() {
    this.setState(state => ({
      isPaused: !state.isPaused
    }));
    if(this.state) {
    	pauseGame();
    }
  }

  render() {
    return (
    	<div id="pause-game">
	      <button onClick={this.handleClick}
	      				className="btn">
	        {this.state.isPaused ? 'pause' : 'resume!'}
	      </button>
	    </div>
    );
  }
}

function Snake(props) {
  return (
    <div className="container-fluid snake-container" id="snake-game">
    	<div className="row">
	      <div className="col-sm">
	      	<h1>Snake</h1>
		      <div id="game-space">
		      	<svg id="board" width="300px" height="300px">
		      		<text className="game-intro"
		      					dx="150px"
		      					dy="5em">
		      			Use the arrow keys,
		      		</text>
		      		<text className="game-intro"
		      					dx="150px"
		      					dy="7em">
		      			eat green apples,
		      		</text>
		      		<text className="game-intro"
		      			  	dx="150px"
		      					dy="9em">
		      			and avoid the bombs!!
		      		</text>
		      	</svg>
		      </div>
		      <div id="score">
		      	score: <span id="score-count"></span>
		      </div>
		      <PauseGame/>
		      <div id="start-game">
		        <button className="btn btn-primary"
		        			  onClick={startGame}>
		        	Start Game
		        </button>
		      </div>
		    </div>
	    </div>
	    <div className="col-sm">
	    	<a href='https://github.com/williamvennard/wills-page'>Checkout this project on GitHub </a>
	    </div>
    </div>
  )
}

export default Snake;