import {
  get,
  child,
  dbref,
} from "./config.js";

const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const uid = JSON.parse(sessionStorage.getItem('user-creds')).uid;
const reportsDiv = document.querySelector('.reports');

nameInput.value = JSON.parse(sessionStorage.getItem('user-info')).name;
emailInput.value = JSON.parse(sessionStorage.getItem('user-info')).email;

get(child(dbref, 'users/' + uid + '/reports')).then(snapshot => {
  if(snapshot.exists && snapshot.hasChildren()) {
    const table = creatingTable();
    let reportCounts = snapshot.size;
    snapshot.forEach(element => {
      table.appendChild(creatingRow(reportCounts, element.val()));
      reportCounts--;
    });
    reportsDiv.appendChild(table);
  } else if(snapshot.exists) {
    reportsDiv.innerHTML = 'Você ainda não fez nenhuma denúncia.';
  }
});

const logoutButton = document.querySelector('.logout');

function logout() {
  sessionStorage.removeItem('user-info');
  sessionStorage.removeItem('user-creds');
  window.location.href = '/src/pages/login.html';
}

logoutButton.onclick = logout;

// Creating table
function creatingTable() {
  const th_number = document.createElement('th');
  const th_location = document.createElement('th');
  const th_description = document.createElement('th');
  const th_date = document.createElement('th');

  th_number.innerHTML = 'Nº';
  th_location.innerHTML = 'Localização';
  th_description.innerHTML = 'Descrição';
  th_date.innerHTML = 'Data';

  const tr = document.createElement('tr');
  tr.appendChild(th_number);
  tr.appendChild(th_location);
  tr.appendChild(th_description);
  tr.appendChild(th_date);
  const table = document.createElement('table');
  table.appendChild(tr);
  table.setAttribute('border', 1);
  table.setAttribute('cellpadding', 5);
  table.setAttribute('cellspacing', 0);
  return table;
}

function creatingRow(number, report) {
  const td_number = document.createElement('td');
  const td_location = document.createElement('td');
  const td_description = document.createElement('td');
  const td_date = document.createElement('td');

  td_number.innerHTML = number;
  td_location.innerHTML = report.location;
  td_description.innerHTML = report.description;
  td_date.innerHTML = report.date;

  const tr = document.createElement('tr');
  tr.appendChild(td_number);
  tr.appendChild(td_location);
  tr.appendChild(td_description);
  tr.appendChild(td_date);
  return tr;
}