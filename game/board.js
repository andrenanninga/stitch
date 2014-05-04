var Node = require('./node');
var Line = require('./line');

Board = function(game, parent, options) {
  this.game = game;
  this.parent = parent;
  this.options = options;

  this.rotation = 0;

  this.element = this.parent
    .append('svg')
    .style({
      'width': options.width,
      'height': options.height,
      'z-index': 200,
      'background': '#2F3C52',
      '-webkit-backface-visibility': 'hidden',
      '-moz-backface-visibility': 'hidden',
      'backface-visibility': 'hidden',
      'transform-style': 'preserve-3d',
      '-webkit-perspective': '1800px',
      '-moz-perspective': '1800px',
      'perspective': '1800px',
      position: 'absolute',
      top: 0,
      left: 0
    });

  this.spacing = {
    x: options.width / options.columns,
    y: options.height / options.rows
  }

  this.offset = {
    x: 10,
    y: 10
  }

  var radius = Math.min(this.spacing.x, this.spacing.y) / 2;

  this.nodes = []

  for(var column = 0; column < options.columns; column++) {
    var nodes = [];

    for(var row = 0; row < options.rows; row++) {
      var x = column * this.spacing.x + this.spacing.x / 2 - 10 + this.offset.x;
      var y = row * this.spacing.y + this.spacing.y / 2 - 10 + this.offset.y;

      nodes.push(new Node(game, this.element, this, column, row, x, y, radius - 25));
    }

    this.nodes.push(nodes);
  }
}

Board.prototype.setRotation = function(rotation) {
  this.rotation = 0;
  this.element.style('transform', 'rotateY(' + rotation + 'deg) translateZ(' + this.options.z + 'px) scaleX(' + this.options.scaleX + ')');
}

Board.prototype.getNodeAtCoords = function(x, y) {
  var column = Math.floor(x / this.spacing.x);
  var row = Math.floor(y / this.spacing.y);

  return this.nodes[column][row];
}

module.exports = Board;