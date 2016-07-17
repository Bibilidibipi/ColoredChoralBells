(function () {
  var CCB = window.CCB = window.CCB || {};

  var GameView = CCB.GameView = function (options) {
    this.game = new CCB.Game();

    this.infoEl = options.infoEl;

    this.menu = new CCB.Menu({ el: options.menuEl });
    this.select = new CCB.Select({ el: options.selectEl });
    options.selectEl.addEventListener("click", this.choose.bind(this));

    this.waveCtx = options.waveEl.getContext("2d");
    this.wave = new CCB.Wave(CCB.analyser);

    this.gardenEl = options.gardenEl;
    this.gardenCtx = options.gardenEl.getContext("2d");
    options.gardenEl.addEventListener("click", this.gardenClick.bind(this));
    options.gardenEl.addEventListener("mousemove", this.game.ring.bind(this.game));
  };

  GameView.prototype = {
    start: function () {
      var gameView = this;
    
      this.timerId = setInterval(
        function () {
          gameView.wave.step();
          gameView.wave.draw(gameView.waveCtx);

          gameView.game.step();
          gameView.game.draw(gameView.gardenCtx);

          gameView.renderInfo();
        }, 1000 / CCB.Game.FPS    
      );

      this.menu.render();
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
      document.getElementById("info-hh").innerHTML = 
        "HH: " + this.game.harmonicHoney.toFixed(1);
      document.getElementById("info-ep").innerHTML = 
        "EP: " + this.game.evolutionPoints;
    }
  }
})();
