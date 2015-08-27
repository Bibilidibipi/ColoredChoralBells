(function () {
  var CCB = window.CCB = window.CCB || {};

  CCB.letters = [
    "C",
    "D",
    "E",
    "F",
    "G",
    "A",
    "B"
  ];

  // octave 2
  CCB.roots = {
    "C": 65.4075,
    "D": 73.5825,
    "E": 81.7575,
    "F": 87.2075,
    "G": 98.11,
    "A": 109.0125,
    "B": 122.6375
  };

  // must add half steps!!!
  CCB.ratios = {
    0: 1,
    1: 9/8,
    2: 5/4,
    3: 4/3,
    4: 3/2,
    5: 5/3,
    6: 15/8
  };

  CCB.hz = function (name) {
    var root = name[0];
    var octave = parseInt(name[1]);
    return CCB.roots[root] * (Math.pow(2, octave - 2));
  };

  // fix using half steps
  CCB.equalTemp = function (name, root) {
    var letter = name[0];
    var octave = parseInt(name[1]);
    if(CCB.letters.indexOf(root) > CCB.letters.indexOf(letter)) { octave -= 1; }
    var ratio = CCB.ratios[(CCB.letters.indexOf(letter) - CCB.letters.indexOf(root) + 7) % 7];
    var rootHz = CCB.roots[root] * (Math.pow(2, octave - 2));
    return rootHz * ratio;
  };

  CCB.d = function (p1, p2) {
    return Math.pow((Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1]- p2[1], 2)), 1/2);
  };

  CCB.dir = function (p1, p2) {
    var d = CCB.d(p1, p2);
    return [(p2[0] - p1[0]) / d, (p2[1] - p1[1]) / d];
  };

  CCB.addVec = function (v1, v2) {
    return [v1[0] + v2[0], v1[1] + v2[1]];
  };

  CCB.mulVec = function (v, c) {
    var mult = [];
    v.forEach(function(el) {
      mult.push(c * el);
    })

    return mult;
  };

  CCB.same = function (v1, v2) {
    if(v1.length != v2.length) { return false; }

    var same = true;
    var i = 0;
    v1.forEach(function (n) {
      if(n != v2[i]) {
        same = false;
      }
      i += 1;
    })

    return same;
  };
  
  CCB.ctx = new (window.AudioContext || window.webkitAudioContext)();

  CCB.createOscillator = function(freq){
    var osc = CCB.ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq;
    osc.detune.value = 0;
    osc.start(CCB.ctx.currentTime);
    return osc;
  };

  CCB.createGainNode = function(){
    var gainNode = CCB.ctx.createGain();
    gainNode.gain.value = 0;
    gainNode.connect(CCB.ctx.destination);
    return gainNode;
  };
  
  CCB.noteTemplates = [
    new CCB.Note("C4"),
    new CCB.Note("D4"),
    new CCB.Note("E4"),
    new CCB.Note("F4"),
    new CCB.Note("G4"),
    new CCB.Note("A4"),
    new CCB.Note("B4"),
    new CCB.Note("C5")
  ];

  CCB.approach = function (pos, goal, dir, speed) {
    if(CCB.d(pos, goal) <= speed) { return goal; }

    return CCB.addVec(pos, CCB.mulVec(dir, speed));
  };
})();

