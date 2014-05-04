var Hammer = require('hammerjs');

Node = function(game, parent, board, column, row, x, y, radius) {
  var _this = this;

  this.game = game;
  this.parent = parent;
  this.board = board;

  this.column = column;
  this.row = row;

  this.x = x;
  this.y = y;
  this.radius = radius;

  this.colors = [
    '#DB4C2F',
    '#DC7F00',
    '#61B575',
    '#4E96E0'
  ];

  this.color = this.colors[Math.floor(Math.random() * this.colors.length)];

  this.element = this.parent.append('circle')
    .attr('r', radius)
    .attr('cx', x)
    .attr('cy', y)
    .style({
      'fill': this.color,
      'z-index': 300,
    });

  this.dragBegin = false;
  this.dragEnd = false;

  this.drag = Hammer(this.element[0][0]);
  this.drag.on('drag', function(e) {
    e.gesture.stopPropagation();
    e.stopPropagation();

    if(!_this.dragBegin) {
      _this.dragBegin = { 
        x: e.gesture.touches[0].offsetX, 
        y: e.gesture.touches[0].offsetY
      }
    }

    _this.dragEnd = {
      x: e.gesture.touches[0].offsetX, 
      y: e.gesture.touches[0].offsetY
    }

  });

  this.drag.on('dragend', function(e) {
    var node = _this.board.getNodeAtCoords(_this.dragEnd.x, _this.dragEnd.y);

    new Line(_this.game, _this.parent, [_this, node]);

    this.dragBegin = false;
    this.dragEnd = false;
  });

  this.click = Hammer(this.element[0][0]);
  this.click.on('tap', function(e) {
    _this.game.puzzle.front.nodes[_this.column][_this.row].element.style({
      'stroke-width': 2,
      'stroke': '#FFFFFF'
    })

    _this.game.puzzle.back.nodes[_this.column][_this.row].element.style({
      'stroke-width': 2,
      'stroke': '#FFFFFF'
    })
  })
}

module.exports = Node;