function __setAngle(vector, value) {
	var len = vector.mag();
	vector.x = Math.cos(value) * len;
	vector.y = Math.sin(value) * len;
	return vector;
}

// pick a target point in a central part of the canvas
function __randomTarget(scale) {
	var shrunk = p5.Vector.mult(dim, scale);
	var off = p5.Vector.mult(p5.Vector.sub(dim, shrunk), 0.5);

	var target = createVector(random(0, shrunk.x) + off.x, random(0, shrunk.y) + off.y);
	return target;
}

// function __randomNextPos(pos, maxVel) {
// 	var legal = false;
// 	var next;
// 	while (!legal) {
// 		var dir = p5.Vector.random2D().mult(maxVel);
// 		next = p5.Vector.add(pos, dir);
// 		if (next.x >= 0 && next.x < dim.x && next.y >= 0 && next.y < dim.y) {
// 			legal = true;
// 		}
// 	}

// 	return next;
// }

function __randomStartPos(size) {
	var z = ["left","right","top","bottom"]
	var dir = random(z);
	var x, y;
	var vec;
	switch(dir) {
		case "left":
			vec = createVector(0, random(0, dim.y-1));
			break;
		case "right":
			vec = createVector(dim.x-size.x-1, random(0, dim.y-1));
			break;
		case "top":
			vec = createVector(random(0, dim.x-1), 0);
			break;
		case "bottom":
			vec = createVector(random(0, dim.x-1), dim.y-size.y-1);
			break;
	}

	return vec;
}

function __randomColor() {
	var color = color(
		Math.floor(random(0, 256)),
		Math.floor(random(0, 256)),
		Math.floor(random(0, 256))
	);
	return color;
}

function __colorFromSpeed(speed) {

}



