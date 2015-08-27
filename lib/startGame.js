(function () {
  var CCB = window.CCB = window.CCB || {};

  var infoEl = document.getElementById("info");
  var selectEl = document.getElementById("select");

  var gardenEl = document.getElementById("garden");
  gardenEl.width = CCB.Game.DIM_X;
  gardenEl.height = CCB.Game.DIM_Y;

  new CCB.GameView(infoEl, selectEl, gardenEl).start();
})();

