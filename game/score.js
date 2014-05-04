Score = function(game, parent) {
  this.game = game;
  this.parent = parent;

  this.element = this.parent.append('div')
    .style({
      'width': game.width,
      'height': '40px',
      'background-color': '#384760'
    });

  this.element.append('text')
    .style({
      'color': '#FFFFFF',
      'font-family': 'sans-serif',
      'font-weight': 'bold',
      'letter-spacing': '1px',
      'text-anchor': 'middle'
    })
    .html('123 421 points')
}

module.exports = Score;