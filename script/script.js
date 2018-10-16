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
	if (ended)
		return;

	if (npos == "out") {
		show("Don't go there!")
	} else if (npos == "left") {
		if (pos == "right") {
			show("Keep going!")
			win(npos)
		} else {
			show("Get to the other side!")
		}
	} else if (npos == "right") {
		if (pos == "left") {
			show("Keep going!")
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
	
	let highscore = localStorage.getItem("highscore") || 0
	let isHighscore = points > highscore
	if (isHighscore)
		localStorage.setItem("highscore", points)

	let popup = create("div")
	popup.className = "popup"
	popup.appendChild(create("h1", isHighscore ? "New highscore!" : "You lose!"))
	popup.appendChild(create("h2", points))
	if (isHighscore)
		popup.appendChild(create("h3", "Previous highscore: " + highscore))
	else
		popup.appendChild(create("h3", "Highscore: " + highscore))
	popup.innerHTML += "<button onclick='location.reload()'>Play again</button>"

	document.body.appendChild(popup)
}

function create(tagName, text) {
	let e = document.createElement(tagName)
	if (text != null)
		e.innerText = text
	return e
}