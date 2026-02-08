import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import '../css/styles.css';
let userSelectedDate = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] <= new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      startBtn.disabled = true;
      userSelectedDate = null;
    } else {
      startBtn.disabled = false;
      userSelectedDate = selectedDates[0];
    }
  },
};
const datetimePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const screenDays = document.querySelector('[data-days]');
const screenHours = document.querySelector('[data-hours]');
const screenMinutes = document.querySelector('[data-minutes]');
const screenSeconds = document.querySelector('[data-seconds]');
startBtn.disabled = true;
flatpickr(datetimePicker, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function updateIntarface({ days, hours, minutes, seconds }) {
  screenDays.textContent = addLeadingZero(days);
  screenHours.textContent = addLeadingZero(hours);
  screenMinutes.textContent = addLeadingZero(minutes);
  screenSeconds.textContent = addLeadingZero(seconds);
}

startBtn.addEventListener('click', handleClick);
function handleClick(event) {
  startBtn.disabled = true;
  datetimePicker.disabled = true;
  const coutDown = setInterval(() => {
    const startTime = userSelectedDate.getTime();
    const currentTime = new Date().getTime();
    const deltaTime = startTime - currentTime;
    convertMs(deltaTime);
    if (deltaTime <= 0) {
      clearInterval(coutDown);
      datetimePicker.disabled = false;
      updateIntarface({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }
    updateIntarface(convertMs(deltaTime));
  }, 1000);
}
