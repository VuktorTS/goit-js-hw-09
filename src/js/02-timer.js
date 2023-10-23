import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  picker: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  daus: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    futureDate = selectedDates[0];
    if (futureDate - new Date() <= 0) {
      Notify.failure('Please choose a date in the future');
      return;
    }
    refs.btnStart.disabled = false;
  },
};

let setId = null;
let futureDate = 0;

refs.btnStart.disabled = true;
refs.btnStart.addEventListener('click', onClick);

function onClick(event) {
  changeDate();
  refs.btnStart.disabled = true;
  refs.picker.disabled = true;
  setId = setInterval(changeDate, 1000);
}

function changeDate() {
  const dateCountdown = futureDate - new Date();
  if (dateCountdown >= 0) {
    const daus = convertMs(dateCountdown).days;
    const hours = convertMs(dateCountdown).hours;
    const minutes = convertMs(dateCountdown).minutes;
    const seconds = convertMs(dateCountdown).seconds;

    refs.daus.textContent = addLeadingZero(daus);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
    return;
  }
  Notify.info('Time is up!', {
    width: '500px',
    position: 'center-center',
    fontSize: '40px',
    clickToClose: true,
    background: '#8e1d96',
  });

  refs.picker.disabled = false;
  clearInterval(setId);
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

flatpickr(refs.picker, options);

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
