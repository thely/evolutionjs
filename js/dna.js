// value is the starting value of the trait upon creation
// chance is the chance of it mutating (or mutating further)
// range is the high/low possibility of this trait

var baseGenes = [
	{
		name: "maxVel",
		value: 3,
		range: 1,
		chance: 10
	},
	{
		name: "mass",
		value: 5,
		range: 5,
		chance: 20
	},
	{
		name: "nextDecisionChance",
		value: 500,
		range: 100,
		chance: 20
	},
	{
		name: "size",
		isVector: true,
		value: 5,
		range: 2,
		chance: 90
	}
];

function DNA(genes) {
	this.genes = genes ? genes : baseGenes;
}

// apply trait values back to host
DNA.prototype.update = function(host) {
	for (var i = 0; i < this.genes.length; i++) {
		var tName = this.genes[i].name;
		if (!this.genes[i].isVector) {
			host[tName] = this.genes[i].value;
		}
		else {
			host[tName].x = this.genes[i].value;
			host[tName].y = this.genes[i].value;
		}
	}
}

// returns potentially altered new DNA
DNA.prototype.mutate = function() {
	var newGenes = [];
	for (var i = 0; i < this.genes.length; i++) {
		var g = Object.assign({}, this.genes[i]);
		if (random(0,99) <=  g.chance) {
			console.log("somebody mutated!");
			var coin = random([0,1]) ? g.range : -g.range;
			g.value += coin;
		}
		newGenes[i] = g;
	}
	return new DNA(newGenes);
}

