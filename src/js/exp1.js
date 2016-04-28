var space = new CanvasSpace( "hello", "#f1f1f1" ).display( "#pt" );
var form = new Form(space);
var dot = new Circle(250, 250).setRadius(50);
var another = new Circle(100, 100).setRadius(50);;

var bot = {
  animate: function(time, fs, context){
    form.fill('#999');
    form.text(new Point(20, 20), Math.round(1000 / fs));

    form.fill('#5af').stroke(false);
    dot.setRadius(Math.abs(500 - time % 1000) / 15 + 50);
    form.circle(dot);

    form.fill(false).stroke("#fc0", 5);
    form.circle(another);

    var hits = another.intersectCircle(dot);
    if (hits.length > 0) {
      form.stroke('#fff').fill('#0c9');
      form.line(new Line(hits[0]).to(hits[1]));
      form.points(hits, 1, true);
    }
  },
  onMouseAction: function(type, x, y, evt) {
    if(type == "move") {
      another.set(x, y);
    }
  }
}

space.add(bot);
space.bindMouse();
space.play();