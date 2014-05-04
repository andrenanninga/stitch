var Hammer = require('hammerjs');

Line = function(game, parent, nodes) {
  this.game = game;
  this.parent = parent;
  this.nodes = nodes;

  this.element = this.parent.append('line')
    .attr('x1', this.nodes[0].x)
    .attr('y1', this.nodes[0].y)
    .attr('x2', this.nodes[1].x)
    .attr('y2', this.nodes[1].y)
    .attr('stroke-linecap', 'round')
    .attr('stroke-width', 8)
    .attr('stroke', 'white')
    .style({
      'transform': 'translateZ(10px)'
    })

  this.swipeIgnore = Hammer(this.element[0][0], {
    dragLockToAxis: true,
    dragBlockHorizontal: true
  });
  this.swipeIgnore.on('drag', function(e) {
    e.gesture.stopPropagation();
    e.stopPropagation();
  });
}

module.exports = Line;