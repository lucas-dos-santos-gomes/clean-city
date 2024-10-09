function setLoading() {
  const body = document.querySelector('body');
  body.setAttribute('class', 'loading');

  const loadingDiv = document.querySelector('div.loading');
  loadingDiv.classList.add('active');

  const img = document.createElement('img');
  img.setAttribute('src', '/src/assets/svg/loading.svg');
  img.setAttribute('alt', 'Ícone de carregamento');

  loadingDiv.appendChild(img);
}

function resetLoading() {
  const body = document.querySelector('body');
  body.removeAttribute('class');

  const loadingDiv = document.querySelector('div.loading');
  loadingDiv.classList.remove('active');

  const img = loadingDiv.querySelector('img');
  loadingDiv.removeChild(img);
}

export { setLoading, resetLoading };