

function Guy(gen, dna) {
	this.randomColor = function() {
		return color(
			Math.floor(random(0, 256)),
			Math.floor(random(0, 256)),
			Math.floor(random(0, 256))
		);
	}

	this.setColorFromVal = function(baseVal, val) {
		var baseBlue = 128 + (val - baseVal) * 30;
		return color(53, 147, baseBlue);
	}

	this.generation = gen;
	this.DNA = dna ? dna : new DNA();
	this.steering = new SteeringManager(this, 5);

	this.reset();
}

Guy.prototype.reset = function() {
	this.size = createVector(5, 5);
	this.color = this.randomColor();

	this.pos = __randomStartPos(this.size);
	this.vel = p5.Vector.mult(dim, 0.5);
	this.maxVel = 5;
	// this.mass = random(5, 15);
	this.mass = 5;
	this.target = __randomTarget(0.6);
	this.nextDecisionChance = 500;
	this.nextDecision = millis() + random(0, 500);

	this.isFed = 0;
	this.reachHome = false;
	this.energy = 150;
	this.state = "alive";

	this.DNA.update(this);
	this.color = this.setColorFromVal(3, this.maxVel);

	return this;
}

Guy.prototype.update = function() {
	var now = millis();
	this.reduceEnergy();

	if (!this.reachHome && this.energy <= 0) {
		this.state = "dead";
	}
	else {
		// pick a new random spot if we're still not fed
		if (this.isFed < 2 && now >= this.nextDecision) {
			this.target = __randomTarget(0.99);
			this.nextDecision = now + random(0, this.nextDecisionChance);
		}
		// pick one target (& stop picking new ones) if fed
		else if (this.isFed == 2 && now >= this.nextDecision) {
			this.target = __randomStartPos(this.size);
			this.nextDecision = now + 1000 * 60 * 60;
		}

		// update movement if you're not done yet
		if (!this.reachHome) {
			this.steering.seek(this.target);
			this.steering.wander();
			this.steering.update();
		}
	}
}

Guy.prototype.reduceEnergy = function() {
	var scalar = 1 / steps;
	var x = pow(this.maxVel, 2) + pow(this.size.x, 3);
	var reduce = x * scalar;
	this.energy -= reduce;

	return this.energy;
}

Guy.prototype.draw = function() {
	push();
	translate(this.pos.x, this.pos.y);
	rotate(this.vel.heading());
	fill(this.color);
	if (!this.isFed) {
		noStroke();
	}
	rect(0, 0, this.size.x, this.size.y);
	pop();
}



