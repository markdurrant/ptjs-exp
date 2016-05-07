var space = new CanvasSpace("canvas", "#f1f1f1", "2d").display("#pt");
var form = new Form(space).fill("#33e").stroke(false);

var numDots = 400;
var numCandidates = 10;

var dots = [new Vector(Math.random() * space.size.x, Math.random() * space.size.y)];

function closest(vector, vectorArray) {
  var closest;
  var distance = space.size.x * space.size.y;

  for( var v = 0; v < vectorArray.length; v++) {
    if(vector.distance(vectorArray[v]) < distance) {
      distance = vector.distance(vectorArray[v]);
      closest = vectorArray[v];
    }
  }

  return closest;
}

for( var d = 0; d < numDots; d++) {
  var bestCandidate, bestDistance = 0;

  for( var c = 0; c < numCandidates; c++) {
    var candidate = new Vector(Math.random() * space.size.x, Math.random() * space.size.y);
    var distance =  candidate.distance(closest(candidate, dots));
    if (distance > bestDistance) {
      bestDistance = distance;
      bestCandidate = candidate;
    }
  }

  dots.push(bestCandidate);
}

console.log(dots);

var drawBot = {
  animate: function (time, fs, context) {
    for( var i = 0; i < dots.length; i++) {
      form.circle(new Circle(dots[i]).setRadius(2));
    }
  }
};

space.add(drawBot);
space.play();