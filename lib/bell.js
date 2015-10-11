(function () {
  var CCB = window.CCB = window.CCB || {};

  var Bell = CCB.Bell = function (options) {
    this.note = new CCB.Note(options.note);
    this.pos = options.pos;
    this.width = options.width || Bell.WIDTH;

    this.image = new Image();
    this.image.src = CCB.images[options.note];
  };

  Bell.COST = 1;
  Bell.WIDTH = 30;

  Bell.prototype = {
    color: function () {
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

    origin: function () {
      return [
        this.width / 2,
        this.width / 2
      ];
    },

    draw: function (ctx) {
      ctx.drawImage(
        this.image, 
        this.pos[0] - this.origin()[0], 
        this.pos[1] - this.origin()[1], 
        this.width, 
        this.width
      );
    },

    step: function () {
      this.width += 1/(4 * this.width);
    },

    evolve: function () {
      
    },

    income: function () {
      return this.width / (20 * this.note.hz);
    },

    beeRing: function () {
      this.note.beeRing();
    },

    ring: function (pos) {
      var d = CCB.d(pos, this.pos);
      this.note.ring(this.width * (.01 - (d / 10000)));
    }
  }
})();
