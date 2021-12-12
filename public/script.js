//Adicionando a API de Login reqres
const loginAPI = 'https://reqres.in/api/users'
const covidAPI = 'https://covid-api.mmediagroup.fr/v1/cases'

const sbtn = document.querySelector('.searchbtn')
const inputSearch = document.querySelector('.inputsearch')
const btnLogin = document.querySelector('.signInBtn')
const btnFechar = document.querySelector('.fechar')
const containerModal = document.querySelector('.modalContainer')
const loginSection = document.getElementById('mobile-login')
const div_user = document.querySelector('.user')
const avatar = document.querySelector('.avatar')
const sair = document.querySelector('.sair')

var resp
var emailTest = false
var passTest = false
var mytoken = localStorage.getItem('mytoken')
var user
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
      user = { 'first_name': data.first_name, 'last_name': data.last_name, 'avatar': data.avatar }
    }).then(th => {
      document.querySelector('.pricing').style.display = 'none'
      document.querySelector('.divider').style.display = 'none'
      document.querySelector('.signInBtn').style.display = 'none'
      document.querySelector('.signUpBtn').style.display = 'none'
      document.querySelector('.top-container').style.display = 'none'
      document.querySelector('.search-container').style.display = 'flex'
      document.querySelector('.sair').style.display = 'flex'

      div_user.textContent = user.first_name + ' ' + user.last_name
      avatar.style.background = "url('https://reqres.in/img/faces/2-image.jpg') no-repeat"
      avatar.style.height = '128px'
      avatar.style.weight = '128px'
      avatar.style.backgroundSize = '75%'
    }
    )

}
//Verifica se há as variáveis para evitar erro JS
if (btnLogin && btnFechar && containerModal) {
  //Abrir Modal
  btnLogin.addEventListener('click', e => {
    e.preventDefault()
    containerModal.classList.add('ativo')
  })

  //Fechar modal geral
  function fecharModal(e) {
    e.preventDefault()
    containerModal.classList.remove('ativo')
  }

  btnFechar.addEventListener('click', fecharModal)
}

//Declaração de variáveis	da validação do formulário
const inputEmail = document.querySelector('.inputEmail'),
  inputPassword = document.querySelector('.inputPassword'),
  btnEntrar = document.querySelector('.btnEntrar')
btnEntrar.setAttribute('disabled', 'disabled')

//Validação Email
const validateEmail = e => {
  const input = e.currentTarget

  //Validação básica de Email
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  emailTest = regex.test(input.value)

  //Desabilita o botão caso o email seja inválido
  if (!emailTest) {
    btnEntrar.setAttribute('disabled', 'disabled')
    input.nextElementSibling.classList.add('error')
  } else if (passTest) {
    btnEntrar.removeAttribute('disabled')
    input.nextElementSibling.classList.remove('error')
  }
}

//Validação Password
const validatePassword = e => {
  const input = e.currentTarget

  //Password deverá ser maior que 3
  //Desabilita o botão caso seja menor
  if (input.value.length <= 3) {
    btnEntrar.setAttribute('disabled', 'disabled')
    input.nextElementSibling.classList.add('error')
  } else if (emailTest) {
    btnEntrar.removeAttribute('disabled')
    input.nextElementSibling.classList.remove('error')
  }
}

//Ativação funções de Validação do Email/Senha
inputEmail.addEventListener('input', validateEmail)
inputPassword.addEventListener('input', validatePassword)

//Verificando se o botão entrar exist
//Se existe, desenvolve o método para geração de token de login
if (btnEntrar) {
  btnEntrar.addEventListener('click', e => {
    e.preventDefault()

    fetch('https://reqres.in/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: inputEmail.value,
        password: inputPassword.value
      })
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)
        localStorage.setItem('mytoken', data.token)
        mytoken = localStorage.getItem('mytoken')
        window.location.reload(false);

      })
  })
}
if (sbtn) {
  sbtn.addEventListener('click', e => {
    e.preventDefault()

    fetch(covidAPI + '?country=' + inputSearch.value, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)
        resp = data.All
      }).then(th => {
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