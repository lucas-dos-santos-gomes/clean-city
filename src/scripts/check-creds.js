let UserCreds = JSON.parse(sessionStorage.getItem('user-creds'));
let UserInfo = JSON.parse(sessionStorage.getItem('user-info'));

if(!sessionStorage.getItem('user-creds')) window.location.href = '/src/pages/login.html';