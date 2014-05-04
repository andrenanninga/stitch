var _ = require('underscore');
var Hammer = require('hammerjs');

var Node = require('./node');
var Board = require('./board');

Puzzle = function(game, parent) {
  var _this = this;

  this.game = game;
  this.parent = parent;

  this.rotation = 0;
  this.rotating = false;

  this.element = this.parent
    .append('div')
    .style({
      'width': game.width,
      'height': game.height - 200,
      'z-index': 100,
      '-webkit-transition': '1s',
      '-webkit-transform-style': 'preserve-3d',
      '-moz-transition': '1s',
      '-moz-transform-style': 'preserve-3d',
      'transition': '1s',
      'transform-style': 'preserve-3d',
      'position': 'relative',
      'transform-origin': '50% 50%'
    });

  var options = {
    width: game.width,
    height: game.height - 200,
    columns: 3,
    rows: 4
  }

  this.front = new Board(this.game, this.element, _.defaults({ z: -0.1, scaleX: 1 }, options));
  this.front.setRotation(0);
  this.back = new Board(this.game, this.element, _.defaults({ z: 0.1, scaleX: -1 }, options));
  this.back.setRotation(180);

  this.swipeToFlip = Hammer(this.element[0][0], {
    dragLockToAxis: true,
    dragBlockHorizontal: true
  });
  this.swipeToFlip.on('drag', function(e) {
    if(!_this.rotating) {
      _this.flip(e.gesture.direction);
    }
  });

  this.element[0][0].addEventListener('transitionend', function(e) {
    _this.rotating = false;
  }, false);
}

Puzzle.prototype.flip = function(direction) {
  this.rotating = true;

  if(direction == 'right') {
    this.rotation += 180;
  }
  else {
    this.rotation -= 180;
  }
  
  this.element.style('transform', 'rotateY(' + this.rotation + 'deg)');
}

module.exports = Puzzle;