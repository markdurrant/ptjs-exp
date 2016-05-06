// spaces are the canvas element pt.js will render too.
// new CanvasSpace() takes arguments for "canvas element id", "background color", and "context"
// .display() takes one argument "div element id"
var space = new CanvasSpace("canvas", "#f1f1f1", "2d").display("#pt");

// forms are used to draw and style geometry
// new Form() takes one argument "CanvasSpace"
var form = new Form(space);

// create a new point
var dot =  new Point(250, 250);

// create circle shapes
// new Circle() takes a Point as an argument
var circle = new Circle(dot).setRadius(100);
var mouseCircle = new Circle(250, 250).setRadius(100);

// set the drawing style to no fill with a 5px blue stroke
form.fill(false).stroke("#3020d0", 5);

// pt.js requires an object with a function as a property named "animate" to render
// think of it as a robot(s) that does your drawing for you
var drawBot = {
  // the animate function will be called every frame
  // it gives you "time elapsed", "time since last render", "space context"
  animate: function (time, fs, context) {
    // draw the circles
    form.circle(circle);
    form.circle(mouseCircle);

    // get the intersection of the two circles
    var intersects = circle.intersectCircle(mouseCircle);

    // if the circels are interesecting
    if (intersects.length > 0) {
      // draw a line from the first intersection to the second
      form.line(new Line(intersects[0]).to(intersects[1]));
    }
  },
  // the onMouseAction function will be called every time the mouse moves
  // it gives you "type of mouse action", "x position", "y position", and " mouse event"
  onMouseAction: function(type, x, y, evt) {
    // if the mouse is moving
    if(type = "move") {
      // set x and y cords of mouse circle to be the same as the cursor
      mouseCircle.set(x, y);
    }
  }
}

// add the draw bot to the space
space.add(drawBot);

// collect mouse events
space.bindMouse();

// render the space
space.play();