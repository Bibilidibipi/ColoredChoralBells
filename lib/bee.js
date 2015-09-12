(function () {
  var CCB = window.CCB = window.CCB || {};

  var Bee = CCB.Bee = function (options) {
    this.game = options.game;
    this.honey = 0;
    this.visited = [];
    this.beeHive = options.beeHive;
    this.pos = this.beeHive.pos;
    this.flying = true;

    this.chooseTarget();
    this.changeSpeed();
    setInterval(this.changeSpeed.bind(this), 1000);
    this.changeDir();
    setInterval(this.changeDir.bind(this), 1000);
  };

  Bee.SPEED = 1;
  Bee.WIDTH = 10;
  Bee.HEIGHT = 10;
  Bee.IMAGE = "./images/bee.png";

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
      if(CCB.d(this.pos, this.target.pos) <= this.speed) { return this.target.pos; }
      if(CCB.d(this.pos, this.target.pos) <= 5 * this.speed) {
        var dir = CCB.dir(this.pos, this.target.pos);
        return CCB.addVec(this.pos, CCB.mulVec(dir, this.speed)); 
      }

      return CCB.addVec(this.pos, CCB.mulVec(this.dir, this.speed));
    },

    step: function () {
      if(!this.flying) { return; };
      if(CCB.same(this.pos, this.target.pos)) { this.land(this.target); }

      this.pos = this.approach();
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

    enterHive: function () {
      this.flying = false;
      this.beeHive.acceptHoney(this.honey);
      this.honey = 0;
      this.visited = [];
      setTimeout(function () { this.flying = true; this.chooseTarget(); }.bind(this), 10000);
    },

    draw: function (ctx) {
      if(!this.flying) { return; }

      var img = new Image();
      img.src = Bee.IMAGE;
      ctx.drawImage(img, this.pos[0], this.pos[1], Bee.WIDTH, Bee.HEIGHT);
    },

    visitBell: function (bell) {
      this.flying = false;
      this.visited.push(bell);
      bell.beeRing();
      this.honey += 1;

      setTimeout(function () { this.flying = true; this.chooseTarget(); }.bind(this), 2500);
    }
  };
})();