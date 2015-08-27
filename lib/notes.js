(function () {
  var CCB = window.CCB = window.CCB || {};

  var Note = CCB.Note = function (name) {
    this.name = name;
    this.hz = CCB.hz(this.name);

    this.osc = new CCB.createOscillator(this.hz);
    this.gain = new CCB.createGainNode;
    this.osc.connect(this.gain);
  };

  Note.prototype = {

    // do I need this? ...
    interval: function (root) {
      var interval = this.name[0].charCodeAt() - root[0].charCodeAt();
      var octave = parseInt(this.name[1]) - parseInt(root[1]);

      return interval + 8 * octave;
    },

    color: function () {
      // color based on tone, alpha based on octave?
      // or octaves have different brightness/dullness values?
    
      var ratio = 3;
      for(var i = 0; ratio > 2; i++) {
        ratio = this.hz / (110 * Math.pow(2, i))
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
      ctx.fillStyle = this.color();
      ctx.beginPath();

      ctx.arc(
        this.pos[0],
        this.pos[1],
        this.radius,
        0,
        2 * Math.PI,
        false
      );

      ctx.fill();
    },

    ring: function (volume) {
      if(volume > this.gain.gain.value) {
        clearTimeout(this.timeout);
        this.ringFade(volume);
      }
    },

    ringFade: function (volume) {
      this.gain.gain.value = volume;
      if(volume <= 0) { return; }

      this.timeout = setTimeout(function () { 
        this.ringFade(volume - .05); 
      }.bind(this), 300);
    },

    clash: function (root) {
      return Math.abs(CCB.equalTemp(this.name, root) - this.hz);
    }
  }
})();
