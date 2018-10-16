const MAIN = document.getElementsByTagName("main")[0]
const FROG = document.getElementById("frog")

MAIN.onmousemove = (e) => {
	frog.style.left = e.pageX - 32 + "px"
	frog.style.top = e.pageY - 32 + "px"
}

function flip() {
	let v = ["scale(-1, 1)", "scale(1, 1)"]
	frog.style.transform = frog.style.transform == v[0] ? v[1] : v[0]
}