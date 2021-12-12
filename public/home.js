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

if (sair) {
  sair.addEventListener('click', e => {
    e.preventDefault()
    localStorage.setItem('mytoken', undefined)
    window.location.reload(false);

  }
  )
}