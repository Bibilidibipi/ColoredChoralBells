(function () {
  var CCB = window.CCB = window.CCB || {};

  var Wave = CCB.Wave = function (analyser) {
    this.analyser = analyser;
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
  };

  Wave.WIDTH = 800;
  Wave.HEIGHT = 100;
  Wave.LINE_WIDTH = 2;
  Wave.BUFFER_LENGTH = 1000;

  Wave.prototype = {
    draw: function (ctx) {
      ctx.fillStyle = "rgb(200, 200, 200)";
      ctx.fillRect(0, 0, Wave.WIDTH, Wave.HEIGHT);

      ctx.lineWidth = Wave.LINE_WIDTH;
      ctx.strokeStyle = "rgb(0, 0, 0)";
      ctx.beginPath();

      var sliceWidth = Wave.WIDTH / Wave.BUFFER_LENGTH;
      var x = 0;
      for(var i = 0; i < this.analyser.frequencyBinCount; i++) {
        var v = this.dataArray[i] / 128;
        var y = v * Wave.HEIGHT / 2;
        if(i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.lineTo(Wave.WIDTH, Wave.HEIGHT / 2);
      ctx.stroke();
    },

    step: function () {
      CCB.analyser.getByteTimeDomainData(this.dataArray);
    }
  };
})();
