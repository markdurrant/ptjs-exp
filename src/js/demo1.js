// Space
// ==================
// this is canvas element pt.js will render too.
//
// new CanvasSpace() takes arguments for "canvas element id", "background color", and "context"
// .display() takes one argument "div element id"
var space = new CanvasSpace("canvas", "#f1f1f1", "2d").display("#pt");


// Form
// =================
// used to draw and style geometry

// new Form() takes one argument "CanvasSpace"
var form = new Form(space);

// create a new point
var dot =  new Point(250, 250);
var circle = new Circle(dot).setRadius(100);

var mouseCircle = new Circle(250, 250).setRadius(60);

var mouseCords = {x: 0, y: 0};

// pt.js requires an object with a function as a property named "animate" to render
var drawBot = {
  // animate function gives you "time elapsed", "time since last render", "space context"
  animate: function (time, fs, context) {
    form.fill(false).stroke("#3020d0", 5);
    form.circle(circle);
    form.circle(mouseCircle);
  },
  onMouseAction: function(type, x, y, evt) {
    if(type = "move") {
      mouseCircle.set(x, y);
    }
  }
}

// add the draw bot to the space
space.add(drawBot);

space.bindMouse();

// render the space
space.play();