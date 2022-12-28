let subMenu = document.getElementById('subMenu');
function toggleMenu() {
  subMenu.classList.toggle('open-menu');
}

const addLink = document.getElementById('addLink');
const carsLink = document.getElementById('carsLink');
const signupLink = document.getElementById('signupLink');
const loginLink = document.getElementById('loginLink');
const profileLink = document.getElementById('profileLink');
const logout = document.getElementById('logout');
const menuUser = document.getElementById('user-info');

if (localStorage.getItem('user')) {
  signupLink.style.display = 'none';
  loginLink.style.display = 'none';
  const user = JSON.parse(localStorage.getItem('user'));
  profileLink.setAttribute(
    'src',
    `http://127.0.0.1:8000/storage/uploads/${user.image}`,
  );
  menuUser.innerHTML = `
        <img src="http://127.0.0.1:8000/storage/uploads/${user.image}" />
        <h2>${user.name}</h2>
        <h4>${user.email}</h4>
        <h4>${user.role == 'B' ? 'Buyer' : 'Seller'}</h4>
  `;
  if (user.role == 'B') {
    addLink.style.display = 'none';
  }
} else {
  addLink.style.display = 'none';
  carsLink.style.display = 'none';
  profileLink.style.display = 'none';
}
logout.addEventListener('click', () => {
  localStorage.removeItem('user');
  window.location.href = '/';
});

// DOM Elements
const form = document.getElementById('add-car');
const nameField = document.getElementById('name');
const modelField = document.getElementById('model');
const priceField = document.getElementById('price');
const descriptionField = document.getElementById('description');
const statusField = document.getElementById('status');
const imageField = document.getElementById('image');
const errorBox = document.getElementById('error');
const userName = JSON.parse(localStorage.getItem('user')).name;

// Events
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const myForm = new FormData();
  myForm.append('name', nameField.value);
  myForm.append('model', modelField.value);
  myForm.append('price', priceField.value);
  myForm.append('description', descriptionField.value);
  myForm.append('status', statusField.value);
  myForm.append('author', userName);
  myForm.append('image', imageField.files[0]);
  fetch('http://127.0.0.1:8000/api/cars', {
    method: 'POST',
    body: myForm,
  })
    .then((res) => {
      console.log('res: ', res);
      if (res.status != 201) {
        errorBox.innerHTML =
          'name must be minimum 3 chars & price must be numuric';
      }
      return res.json();
    })

    .then((data) => {
      console.log('data: ', data);
      if (data.message == 'car created successfuly') {
        window.location.href = '/cars.html';
      } else {
        errorBox.innerHTML =
          'name must be minimum 3 chars & price must be numuric';
      }
    })
    .catch((e) => console.log(e));
});
