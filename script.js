let countdown;

let breakLength = document.getElementById("break-length");
let breakDecrement = document.getElementById("break-decrement");
let breakIncrement = document.getElementById("break-increment");
let sessionLength = document.getElementById("session-length");
let sessionDecrement = document.getElementById("session-decrement");
let sessionIncrement = document.getElementById("session-increment");
let timeLeft = document.getElementById("time-left");
let startStop = document.getElementById("start_stop");
let reset = document.getElementById("reset");

startStop.addEventListener("click", isRunning);
reset.addEventListener("click", clockReset)


function addListeners() {
	breakDecrement.addEventListener("click", decreaseBreak );
		breakIncrement.addEventListener("click", increaseBreak);
		sessionDecrement.addEventListener("click", decreaseSession);
		sessionIncrement.addEventListener("click", increaseSession);
}



function removeListeners() {
	breakDecrement.removeEventListener("click", decreaseBreak );
	breakIncrement.removeEventListener("click", increaseBreak);
	sessionDecrement.removeEventListener("click", decreaseSession);
	sessionIncrement.removeEventListener("click", increaseSession);
}

addListeners();


let pomodoro = {
	mode: "stop",
	sessionTime: Number(sessionLength.innerHTML),
	breakTime: Number(breakLength.innerHTML),
	display: 0,
	setting: "session"
	}

displayTimeLeft(pomodoro.sessionTime*60);

function timer(time){
	const seshLength = pomodoro[time] * 60;
	const now = Date.now();
	const then = now + seshLength *1000;
	//displayTimeLeft(seshLength);
	
	countdown = setInterval(()=> {
		const secondsLeft = Math.round((then - Date.now()) / 1000);

		if (secondsLeft <= 0) {
			playAudio();
			clearInterval(countdown);
			pomodoro.mode = "stop";
			toggleSetting();
			isRunning()
			//return;
		}
		displayTimeLeft(secondsLeft);
		pomodoro.running = true;
	}, 1000)
	}

function displayTimeLeft(seshLength) {
	seshLength = seshLength 
	const minutes = Math.floor(seshLength / 60);
	const seconds = seshLength % 60;
	timeLeft.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
	pomodoro.display = seshLength / 60;
}

function isRunning(){
		changeStopPlay()
	
	if(pomodoro.mode == "running"){
		pomodoro.mode = "paused";
		clearInterval(countdown);

		return;

	}
	if (pomodoro.mode == "paused") {
		pomodoro.mode = "running";
		
		//continue timer 
		timer("display");
		return;
	}
	//if not runningg and not paused, start timer
	pomodoro.mode = "running";
	
	removeListeners()
	pomodoro.setting == "session" ? timer("sessionTime") : timer("breakTime");
};

function toggleSetting() {
	pomodoro.setting == "session" ? pomodoro.setting = "break" : pomodoro.setting = "session";
	document.getElementById("timer-label").innerHTML = pomodoro.setting.charAt(0).toUpperCase() + pomodoro.setting.slice(1);
}



function clockReset() {
	addListeners()
	clearInterval(countdown);
	startStop.classList.remove("fa-pause");
	startStop.classList.add("fa-play");
	pomodoro.mode = "stop";
	//pomodoro.sessionTime = 25;
	sessionLength.innerHTML =  pomodoro.sessionTime;
	//pomodoro.breakTime = 5;
	breakLength.innerHTML = pomodoro.breakTime;
	displayTimeLeft(pomodoro.sessionTime*60);
}

//change stop-play icon
function changeStopPlay() {
	//startStop.classList.replace();
	pomodoro.mode == "running" ? startStop.classList.replace("fa-pause", "fa-play") : startStop.classList.replace("fa-play", "fa-pause") 

}
	


//arrow up and down should increase or decrease break/session length

function increaseBreak() {
	if (pomodoro.breakTime >= 60) {
		return;
	}
	pomodoro.breakTime += 1;
	breakLength.innerHTML = pomodoro.breakTime
	
}

function decreaseBreak() {
	if (pomodoro.breakTime <= 1){
		return;
	}
	pomodoro.breakTime -= 1;
	breakLength.innerHTML = pomodoro.breakTime;
	
}

function increaseSession() {
	if (pomodoro.sessionTime >= 60) {
		return;
	}
	pomodoro.sessionTime += 1;
	sessionLength.innerHTML =  pomodoro.sessionTime;
	displayTimeLeft(pomodoro.sessionTime*60);
	
}

function decreaseSession() {
	if (pomodoro.sessionTime <= 1){
		return;
	}
	pomodoro.sessionTime -= 1;
	sessionLength.innerHTML = pomodoro.sessionTime;
	displayTimeLeft(pomodoro.sessionTime*60);
}



// add audio beep after timer turns to 00:00;
//change timeleft display to "session" or "break"

let audio = document.getElementById("audio");

function playAudio() {
	audio.play()
}

