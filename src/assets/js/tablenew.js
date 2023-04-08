$(function() {

var grid = [];
var gridSize = 20;
var gridSizePx = 150;

function defineMoveableObjects() {
  //Assign these items as selectable
  //var selectableItems = $(document.getElementsByClassName('resize'));
  makeResizable();
}

function makeResizable() {
  $(".resize").resizable({
    grid: [gridSizePx,40],
    handles: "e,ne,n,s,se",
    containment: ".container",
    start:function(event,ui) {
      $(this).css("zIndex",1000);
    },
    stop:function(event,ui) {
    }
  });
  //Make them draggable
  $(".resize").draggable({
    grid: [gridSizePx,40],
    opacity:.7,
    zIndex:1000,
    containment: ".container",
    start: function(event, ui) {
    },
    stop: function(event, ui) {
        //Update the original position to the new position
        this._originalPosition = ui.position;
        ui.helper.css('zIndex',1000);
    }
  });
}
defineMoveableObjects();
 });
