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
    "C#": 68.135,
    "D": 73.5825,
    "Eb": 78.49,
    "E": 81.7575,
    "F": 87.2075,
    "F#": 91.98,
    "G": 98.11,
    "Ab": 104.65,
    "A": 109.0125,
    "Bb": 117.7325,
    "B": 122.6375
  };

  CCB.ratios = {
    0: 1,
    1: 25/24,
    2: 9/8,
    3: 6/5,
    4: 5/4,
    5: 4/3,
    6: 45/32,
    7: 3/2,
    8: 8/5,
    9: 5/3,
    10: 9/5,
    11: 15/8
  };

  CCB.hz = function (name) {
    var root = name.slice(0, name.length - 1);
    var octave = parseInt(name[name.length - 1]);
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

  CCB.color = function (image, alpha) {
    
  };

  CCB.d = function (p1, p2) {
    return Math.pow((Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1]- p2[1], 2)), 1/2);
  };

  CCB.dir = function (p1, p2) {
    if(p1 === p2){ return [0, 0]; }
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
  
  CCB.noteTemplates = [
    new CCB.Note("C4"),
    new CCB.Note("C#4"),
    new CCB.Note("D4"),
    new CCB.Note("Eb4"),
    new CCB.Note("E4"),
    new CCB.Note("F4"),
    new CCB.Note("F#4"),
    new CCB.Note("G4"),
    new CCB.Note("Ab4"),
    new CCB.Note("A4"),
    new CCB.Note("Bb4"),
    new CCB.Note("B4"),
    new CCB.Note("C5")
  ];

  CCB.images = {
    "C4": "./images/lilacBell.png",
    "C#4": "./images/lilacBell.png",
    "D4": "./images/blueBell.png",
    "Eb4": "./images/lilacBell.png",
    "E4": "./images/pinkBell.png",
    "F4": "./images/orangeBell.png",
    "F#4": "./images/lilacBell.png",
    "G4": "./images/yellowBell.png",
    "Ab4": "./images/lilacBell.png",
    "A4": "./images/stripedBell.png",
    "Bb4": "./images/lilacBell.png",
    "B4": "./images/whiteBell.png",
    "C5": "./images/faerieBell.png"
  };
 })();

