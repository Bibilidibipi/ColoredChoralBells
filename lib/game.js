(function () {
  var CCB = window.CCB = window.CCB || {};

  var Game = CCB.Game = function () {
    CCB.g = this;
    this.bells = [];
    this.beeHives = [];
    this.harmonicHoney = 10;

    this.fieldImg = new Image();
    this.fieldImg.src = Game.FIELD_IMAGE;

    this.gardenImg = new Image();
    this.gardenImg.src = Game.GARDEN_IMAGE;
  };

  Game.DIM_X = 800;
  Game.DIM_Y = 400;
  Game.DIM_GARDEN = 600;
  Game.GARDEN_IMAGE = "./images/dirt.jpg";
  Game.FIELD_IMAGE = "./images/field.gif";
  Game.FPS = 32;

  Game.prototype = {
    gardenClick: function (x, y) {
      if(this.chosen) {
        this.add(x, y);
      }
    },

    add: function (x, y) {
      if(this.chosen === 'beehive') {
        if(this.harmonicHoney >= CCB.BeeHive.COST && this.inField([x, y])) {
          this.harmonicHoney -= CCB.BeeHive.COST;
          this.beeHives.push(new CCB.BeeHive({ game: this, pos: [x, y] }));
        }
      } else {
        if(this.harmonicHoney >= CCB.Bell.COST && this.inGarden([x, y])) {
          this.harmonicHoney -= CCB.Bell.COST;
          this.bells.push(new CCB.Bell({ note: this.chosen, pos: [x, y] }));
        }
      }
    },

    inField: function (pos) {
      return pos[0] < (Game.DIM_X - Game.DIM_GARDEN) / 2 ||
        pos[0] > (Game.DIM_X + Game.DIM_GARDEN) / 2;
    },

    inGarden: function (pos) {
      return pos[0] > (Game.DIM_X - Game.DIM_GARDEN) / 2 &&
        pos[0] < (Game.DIM_X + Game.DIM_GARDEN) / 2;
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
      ctx.drawImage(this.fieldImg, 0, 0, (Game.DIM_X - Game.DIM_GARDEN) / 2, Game.DIM_Y);
      ctx.drawImage(this.fieldImg, (Game.DIM_X + Game.DIM_GARDEN) / 2, 0, (Game.DIM_X - Game.DIM_GARDEN) / 2, Game.DIM_Y);
      ctx.drawImage(this.gardenImg, (Game.DIM_X - Game.DIM_GARDEN) / 2, 0, Game.DIM_GARDEN, Game.DIM_Y);
      this.bells.forEach(function (bell) { bell.draw(ctx); })

      var bees = [];
      this.beeHives.forEach(function (hive) {
        hive.draw(ctx); 
        bees = bees.concat(hive.bees);
      })
      bees.forEach(function (bee) { bee.draw(ctx); });
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
