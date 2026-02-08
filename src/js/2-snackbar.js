import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const submitForm = document.querySelector('.form');
const formData = { state: '', delay: '' };
submitForm.addEventListener('input', checkValue);
function checkValue(event) {
  const name = event.target.name;
  const value = event.target.value;
  formData[name] = value;
}

submitForm.addEventListener('submit', handleSubmit);
function handleSubmit(event) {
  event.preventDefault();
  const delay = Number(formData.delay);
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (formData.state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.success({
        title: '✅',
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        icon: false,
      });
    })
    .catch(delay => {
      iziToast.error({
        title: '❌',
        message: `Rejected promise in ${delay}ms`,
        position: 'topRight',
        icon: false,
      });
    });
}
