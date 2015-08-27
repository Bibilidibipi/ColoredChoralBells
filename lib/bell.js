(function () {
  var CCB = window.CCB = window.CCB || {};

  var Bell = CCB.Bell = function (options) {
    this.note = new CCB.Note(options.note);
    this.pos = options.pos;
    this.radius = options.radius || Bell.RADIUS;
  };

  Bell.RADIUS = 25;
  Bell.COST = 10;
  Bell.IMAGE = "./images/faerieBell.png";
  Bell.WIDTH = 60;
  Bell.HEIGHT = 60;

  Bell.prototype = {
    db: function () {
      return this.radius * 2;
    },

    color: function () {
      // color based on tone, alpha based on octave?
      // or octaves have different brightness/dullness values?
    
      var ratio = 3;
      for(var i = 0; ratio > 2; i++) {
        ratio = this.note.hz / (110 * Math.pow(2, i))
      }

      var fill = (ratio - 1) * 767 - 1;
      var colors = [
        Math.max(255 - Math.min(fill, 768 - fill), 0),
        Math.max(255 - Math.abs(fill - 511), 0),
        Math.max(255 - Math.abs(fill - 255), 0)
      ].map(function (color) {
        return ("0" + Math.floor(color).toString(16)).slice(-2);
      });

      return "#" + colors.join('');
    },

    draw: function (ctx) {
      var img = new Image();
      img.src = Bell.IMAGE;
      img.style = "background-color: red"
      ctx.drawImage(img, this.pos[0], this.pos[1], Bell.WIDTH, Bell.HEIGHT);
    },

    step: function () {
      this.radius += 1/(4 * this.radius);
    },

    evolve: function () {
      
    },

    income: function () {
      return this.radius / (20 * this.note.hz);
    },

    ring: function (pos) {
      var d = CCB.d(pos, this.pos);
      this.note.ring(this.radius * (.01 - (d / 10000)));
    }
  }
})();
