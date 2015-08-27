(function () {
  var CCB = window.CCB = window.CCB || {};

  var Game = CCB.Game = function () {
    CCB.g = this;
    this.bells = [];
    this.beeHives = [];
    this.harmonicHoney = 10;
  };

  Game.DIM_X = 800;
  Game.DIM_Y = 400;
  Game.BG_COLOR = "#aaaaaa";
  Game.FPS = 32;

  Game.prototype = {
    add: function (x, y) {
      if(this.chosen === 'beehive') {
        if(this.harmonicHoney >= CCB.BeeHive.COST) {
          this.harmonicHoney -= CCB.BeeHive.COST;
          this.beeHives.push(new CCB.BeeHive({ game: this, pos: [x, y] }));
        }
      } else {
        if(this.harmonicHoney >= CCB.Bell.COST) {
          this.harmonicHoney -= CCB.Bell.COST;
          this.bells.push(new CCB.Bell({ note: this.chosen, pos: [x, y] }));
        }
      }
    },

    // weight by bell size?
    fit: function (root) {
      rootHz = CCB.roots[root];
      var diffs = 0;
      this.bells.forEach(function(bell) {
        diffs += bell.note.clash(root);
      })

      return diffs;
    },

    bestFit: function () {
      

      CCB.letters.forEach(function (root) {
        
      })      
    },

    draw: function (ctx) {
      ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
      ctx.fillStyle = Game.BG_COLOR;
      ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

      this.bells.forEach(function (bell) { bell.draw(ctx); })
      this.beeHives.forEach(function (hive) { hive.draw(ctx); })
    },

    step: function () {
      this.bells.forEach(function (bell) {
        bell.step();
      })

      this.beeHives.forEach(function (hive) { hive.step(); })
    },

    ring: function (event) {
      var pos = [event.offsetX, event.offsetY];
      this.bells.forEach(function (bell) {
        bell.ring(pos);
        this.harmonicHoney += bell.income();
      }.bind(this))
    }
  }
})();
