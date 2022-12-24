let subMenu = document.getElementById('subMenu');
function toggleMenu() {
  subMenu.classList.toggle('open-menu');
}

let span = document.querySelector('.up');

window.onscroll = function () {
  if (this.scrollY >= 800) {
    span.classList.add('show');
  } else {
    span.classList.remove('show');
  }
};

span.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
//

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
} else {
  addLink.style.display = 'none';
  carsLink.style.display = 'none';
  profileLink.style.display = 'none';
}
logout.addEventListener('click', () => {
  localStorage.removeItem('user');
  window.location.href = '/';
});
