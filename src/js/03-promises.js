import { Notify } from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', onBtnSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
        // Fulfill
      } else {
        reject({ position, delay });
        // Reject
      }
    }, delay);
  });
}

function onBtnSubmit(event) {
  event.preventDefault();

  const {
    elements: { delay, step, amount },
  } = event.currentTarget;

  let delayPromise = Number(delay.value);
  const stepPromise = Number(step.value);
  const amountPromise = Number(amount.value);

  for (let i = 1; i <= amountPromise; i += 1) {
    createPromise(i, delayPromise)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    form.reset();
    delayPromise += stepPromise;
  }
}
