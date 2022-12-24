// DOM Elements
const form = document.getElementById('log-in');
const emailField = document.getElementById('email');
const passwordField = document.getElementById('password');
const errorBox = document.getElementById('error');

// Events
form.addEventListener('submit', (e) => {
  console.log('e: ', e);
  e.preventDefault();
  const myForm = new FormData();
  myForm.append('email', emailField.value);
  myForm.append('password', passwordField.value);
  fetch('http://127.0.0.1:8000/api/login', {
    method: 'POST',
    body: myForm,
  })
    .then((res) => {
      return res.json();
    })

    .then((data) => {
      console.log('data: ', data);
      if (data.message == 'Account is exist and the password is correct') {
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = '/';
      } else {
        errorBox.innerHTML = JSON.stringify(data.message);
      }
    })
    .catch((e) => console.log(e));
});
