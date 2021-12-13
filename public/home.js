const btnLogin = document.querySelector('.signInBtn')
const div_user = document.querySelector('.user')
const sair = document.querySelector('.sair')
const publicarBtn = document.querySelector('.btnPub')
const buscarBtn = document.querySelector('.btnBusPub')
const searchPub = document.querySelector('.searchPub')
var token = localStorage.getItem('token')
console.log(token)
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


  if (publicarBtn) {
    publicarBtn.addEventListener('click', async e => {
      e.preventDefault()

      const titulo = document.querySelector('.titlePub').value
      const conteudo = document.querySelector('.contentPub').value
      const file = document.querySelector('.midiaPub').value
      if (titulo != '') {
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
            file
          }),
        })
      }
    }
    )
  }
  if (buscarBtn) {
    buscarBtn.addEventListener('click', async e => {
      e.preventDefault()
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
          tablelist=document.querySelectorAll('.table-resp')
          console.log(tablelist)
          tablelist.forEach(element => {
            element.remove()
          });
        } catch (er) {
        }
        data.content.forEach(pub => {
          try {
            respHTML = document.createElement('table')

            respHTML.innerHTML += '<tr><th>Titulo</th><th>' + pub.titulo + '</tr>'
            respHTML.innerHTML += '<tr><th>Conteudo</th><th>' + pub.conteudo + '</tr>'
            respHTML.innerHTML += '<tr><th>Arquivo</th><th>' + pub.file + '</tr>'
            respHTML.className = 'table-resp'

            document.querySelector('.rPub').append(respHTML)
          } catch (er) {
            alert(er)

          };
        });
      })
    })
  }
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
