var d3 = require('d3');

var Puzzle = require('./puzzle');
var Score = require('./score');

Game = function(container) {
  this.container = container;
  this.stage;

  this.width = 300;
  this.height = 600;
}

Game.prototype.setup = function() {
  this.container = d3.select(this.container);

  this.container
    .style({
      '-webkit-perspective': '1800px',
      '-moz-perspective': '1800px',
      'perspective': '1800px',
      'background-color': '#445674',
      'overflow': 'hidden',
      'width': this.width,
      'height': this.height
    });

  // this.stage = this.container.append('svg')
    // .attr('width', this.width)
    // .attr('height', this.height)
    // .style('background-color', '#EEEEEE');

  this.score = new Score(this, this.container);
  this.puzzle = new Puzzle(this, this.container);
}

Game.prototype.start = function() {
  this.setup();
}

module.exports = Game;