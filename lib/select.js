(function () {
  var CCB = window.CCB = window.CCB || {};

  var Select = CCB.Select = function (options) {
    this.el = options.el;
  };

  Select.prototype = {
    render: function () {
      var content = "";
      CCB.noteTemplates.forEach(function (note) {
        content += " <div class='select-bell' style='background-color: " + note.color() + "' id='" + note.name + "'></div> ";
      });
      content += " <div class='select-beehive' style='background-color: " + CCB.BeeHive.COLOR + "' id='beehive'></div> ";

      this.el.innerHTML = content;
    }
  }
})();
