let UserCreds = JSON.parse(sessionStorage.getItem('user-creds'));
let UserInfo = JSON.parse(sessionStorage.getItem('user-info'));

if(window.location.pathname === '/src/pages/login.html' || window.location.pathname === '/src/pages/register.html') {
  if(sessionStorage.getItem('user-creds')) window.location.href = '/src/pages/profile.html';
} else {
  if(!sessionStorage.getItem('user-creds')) window.location.href = '/src/pages/login.html';
}