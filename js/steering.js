function SteeringManager(host, maxF) {
	this.steering = createVector(0,0);
	this.host = host;
	this.maxForce = maxF;
	this.seekPrefs = {

	};
	this.wanderPrefs = {
		circDist: 10,
		circRad: 5,
		angleChange: 5,
		angle: 45
	};
}

SteeringManager.prototype.update = function() {
	this.steering.limit(this.maxForce).div(this.host.mass);
	this.host.vel.add(this.steering).limit(this.host.maxVel);

	this.host.pos.add(this.host.vel);
}

SteeringManager.prototype.seek = function(target) {
	var desired = p5.Vector.sub(target, this.host.pos).mult(this.host.maxVel);
	var steer = p5.Vector.sub(desired, this.host.vel);
	this.steering.add(steer);
}

SteeringManager.prototype.wander = function() {
	var circleCenter = this.host.vel.copy().normalize().mult(this.wanderPrefs.circDist);
	var displacement = createVector(0, -1).mult(this.wanderPrefs.circRad);
	var angleChange = this.wanderPrefs.angleChange;

	displacement = __setAngle(displacement, this.wanderPrefs.angle);
	this.wanderPrefs.angle += random(0, angleChange) - angleChange * 0.5;

	var wanderForce = circleCenter.add(displacement);
	this.steering.add(wanderForce);
}


