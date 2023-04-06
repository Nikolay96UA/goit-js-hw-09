const refs = {
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

let timerId = null;

refs.start.addEventListener('click', startColorChange);
refs.stop.addEventListener('click', stopColorChange);

refs.stop.disabled = true;

function startColorChange() {
  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.start.disabled = true;
  refs.stop.disabled = false;
}

function stopColorChange() {
  clearInterval(timerId);
  refs.start.disabled = false;
  refs.stop.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
