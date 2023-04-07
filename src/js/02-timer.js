import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  dataStart: document.querySelector('button[data-start]'),
  dataTimePicker: document.querySelector('#datetime-picker'),
  daysValue: document.querySelector('span[data-days]'),
  hoursValue: document.querySelector('span[data-hours]'),
  minutesValue: document.querySelector('span[data-minutes]'),
  secondsValue: document.querySelector('span[data-seconds]'),
  yearsValue: document.querySelector('span[data-years]'),
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
  error();
}

function timeOutput() {
  time = flat.selectedDates[0];

  error();

  if (timeOutput) {
    refs.dataTimePicker.disabled = true;
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

function error() {
  if (time <= new Date()) {
    Notiflix.Notify.failure('Please choose a date in the future');
    return;
  }
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const year = day * 356;

  const years = Math.floor(ms / year);
  const days = Math.floor((ms % year) / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds, years };
}

function timeInput({ days, hours, minutes, seconds, years }) {
  refs.daysValue.textContent = `${addLeadingZero(days)}`;
  refs.hoursValue.textContent = `${addLeadingZero(hours)}`;
  refs.minutesValue.textContent = `${addLeadingZero(minutes)}`;
  refs.secondsValue.textContent = `${addLeadingZero(seconds)}`;
  refs.yearsValue.textContent = `${addLeadingZero(years)}`;
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
    Notiflix.Notify.success('Tiiiime!)');
    refs.dataTimePicker.disabled = false;
  }
}
