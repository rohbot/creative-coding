let dots = []
let tris = []
let spacing = 100
let sp_n = spacing /1;
let h_dots, v_dots;

class Dot {
	constructor(x, y, offset = 0.001, range = 1000) {
		this.offset = offset
		this.n = random(range)
		this.x = x;
		this.y = y;
		this.pos = createVector(x, y);
	}
	move() {
		this.pos.x = this.x + ((noise(this.n) - 0.5) * spacing);
		this.pos.y = this.y + ((noise(this.n + 1000) - 0.5) * spacing);
		this.n += this.offset
	}
	render() {
		point(this.pos.x, this.pos.y)
	}
}

class Tri {
	constructor(d1, d2, d3) {
		this.d1 = d1;
		this.d2 = d2;
		this.d3 = d3;
		this.col = 150
	}
	render() {
		if (this.d1 && this.d2 && this.d3) {

			this.col = int(map(this.d2.pos.dist(this.d3.pos), spacing - sp_n, spacing+ sp_n, 255,0))
			// console.log(this.d1.pos.dist(this.d3.pos))
			
			stroke(this.col)
			fill(this.col)
			triangle(this.d1.pos.x, this.d1.pos.y,
				this.d2.pos.x, this.d2.pos.y,
				this.d3.pos.x, this.d3.pos.y)
		}
	}
}

function setup() {

	createCanvas(windowWidth, windowHeight);
	h_dots = width / spacing;
	v_dots = height / spacing;
	for (let j = -1; j < h_dots+1; j++) {
		let row = []
		for (let i = -1; i < v_dots+1; i++) {
			let dot = new Dot(j * spacing, i * spacing);
			row.push(dot)
		}
		dots.push(row)

	}
	for (let j = 0; j < dots.length-1; j++) {
		for (let i = 0; i <  dots[j].length; i++) {
			console.log(j,i)
			let tri = new Tri(dots[j][i], dots[j][i + 1], dots[j + 1][i])
			tris.push(tri)
			let tri2 = new Tri(dots[j][i + 1], dots[j + 1][i], dots[j + 1][i + 1])
			tris.push(tri2)
		}

	}

}




function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	background(255)
	for (let j = 0; j < dots.length; j++) {
		let row = dots[j]
		for (let i = 0; i < row.length; i++) {
			row[i].move()
			// row[i].render()

		}
	}
	for (let tri of tris) {
		tri.render()
	}

}

