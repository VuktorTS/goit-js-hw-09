function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
let setId = null;
const refs = {
  btnClickStart: document.querySelector('[data-start]'),
  btnClickStop: document.querySelector('[data-stop]'),
};

refs.btnClickStart.addEventListener('click', onClickStart);
refs.btnClickStop.addEventListener('click', onClickStop);

function onClickStart(event) {
  chengeBodyColor();
  setId = setInterval(chengeBodyColor, 1000);
  refs.btnClickStart.disabled = true;
}

function onClickStop(event) {
  refs.btnClickStart.disabled = false;
  clearInterval(setId);
}

function chengeBodyColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}
