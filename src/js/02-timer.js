import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  dataStart: document.querySelector('button[data-start]'),
  dataTimePicker: document.querySelector('#datetime-picker'),
  daysValue: document.querySelector('span[data-days]'),
  hoursValue: document.querySelector('span[data-hours]'),
  minutesValue: document.querySelector('span[data-minutes]'),
  secondsValue: document.querySelector('span[data-seconds]'),
};

const flat = flatpickr(refs.dataTimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    return selectedDates[0];
  },
});

let time = flat.selectedDates[0];
let now = new Date();

refs.dataStart.addEventListener('click', timeOutput);
refs.dataTimePicker.addEventListener('input', checkValue);

refs.dataStart.disabled = true;

function checkValue() {
  time = flat.selectedDates[0];
  now = new Date();
  if (time <= now) {
    refs.dataStart.disabled = true;
  } else {
    refs.dataStart.disabled = false;
  }
}

function timeOutput() {
  time = flat.selectedDates[0];

  if (time <= new Date()) {
    alert('Please choose a date in the future');
    return;
  }

  const timerId = setInterval(() => {
    now = new Date();
    const timeDiff = time - now;
    const valueOutput = convertMs(timeDiff);
    timeInput(valueOutput);

    stopTimer(valueOutput, timerId);
  }, 1000);

  refs.dataStart.disabled = true;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day); // Remaining days
  const hours = Math.floor((ms % day) / hour); // Remaining hours
  const minutes = Math.floor(((ms % day) % hour) / minute); // Remaining minutes
  const seconds = Math.floor((((ms % day) % hour) % minute) / second); // Remaining seconds

  return { days, hours, minutes, seconds };
}

function timeInput({ days, hours, minutes, seconds }) {
  refs.daysValue.textContent = `${addLeadingZero(days)}`;
  refs.hoursValue.textContent = `${addLeadingZero(hours)}`;
  refs.minutesValue.textContent = `${addLeadingZero(minutes)}`;
  refs.secondsValue.textContent = `${addLeadingZero(seconds)}`;
}

function addLeadingZero(numb) {
  return String(numb).padStart(2, 0);
}

function stopTimer(valueOutput, timerId) {
  if (
    valueOutput.days === 0 &&
    valueOutput.hours === 0 &&
    valueOutput.minutes === 0 &&
    valueOutput.seconds === 0
  ) {
    clearInterval(timerId);
    alert('Tiiiime!)');
  }
}
