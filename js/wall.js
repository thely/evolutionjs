function Wall(id, direction) {
	this.id = id;
	this.direction = direction;

	var w = 5;
	if (direction == "top" || direction == "bottom") {
		this.size = createVector(dim.x, w);
	}
	else {
		this.size = createVector(w, dim.y);
	}

	switch (direction) {
		case "top":
		case "left":
			this.pos = createVector(0,0);
			break;
		case "right":
			this.pos = createVector(dim.x - w, 0);
			break;
		case "bottom":
			this.pos = createVector(0, dim.y - w);
	}
}

function makeWalls() {
	var walls = [];
	var dirs = ["left","right","top","bottom"];
	for (var i = 0; i < dirs.length; i++) {
		walls[i] = new Wall(i, dirs[i]);
	}

	return walls;
}