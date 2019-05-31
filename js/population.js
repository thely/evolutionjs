// Producer of guys

function Population(count) {
	this.guys = this.buildGuys(count);
	this.alive = count;
}

Population.prototype.drawGuys = function() {
	var guys = this.guys;
	// console.log(guys);
	for (var i = 0; i < guys.length; i++) {
		var g = guys[i];
		if (g.state == "alive") {
			g.draw();
		}
	}
}

Population.prototype.buildGuys = function(count, gen) {
	var guys = [];
	for (var i = 0; i < count; i++) {
		guys[i] = new Guy(gen);
	}
	return guys;
}

Population.prototype.moveGuys = function() {
	for (var i = 0; i < this.guys.length; i++) {
		this.guys[i].update();
	}
}

Population.prototype.reproduce = function(gen) {
	var holdovers = [];
	for (var i = 0; i < this.guys.length; i++) {
		var g = this.guys[i];
		if (g.isFed == 2 && g.reachHome) {
			holdovers.push(g.reset()); 			// keep survivor
			var newGenes = g.DNA.mutate();		// mutate the new genes
			var nGuy = new Guy(gen, newGenes);	// make a child
			holdovers.push(nGuy);
		}
	}
	this.guys = holdovers;
	this.count = this.guys.length;
}

Population.prototype.cullDead = function() {
	for (var i = this.guys.length - 1; i >= 0; i--) {
		if (this.guys[i].state == "dead")
			this.guys.splice(i, 1);
	}
}

Population.prototype.averageVal = function(key) {
	var avg = 0;
	for (var i = 0; i < this.guys.length; i++) {
		avg += this.guys[i][key];
	}
	return avg / this.guys.length;
}



