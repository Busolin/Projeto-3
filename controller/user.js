const { application } = require("express");
const dbAcess = require("../model/dbAcess");

/*//define o usuario
class User {
    constructor(nome, sobrenome, login, senha, imagem) {
        this.nome = nome
        this.sobrenome = sobrenome
        this.login = login
        this.senha = senha
        this.imagem = imagem
    }

    login(login, senha) {
       
        return 0
    }
    register(){
        return 0
    }
    
}
//faz o login

//faz o registro9*/
module.exports.index = function () {
    const dbacess = new dbAcess()
    dbacess.register()
    dbacess.login('fulano', 112639)
}
