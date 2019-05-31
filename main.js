// $(function() {
var agentCount = 200; // # individuals
var foodCount = 50;
var steps = 400; // steps per generation
var generations = 20; // number of generations
var food = 40; // food per gen
var population = [];
var foods = [];
var walls = [];

var mapClass = "mapZone";
var dim;

$(".play").on("click", function(e) {
	runSimulation();
});

function runSimulation() {
	for (var i = 0; i < steps; i++) {

	}
}

function drawMap() {
	background("#FFFFF0");
}

function setup() {
	dim = createVector(700, 500);
	agentCount = 200;
	foodCount = 155;
	generations = 40;
	steps = 400;

	var canvas = createCanvas(dim.x, dim.y);
	canvas.parent("mapZone");

	population = new Population(agentCount);
	allAvgs = createP(statsText());
	foods = makeFoods(foodCount);
	walls = makeWalls();
}

function statsText() {
	var str = population.averageVal("maxVel").toFixed(2) + ", "
			+ population.averageVal("mass").toFixed(2) + ", "
			// + population.averageVal("size")
			+ population.averageVal("nextDecisionChance").toFixed(2);
	return str;
}

function update() {
	if (generations > 0) {
		if (steps > 0) {
			population.moveGuys();
			steps--;
			checkCollisions(population.guys, foods, walls);
		}
		else {
			// var startNext = millis() + 3000;
			generations--;
			population.cullDead();
			population.reproduce(generations);
			allAvgs.html(statsText());
			foods = makeFoods(foodCount);
			steps = 500;
		}
	}
}

function draw() {
	update();

	drawMap();
	drawFoods(foods);
	population.drawGuys();
}

// });


