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

//
{
  /*  */
}

//
const container = document.querySelector('.cars');
let cars = [];

fetch('http://127.0.0.1:8000/api/cars')
  .then((res) => res.json())
  .then((data) => {
    console.log('data: ', data);
    let inned = ``;
    data.forEach((car) => {
      inned += `
        <div class="car">
            <div class="image-box">
                <img src="http://127.0.0.1:8000/storage/uploads/${
                  car.image
                }" alt="">
            </div>
            <div class="details-box">
                <h2>${car.name}</h2>
                <h3>${car.model}</h3>
                <p>${car.description}</p>
                <div class="st">
                    <span class="${car.status == 'sell' ? 'sell' : 'rent'}">
                        ${car.status}
                    </span>         
                    <span>${car.author}</span>
                </div>
                         
                
            </div>

        </div>
        `;
      container.innerHTML = inned;
    });
  });
