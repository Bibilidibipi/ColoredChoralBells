(function () {
  var CCB = window.CCB = window.CCB || {};

  CCB.ctx = new (window.AudioContext || window.webkitAudioContext)();
  CCB.analyser = CCB.ctx.createAnalyser();
  CCB.analyser.connect(CCB.ctx.destination);

  CCB.createOscillator = function (freq) {
    var osc = CCB.ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq;
    osc.detune.value = 0;
    osc.start(CCB.ctx.currentTime);
    return osc;
  };

  CCB.createGainNode = function () {
    var gainNode = CCB.ctx.createGain();
    gainNode.gain.value = 0;
    gainNode.connect(CCB.analyser);
    return gainNode;
  };
})();
