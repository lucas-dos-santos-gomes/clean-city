const label = document.querySelector('.file-input');

function onEnter() {
  label.classList.add('active');
}

function onLeave() {
  label.classList.remove('active');
}

label.addEventListener('dragenter', onEnter);
label.addEventListener('drop', onLeave);
label.addEventListener('dragend', onLeave);
label.addEventListener('dragleave', onLeave);

const input = document.querySelector('#file');
const dropzone = document.querySelector('.drop-zone');

input.addEventListener('change', e => {
  if(input.files.length > 0) {
    const type = input.files[0].type;
    if(!type.includes('image')) {
      alert('Esse formato de arquivo não é permitido!');
      return;
    }

    document.querySelector('#cover') && dropzone.removeChild(document.querySelector('#cover'));

    const img = document.createElement('img');
    img.id = 'cover';
    img.src = URL.createObjectURL(input.files[0]);

    dropzone.appendChild(img);
    console.log({img});
  }
});