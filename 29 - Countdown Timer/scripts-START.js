let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]'); // attr notation

function timer(secs) {
  // clear any existing so it can be restarted
  clearInterval(countdown);
  // set interval is unreliable due to performance-related auto stop
  const now = Date.now();
  const then = now + secs * 1000;
  displayTimeLeft(secs);
  displayEndTime(then);
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // before displaying check for a stop
    if (secondsLeft === 0) {
      clearInterval(countdown);
    }
    // display each second
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(secs) {
  const minutes = Math.floor(secs / 60);
  const remainderSeconds = secs % 60;
  const display = `${minutes}:${
    remainderSeconds < 10 ? '0' : ''
  }${remainderSeconds}`;
  timerDisplay.textContent = display;
  console.log({ minutes, remainderSeconds });
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjHour = hour > 12 ? hour - 12 : hour;

  const minutes = end.getMinutes();
  endTime.textContent = `Be back at ${adjHour}:${
    minutes < 10 ? 0 : ''
  }${minutes}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach((button) => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const mins = this.minutes.value;
  console.log(mins);
  timer(mins * 60);
  this.reset();
});
