(function () {
  var CCB = window.CCB = window.CCB || {};

  var Select = CCB.Select = function (options) {
    this.el = options.el;
  };

  Select.prototype = {
    render: function () {
      var content = "To buy things: click on flower and then click on dirt, or click on beehive and then click on grass<br/>";
      CCB.noteTemplates.forEach(function (note) {
        content += 
          " <div class='select-bell'><img id='" + 
          note.name + 
          "' width=50 height=50 src=" + 
          CCB.images[note.name] + 
          "></div> ";
      });
      content += 
        " <div class='select-beehive'><img id='beehive' width=50 height=50 src='" + 
        CCB.BeeHive.IMAGE + 
        "' ></div> ";

      this.el.innerHTML = content;
    },

    showPrice: function (el) {
      el.addClass('show-price');
    },

    hidePrice: function (el) {
      el.removeClass('show-price');
    }
  }
})();
