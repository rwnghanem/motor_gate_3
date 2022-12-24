// DOM Elements
const form = document.getElementById('sign-up');
const nameField = document.getElementById('name');
const emailField = document.getElementById('email');
const passwordField = document.getElementById('password');
const roleField = document.getElementById('role');
const imageField = document.getElementById('image');
const errorBox = document.getElementById('error');

// Events
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const myForm = new FormData();
  myForm.append('name', nameField.value);
  myForm.append('email', emailField.value);
  myForm.append('password', passwordField.value);
  myForm.append('role', roleField.value);
  myForm.append('image', imageField.files[0]);
  fetch('http://127.0.0.1:8000/api/register', {
    method: 'POST',
    body: myForm,
  })
    .then((res) => {
      if (res.status == 201) return res.json();
      else return false;
    })

    .then((data) => {
      console.log('data: ', data);
      if (data) {
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = '/';
      } else {
        errorBox.innerHTML = 'User or Email is Used';
      }
    })
    .catch((e) => console.log(e));
});
