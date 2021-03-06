(function () {
  var CCB = window.CCB = window.CCB || {};

  var infoEl = document.getElementById("info");
  var selectEl = document.getElementById("select");
  var waveEl = document.getElementById("wave");
  waveEl.width = CCB.Wave.WIDTH;
  waveEl.height = CCB.Wave.HEIGHT;

  var gardenEl = document.getElementById("garden");
  gardenEl.width = CCB.Game.DIM_X;
  gardenEl.height = CCB.Game.DIM_Y;

  new CCB.GameView(infoEl, selectEl, waveEl, gardenEl).start();
})();

