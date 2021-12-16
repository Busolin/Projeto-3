const btnLogin = document.querySelector('.signInBtn')
const div_user = document.querySelector('.user')
const sair = document.querySelector('.sair')
const publicarBtn = document.querySelector('.btnPub')
const buscarBtn = document.querySelector('.btnBusPub')
const searchPub = document.querySelector('.searchPub')
const spub = document.querySelector('.sPub')
const rpub = document.querySelector('.rPub')
const simg = document.querySelector('.simg')
const fileInput = document.querySelector('.midiaPub')
const mycookies = document.cookie.split(';')
const email = decodeURIComponent(mycookies[1].replace('email=',''))
const token = mycookies[0].replace('token=','')
var pubPath

document.querySelector('.pricing').style.display = 'none'
document.querySelector('.divider').style.display = 'none'
btnLogin.style.display = 'none'
document.querySelector('.signUpBtn').style.display = 'none'
document.querySelector('.search-container').style.display = 'flex'
sair.style.display = 'flex'
div_user.textContent =  email

fileInput.addEventListener('input', event => {
  event.preventDefault();
  let formData = new FormData();
  formData.append('imagem', fileInput.files[0]);
  fetch('api/image', { method: 'post', body: formData })
    .then(res => res.json())
    .then(res => {

      pubPath = simg.src = 'uploads/' + res.content.filename;

      console.log(res.content)
    })
    .catch(console.log);
});
spub.addEventListener('submit', async e => {
  e.preventDefault()

  const titulo = document.querySelector('.titlePub').value
  const conteudo = document.querySelector('.contentPub').value
  const filePath = pubPath
  await fetch("/api/publicar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      titulo,
      conteudo,
      filePath
    }),
  }).then((res) => {
    if (res.status == 200)  {
      //'Postagem feita com sucesso'
      respHTMLPost = document.createElement('label')
      respHTMLPost.id = 'statusPost'
      respHTMLPost.style = ''
      respHTMLPost.textContent = 'Postagem feita com sucesso'
      spub.append(respHTMLPost)
    }
  })
});


rpub.addEventListener('submit', async event => {
  event.preventDefault();

  const key = searchPub.value

  await fetch("/api/buscar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      key,
    }),
  }).then((res) => res.json()).then((data) => {
    try {
      tablelist = document.querySelectorAll('.table-resp')
      tablelist.forEach(element => {
        element.remove()
      });
    } catch (er) {
    }
    let counter = 0
    data.content.forEach(async pub => {
      try {
        respHTML = document.createElement('table')
        respHTML.innerHTML += '<tr><th>Titulo</th></tr> <tr><th>' + pub.titulo + '</tr>'
        respHTML.innerHTML += '<tr><th>Conteudo</th></tr> <tr><th>' + pub.conteudo + '</tr>'
        respHTML.innerHTML += '<tr><th>Arquivo</th>'
        if (pub.filePath) {
          respHTML.innerHTML += '<img id=img1 src = ' + pub.filePath + ' style="width: 100% !important; height: auto !important; align-items:center !important">'
        }
        respHTML.innerHTML += '</tr>'
        respHTML.className = 'table-resp'
        document.querySelector('.rPub').append(respHTML)
      } catch (er) {
        alert('Erro')
        console.log(er)
      };
    });
  })
});
if (sair) {
  sair.addEventListener('click', e => {
    e.preventDefault()
    fetch('/api/cookies/',{
      method:'GET',
      headers: {
        "Content-Type": "application/json",
      }
    })
    window.location.replace('..')
  }
  )
}
