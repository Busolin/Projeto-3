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
avatar.style.background = "url('https://reqres.in/img/faces/2-image.jpg') no-repeat"
avatar.style.height = '128px'
avatar.style.weight = '128px'
avatar.style.backgroundSize = '75%'
/*
if (mytoken && mytoken != 'undefined') {
    console.log(mytoken)
    id = mytoken.replace('QpwL5tke4Pnpja7X', '')
    fetch('https://reqres.in/api/users/' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            return response.json()
        })
        .then(data => {
            data = data.data
        }).then(th => {
        }
        )
}*/

if (sbtn) {
    sbtn.addEventListener('click', e => {
      e.preventDefault()
        console.log('o fui clickado')
      //apiConnector.getData(inputSearch.value)
      .then(th => {
          try {
            document.querySelector('.table-resp').remove()
          } catch (er) {
  
          }
          try {
            respHTML = document.createElement('table')
            respHTML.innerHTML += '<tr><th>Total de contaminados</th><th>Recuperados</th><th>Mortos</th><th>População Total</th></tr>' + '<tr><th>' + resp.confirmed + '</th><th>' + resp.recoverd + '</th><th>' + resp.deaths + '</th><th>' + resp.population + '</th></tr>'
            respHTML.className = 'table-resp'
            document.querySelector('.search-container').append(respHTML)
          } catch (er) {
            alert('Pais não encontrado')
          }
        })
    })
  }
  if (sair) {
    sair.addEventListener('click', e => {
      e.preventDefault()
      localStorage.setItem('mytoken', undefined)
      window.location.reload(false);
  
    }
    )
  }