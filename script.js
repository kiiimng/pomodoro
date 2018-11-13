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

breakDecrement.addEventListener("click", decreaseBreak );
breakIncrement.addEventListener("click", increaseBreak);
sessionDecrement.addEventListener("click", decreaseSession);
sessionIncrement.addEventListener("click", increaseSession);
startStop.addEventListener("click", isRunning);
reset.addEventListener("click", clockReset)





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
	displayTimeLeft(seshLength);
	
	countdown = setInterval(()=> {
		const secondsLeft = Math.round((then - Date.now()) / 1000);

		if (secondsLeft <= 0) {
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
	if(pomodoro.mode == "running"){
		pomodoro.mode = "paused";
		console.log(pomodoro.mode)
		clearInterval(countdown);

		return;

	}
	if (pomodoro.mode == "paused") {
		pomodoro.mode = "running";
		console.log(pomodoro.mode)
		//continue timer 
		timer("display");
		return;
	}
	//if not runningg and not paused, start timer
	pomodoro.mode = "running";
	pomodoro.setting == "session" ? timer("sessionTime") : timer("breakTime");
};

function toggleSetting() {
	pomodoro.setting == "session" ? pomodoro.setting = "break" : pomodoro.setting = "session";
}



function clockReset() {
	clearInterval(countdown);
	pomodoro.mode = "stop";
	pomodoro.sessionTime = 25;
	sessionLength.innerHTML =  pomodoro.sessionTime;
	pomodoro.breakTime = 5;
	breakLength.innerHTML = pomodoro.breakTime;
	displayTimeLeft(pomodoro.sessionTime*60);
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