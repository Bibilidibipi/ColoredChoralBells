(function (){
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
    this.width = options.width || BeeHive.WIDTH;
  };

  BeeHive.COST = 1;
  BeeHive.IMAGE = "./images/beeHive.png";
  BeeHive.WIDTH = 50;

  BeeHive.prototype = {
    origin: function () {
      return [
        this.width * (22/100),
        this.width * (61/100)
      ];
    },

    addBee: function () {
      this.bees.push(new CCB.Bee({ beeHive: this, game: this.game }));
    },

    acceptHoney: function (honey) {
      this.game.harmonicHoney += honey; 
    },

    evolve: function (noteName) {
      this.bees.forEach(function (bee) { bee.evolve(noteName); })
    },

    step: function () {
      this.bees.forEach(function (bee) { bee.step(); })
    },

    draw: function (ctx) {
      var img = new Image();
      img.src = BeeHive.IMAGE;
      ctx.drawImage(
        img, 
        this.pos[0] - this.origin()[0], 
        this.pos[1] - this.origin()[1], 
        this.width, 
        this.width
      );
    }
  };
})();
