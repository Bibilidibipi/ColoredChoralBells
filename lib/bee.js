(function () {
  var CCB = window.CCB = window.CCB || {};

  var Bee = CCB.Bee = function (options) {
    this.game = options.game;
    this.beeHive = options.beeHive;
    this.pos = this.beeHive.pos;
    this.maxHoney = options.maxHoney || Bee.MAX_HONEY;
    this.width = options.width || Bee.WIDTH;
    
    this.honey = 0;
    this.visited = [];

    this.flying = true;
    this.chooseTarget();
    this.changeSpeed();
    setInterval(this.changeSpeed.bind(this), 1000);
    this.changeDir();
    setInterval(this.changeDir.bind(this), 1000);
  };

  Bee.IMAGE = "./images/bee.png";
  Bee.WIDTH = 10;
  Bee.SPEED = 1;
  Bee.MAX_HONEY = 4;
  Bee.HONEY_GAIN = .5;
  Bee.HIVE_WAIT = 1000;
  Bee.BELL_WAIT = 1000;

  Bee.prototype = {
    chooseTarget: function () {
      var bells;
      if(this.root) {
        bells = this.game.bells.filter(function (bell) {
          return bell.note.name === this.root;
        }.bind(this));
      } else {
        bells = this.game.bells.filter(function (bell) {
          var include = true;
          this.visited.forEach(function (visited) {
            if(bell === visited) { include = false; }   
          });
          return include;
        }.bind(this));
      }

      if(this.honey >= this.maxHoney || bells.length === 0) {
        this.target = this.beeHive;
        return;
      }

      this.target = bells[Math.floor(Math.random() * bells.length)];
    },
    
    evolve: function(root) {
      this.root = root;
    },

    changeSpeed: function () {
      this.speed = Bee.SPEED * (Math.random() + .5);
    },

    changeDir: function () {
      this.dir = CCB.dir(this.pos, this.target.pos);
      this.dir[0] += Math.random() - .5;
      this.dir[1] += Math.random() - .5;
    },
    
    approach: function () {
      if(CCB.d(this.pos, this.target.pos) <= this.speed) { 
        return this.target.pos; 
      }
      if(CCB.d(this.pos, this.target.pos) <= 5 * this.speed) {
        var dir = CCB.dir(this.pos, this.target.pos);
        return CCB.addVec(this.pos, CCB.mulVec(dir, this.speed)); 
      }

      return CCB.addVec(this.pos, CCB.mulVec(this.dir, this.speed));
    },

    land: function (bell) {
      if(this.flying) {
        if(CCB.same(this.pos, this.beeHive.pos)) {
          this.enterHive();
        } else {
          this.visitBell(bell);
        }
      }
    },

    visitBell: function (bell) {
      this.flying = false;
      this.visited.push(bell);
      bell.beeRing();
      this.honey += Bee.HONEY_GAIN;

      setTimeout(
        function () { this.flying = true; this.chooseTarget(); }.bind(this), 
        Bee.BELL_WAIT
      );
    },

    enterHive: function () {
      this.flying = false;
      this.beeHive.acceptHoney(this.honey);
      this.honey = 0;
      this.visited = [];
      setTimeout(
        function () { this.flying = true; this.chooseTarget(); }.bind(this), 
        Bee.HIVE_WAIT
      );
    },

    step: function () {
      if(!this.flying) { return; };
      if(CCB.same(this.pos, this.target.pos)) { this.land(this.target); }

      this.pos = this.approach();
    },

    draw: function (ctx) {
      if(!this.flying) { return; }

      var img = new Image();
      img.src = Bee.IMAGE;
      ctx.drawImage(img, this.pos[0], this.pos[1], this.width, this.width);
    }
  };
})();
