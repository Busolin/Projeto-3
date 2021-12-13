const btnLogin = document.querySelector('.signInBtn')
const div_user = document.querySelector('.user')
const sair = document.querySelector('.sair')
const publicarBtn = document.querySelector('.btnPub')
const buscarBtn = document.querySelector('.btnBusPub')

var token = localStorage.getItem('token')
var email
console.log(token)
if (token == undefined) {
  window.location.replace('..')
  console.log('estou aqui')

} else {
  email = localStorage.getItem('email')
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

      const email = 'bruno@bsds.com'
      const titulo = document.querySelector('.titlePub').value
      const conteudo = document.querySelector('.contentPub').value
      const file = document.querySelector('.midiaPub').value
      console.log(file)
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
    )
  }
  if (buscarBtn) {
    buscarBtn.addEventListener('click', async e => {
      e.preventDefault()
      const email = 'bruno@bsds.com'
      const key = ' '

      await fetch("/api/buscar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          key
        }),
      })
    }
    )
  }

  /*
  try {
    document.querySelector('.table-resp').remove()
  } catch (er) {
  }
  try {
    resp={confirmed: 1, recoverd:1, deaths:1, population:1}
    respHTML = document.createElement('table')
    
    respHTML.innerHTML += '<tr><th>Total de contaminados</th>' +
      '<th>Recuperados</th><th>Mortos</th><th>População Total</th></tr>' +
      '<tr><th>' + resp.confirmed + '</th><th>' + resp.recoverd + '</th><th>' +
      resp.deaths + '</th><th>' + resp.population + '</th></tr>'
  
    respHTML.className = 'table-resp'
    document.querySelector('.rPub').append(respHTML)
  } catch (er) {
    alert(er)
  }*/
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