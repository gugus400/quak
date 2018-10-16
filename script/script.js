const WIDTH = 800
const HEIGHT = 800

const OUTSIDE = document.getElementById("outside")
const MESSAGE = document.getElementById("message")
const POINTS = document.getElementById("points")
const LEFT_END = document.getElementById("left-end")
const STREET = document.getElementById("street")
const RIGHT_END = document.getElementById("right-end")

let pos = "out"
let points = 0
let hideTimeout
let ended = false;

OUTSIDE.onmouseover = (e) => run("out")
LEFT_END.onmouseover = (e) => run("left")
RIGHT_END.onmouseover = (e) => run("right")
function ouchie() { run("ouchie") }

start()

function run(npos) {
	console.log(npos)

	if (ended)
		return;

	if (npos == "out") {
		show("Don't go there!")
	} else if (npos == "left") {
		if (pos == "right") {
			show("You win!")
			win(npos)
		} else {
			show("Get to the other side!")
		}
	} else if (npos == "right") {
		if (pos == "left") {
			show("You win!")
			win(npos)
		} else if (pos == "out") {
			flip()
		} else {
			show ("Get to the other side!")
		}
	} else if (pos == "left" || pos == "right" && npos == "ouchie") {
		show("You lose!")
		lose()
	}

	pos = npos
}

function show(msg) {
	MESSAGE.style.display = "initial"
	MESSAGE.innerText = msg
	clearTimeout(hideTimeout)
	hideTimeout = setTimeout(() => {
		MESSAGE.innerText = ""
		MESSAGE.style.display = "none"
	}, 3000)
}

function win(side) {
	flip()
	speed += 0.1
	points++
	POINTS.innerText = points

	let winSide = side == "left" ? LEFT_END : RIGHT_END
	winSide.classList.add("win")
	setTimeout(() => winSide.classList.remove("win"), 300)
}

function lose() {
	POINTS.innerText = points
	ended = true;
	
	let popup = document.createElement("div")
	popup.className = "popup"
	popup.innerHTML =
		"<h1>You lose!</h1><h2>" + points + "</h2>" +
		"<h3>Points</h3>" +
		"<button onclick='location.reload()'>Play again</button>"

	document.body.appendChild(popup)
}