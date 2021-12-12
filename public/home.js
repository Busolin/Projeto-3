//const apiConnector = require('apiConnector')
const sbtn = document.querySelector('.searchbtn')
const inputSearch = document.querySelector('.inputsearch')
const btnLogin = document.querySelector('.signInBtn')
const btnFechar = document.querySelector('.fechar')
const containerModal = document.querySelector('.modalContainer')
const loginSection = document.getElementById('mobile-login')
const div_user = document.querySelector('.user')
const avatar = document.querySelector('.avatar')
const sair = document.querySelector('.sair')


var user


document.querySelector('.pricing').style.display = 'none'
document.querySelector('.divider').style.display = 'none'
btnLogin.style.display = 'none'
document.querySelector('.signUpBtn').style.display = 'none'
document.querySelector('.search-container').style.display = 'flex'
sair.style.display = 'flex'
user = { 'first_name': 'bruno', 'last_name': 'b silva', 'avatar': null }
div_user.textContent = user.first_name + ' ' + user.last_name

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
}
if (sair) {
  sair.addEventListener('click', e => {
    e.preventDefault()
    localStorage.setItem('mytoken', undefined)
    window.location.reload(false);
  }
  )
}