const btnRegister = document.querySelector('.signUpBtn')
const btnLogin = document.querySelector('.signInBtn')

const btnFechar = document.querySelector('.fechar')
const btnFecharR = document.querySelector('#btnFechar')


const containerModal = document.querySelector('.modalContainerLogin')
const containerModalRegister = document.querySelector('.modalContainerRegister')

const formRegister = document.querySelector('#RegisterForm')

formRegister.addEventListener('submit', registerUser)

 async function registerUser(e){
  e.preventDefault()
  const email = document.querySelector('#inputNameRegister').value
  const password = document.querySelector('#inputPasswordRegister').value

   const result = await fetch('./api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  }).then((res) => res.json())

  console.log(result)
}

// //Verifica se há as variáveis para evitar erro JS
if (btnLogin && btnFechar && containerModal) {
  //Abrir Modal
  btnLogin.addEventListener('click', e => {
    e.preventDefault()
    containerModal.classList.add('ativo')
  })
}

if (btnRegister && btnFecharR && containerModalRegister) {
    //Abrir Modal
    btnRegister.addEventListener('click', e => {
      e.preventDefault()
      containerModalRegister.classList.add('ativo')
    })
  }

  //Fechar modal geral
function fecharModal(e) {
    e.preventDefault()
    containerModal.classList.remove('ativo')
    containerModalRegister.classList.remove('ativo')}

function fecharModalRegister(e) {
  e.preventDefault()
  containerModalRegister.classList.remove('ativo')
}


btnFechar.addEventListener('click', fecharModal)
btnFecharR.addEventListener('click', fecharModalRegister)