const CAR_IMG = "img/car#.png"
const CARS = 2
const LANES = 4;
const LANE_WIDTH = 120
const LEFT_OFFSET = 160 + 28

const START_SPEED = 2
const START_CARS = 6

let speed = START_SPEED
let cooldown = []

function start() {
	drawLanes()
	for (let i = 0; i < START_CARS; i++)
		setTimeout(createCar, i * 1000)
	move()
}

function createCar() {
	let lane = getLane()

	let car = document.createElement("img")
	car.src = CAR_IMG.replace("#", Math.ceil(Math.random() * CARS))
	car.className = "car"
	car.style.filter = "hue-rotate(" + (Math.floor(Math.random() * 36) * 10) + "deg)"
	car.style.left = lane * LANE_WIDTH + LEFT_OFFSET + "px"
	car.style.top = -car.height + "px"
	car.onmouseover = ouchie

	STREET.appendChild(car)
}

function getLane() {
	let lane = Math.floor(Math.random() * LANES)

	if (cooldown.includes(lane)) {
		return getLane()
	} else {
		cooldown.shift()
		cooldown.push(lane)
		return lane
	}
}

function move() {
	let all = document.getElementsByClassName("car")

	for (let car of all) {
		let top = getNum(car.style.top)
		top += speed
		car.style.top = top + "px"

		if (top > HEIGHT + car.height) {
			STREET.removeChild(car)
			createCar()
		}
	}

	setTimeout(move, 10)
}

function getNum(prop) {
	return prop.split("px")[0] / 1
}

function drawLanes() {
	for (let i = 1; i < LANES; i++) {
		let strip = document.createElement("div")
		strip.className = "strip"
		strip.style.left = i * LANE_WIDTH + 160 + "px"

		STREET.appendChild(strip);
	}
}