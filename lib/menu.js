(function () {
  var CCB = window.CCB = window.CCB || {};

  var Menu = CCB.Menu = function (options) {
    this.el = options.el; 
    this.muteEl = new Image();
    this.muteEl.width = 50;
    this.muteEl.height = 50;
    this.muteEl.src = Menu.UNMUTED_IMAGE;
    this.muteEl.addEventListener("click", this.switchMute.bind(this));
    this.muted = false;
  }

  Menu.MUTED_IMAGE = './images/muted.svg';
  Menu.UNMUTED_IMAGE = './images/unmuted.png';

  Menu.prototype = {
    render: function () {
      var sound_image_path = this.muted ? Menu.MUTED_IMAGE : Menu.UNMUTED_IMAGE;
      this.muteEl.src = sound_image_path;
      this.el.innerHTML = "<div class='menu'></div>";
      this.el.appendChild(this.muteEl);
    },

    switchMute: function () {
      this.muted = !this.muted;
      if(this.muted) {
        CCB.muteNode.gain.value = 0;
      } else {
        CCB.muteNode.gain.value = 1;
      }
      this.render();
    },
  }
})();
