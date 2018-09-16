var seconds = 0;
var minutes = 0;
var hours = 0;

var emotions = {
  positive: 0,
  neutral: 0,
  negative: 0
}

function newSession() {
  var btn = document.getElementById("start_session");
  btn.innerHTML = "Stop Studi Session";

  var header = btn.parentElement;
  var p = document.createElement("p");
  p.id = "timmer";
  p.innerHTML = "00:00:00";

  p.style = "text-align: center";
  header.append(p);

  setInterval(function() {
    seconds++;
    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }
    if (minutes === 60) {
      hours++;
      minutes = 0;
      seconds = 0;
    }
    var myNumber = 7;
    var formattedNumber = ("0" + myNumber).slice(-2);
    console.log(formattedNumber);
    p.innerHTML = `${("0" + hours).slice(-2)}:${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`;
  }, 1000);
}

function stopSession() {
  var btn = document.getElementById("start_session");
  btn.innerHTML = "Start Studi Session";

  var timer = document.getElementById("timmer");
  timer.parentElement.removeChild(timer);

  seconds = 0;
  minutes = 0;
  hours = 0;
}
