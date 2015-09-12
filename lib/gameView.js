(function () {
  var CCB = window.CCB = window.CCB || {};

  var GameView = CCB.GameView = function (infoEl, selectEl, gardenEl) {
    this.game = new CCB.Game();

    this.infoEl = infoEl;

    // this.selectEl = selectEl;
    this.select = new CCB.Select({ el: selectEl });
    selectEl.addEventListener("click", this.choose.bind(this));

    this.gardenEl = gardenEl;
    this.gardenCtx = gardenEl.getContext("2d");
    gardenEl.addEventListener("click", this.gardenClick.bind(this));
    gardenEl.addEventListener("mousemove", this.game.ring.bind(this.game));
  };

  GameView.prototype = {
    start: function () {
      var gameView = this;
    
      this.timerId = setInterval(
        function () {
          gameView.game.step();
          gameView.game.draw(gameView.gardenCtx);

          gameView.renderInfo();
        }, 1000 / CCB.Game.FPS    
      );

      this.select.render();
    },

    stop: function () {
      clearInterval(this.timerId);
    },

    choose: function (event) {
      this.game.chosen = event.target.id;
    },

    gardenClick: function (event) {
      var x = event.pageX - this.gardenEl.offsetLeft;
      var y = event.pageY - this.gardenEl.offsetTop;

      this.game.gardenClick(x, y);
    },

    renderInfo: function () {
      this.infoEl.innerHTML = "Harmonic Honey: " + this.game.harmonicHoney.toFixed(1);
    }
  }
})();
