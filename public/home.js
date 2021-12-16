const btnLogin = document.querySelector('.signInBtn')
const div_user = document.querySelector('.user')
const sair = document.querySelector('.sair')
const publicarBtn = document.querySelector('.btnPub')
const buscarBtn = document.querySelector('.btnBusPub')
const searchPub = document.querySelector('.searchPub')
var token = localStorage.getItem('token')
const spub = document.querySelector('.sPub')
const rpub = document.querySelector('.rPub')
const simg = document.querySelector('.simg')
const fileInput = document.querySelector('.midiaPub')
var pubPath


//console.log(token)
if (token == undefined) {
  window.location.replace('..')
  console.log('estou aqui')

} else {
  const email = localStorage.getItem('email')
  if (email == undefined) {
    window.location.replace('..')
  }
  document.querySelector('.pricing').style.display = 'none'
  document.querySelector('.divider').style.display = 'none'
  btnLogin.style.display = 'none'
  document.querySelector('.signUpBtn').style.display = 'none'
  document.querySelector('.search-container').style.display = 'flex'
  sair.style.display = 'flex'
  div_user.textContent = email

  //event.target[3].files[0]
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
    //FileSystemFileEntry.getItem(file)
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
    }).then((res)=>{
      if (res.status==200) alert('Postagem feita com sucesso')
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
         // console.log(pub.filePath)
          //console.log(URL.parse(pub.filePath))
          //console.log(new URL(pub.filePath))
          respHTML = document.createElement('table')

          respHTML.innerHTML += '<tr><th>Titulo</th><th>' + pub.titulo + '</tr>'
          respHTML.innerHTML += '<tr><th>Conteudo</th><th>' + pub.conteudo + '</tr>'
          respHTML.innerHTML += '<tr><th>Arquivo</th><th>'
          if (pub.filePath){
            respHTML.innerHTML += '<img id=img1 src = '+pub.filePath+' style="width: 264px !important; height: 161px !important;">'
          }
          respHTML.innerHTML += '</tr>'

          respHTML.className = 'table-resp'
          document.querySelector('.rPub').append(respHTML)
          
        } catch (er) {
          alert(er)

        };
      });
    })
  });
  if (sair) {
    sair.addEventListener('click', e => {
      e.preventDefault()
      localStorage.setItem('token', undefined)
      localStorage.setItem('email', undefined)

      window.location.replace('..')

    }
    )
  }
}
