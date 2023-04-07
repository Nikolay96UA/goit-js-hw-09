import Notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const allInput = document.querySelectorAll('input');
const btnSubmit = document.querySelector('button');

const firstDelay = allInput[0];
const stepDelay = allInput[1];
const amountInput = allInput[2];

btnSubmit.addEventListener('click', submitForm);

function submitForm(event) {
  event.preventDefault();
  const delay = Number(firstDelay.value);
  const step = Number(stepDelay.value);
  const amount = Number(amountInput.value);
  for (let i = 1; i <= amount; i++) {
    const position = i;
    const currentDelay = delay + step * (i - 1);

    createPromise(position, currentDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}
