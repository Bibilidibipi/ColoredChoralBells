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

    beeRing: function () {
      if(this.timeout) {
        this.gain.gain.value = Math.max(this.gain.gain.value + .1, .2);
      } else {
        this.ring(.2);
      }
    },

    ring: function (volume) {
      if(volume > this.gain.gain.value) {
        this.gain.gain.value = volume;
        this.ringFade();
      }
    },

    ringFade: function () {
      var volume = this.gain.gain.value - .0015;
      this.gain.gain.value = Math.max(volume, 0);
      clearTimeout(this.timeout);

      if(volume <= 0) { delete this.timeout; return; }

      this.timeout = setTimeout(function () { 
        this.ringFade(); 
      }.bind(this), 10);
    },

    clash: function (root) {
      return (Math.abs(CCB.equalTemp(this.name, root) - this.hz)) / this.hz;
    }
  }
})();
