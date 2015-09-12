(function () {
  var CCB = window.CCB = window.CCB || {};

  var BeeHive = CCB.BeeHive = function (options) {
    this.pos = options.pos;
    this.game = options.game;
    this.bees = [];
    var numBees = options.numBees || 2;
    for(var i = 0; i < numBees; i++) {
      this.addBee();
    }
    this.color = options.color || BeeHive.COLOR;
    this.radius = BeeHive.RADIUS;
  };

  BeeHive.COLOR = "yellow";

  BeeHive.IMAGE = "./images/beeHive.png";
  BeeHive.WIDTH = 100;
  BeeHive.HEIGHT = 100;
  BeeHive.ORIGIN = [26, 64];
  BeeHive.COST = 1;

  BeeHive.prototype = {
    addBee: function () {
      this.bees.push(new CCB.Bee({ beeHive: this, game: this.game }));
    },

    acceptHoney: function (honey) {
      this.game.harmonicHoney += honey; 
    },

    step: function () {
      this.bees.forEach(function (bee) { bee.step(); })
    },

    draw: function (ctx) {
      var img = new Image();
      img.src = BeeHive.IMAGE;
      ctx.drawImage(img, this.pos[0] - BeeHive.ORIGIN[0], this.pos[1] - BeeHive.ORIGIN[1], BeeHive.WIDTH, BeeHive.HEIGHT);
    }
  };
})();
