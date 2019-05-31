function CollisionManager(tileSize) {
	// has an x and y coordinate
	// this.tileSize = tileSize;
	// this.tiles = [];
	// for (var i = 0; i < tileSize.x; i++) {
	// 	tiles[i] = [];
	// 	for (var j = 0; j < tileSize.y; j++) {
	// 		var start = createVector(i*tileSize.x, j*tileSize.y);
	// 		tiles[i][j] = new CollisionTile(start, tileSize, 0);	
	// 	}
	// }
}

function CollisionTile(pos, size, count) {
	this.pos = pos;
	this.size = size;
	this.count = count;
}

function handleCollisionAgentFood(agent, food) {
	if (agent.isFed != 2 && !food.eaten) {
		agent.isFed++;
		food.eaten = true;
		// foods.splice(j, 1); // maybe deregister it from collision instead?
	}
}

function checkAgentFood(list1, list2) {
	for (var i = 0; i < list1.length; i++) {
		var a = list1[i];
		for (var j = 0; j < list2.length; j++) {
			var f = list2[j];
			var hit = collideRectCircle(a.pos.x, a.pos.y, a.size.x, a.size.y, f.pos.x, f.pos.y, f.size.x);
			if (hit) {
				handleCollisionAgentFood(a, f);
			}
		}
	}
	cullEatenFood();
}

function handleCollisionAgentWall(agent, wall) {
	if (agent.isFed == 2) {
		agent.reachHome = true;
		// agent.stop();
	}
}

function checkAgentWall(list1, list2) {
	for (var i = 0; i < list1.length; i++) {
		var a = list1[i];
		for (var j = 0; j < list2.length; j++) {
			var w = list2[j];
			var hit = collideRectRect(a.pos.x, a.pos.y, a.size.x, a.size.y, w.pos.x, w.pos.y, w.size.x, w.size.y);
			if (hit) {
				handleCollisionAgentWall(a, w);
			}
		}
	}
}

function checkCollisions(agents, food, walls) {
	checkAgentFood(agents, food);
	checkAgentWall(agents, walls);
}

