function Food(id) {
	this.id = id;
	this.pos = __randomTarget(0.6);
	this.eaten = false;
	this.size = createVector(5, 5);
}

Food.prototype.collide = function(agent) {
	if (!agent.isFed) {
		this.eaten = true;
		foods.splice(this.id, 1);
	}
}

function cullEatenFood() {
	for (var i = foods.length - 1; i >= 0; i--) {
		if (foods[i].eaten)
			foods.splice(i, 1);
	}
}

function makeFoods(count) {
	var f = [];
	for (var i = 0; i < count; i++) {
		f[i] = new Food(i);
	}
	return f;
}

function drawFoods() {
	for (var i = 0; i < foods.length; i++) {
		if (!foods[i].eaten) {
			push();
			fill(225);
			ellipse(foods[i].pos.x, foods[i].pos.y, foods[i].size.x);
			pop();
		}
	}
}