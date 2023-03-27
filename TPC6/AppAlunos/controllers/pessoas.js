var axios = require('axios')
var Pessoa = require('../models/pessoas-schema')

// Student list
module.exports.list = () => {
    return Pessoa
        .find()
        .sort({nome: 1}) // Sort by name
        .then(docs => {
            return docs
        })
        .catch(erro => {
            return erro
        })
}

module.exports.getPessoa = id => {
    return Pessoa
        .findOne({id: id})
        .then(student => {
            return student
        })
        .catch(erro => {
            return erro
        })
}

module.exports.addPessoa = a => {
    return Pessoa
        .create(a)
        .then(student => {
            return student
        })
        .catch(erro => {
            return erro
        })
}

module.exports.updatePessoa = a => {
    return Pessoa
        .updateOne({id: a.id}, a)
        .then(student => {
            return student
        })
        .catch(erro => {
            return erro
        })
}

module.exports.deletePessoa = id => {
    return Pessoa
        .deleteOne({id: id})
        .then(resposta => {
            return resposta.data
        })
        .catch(erro => {
            return erro
        })
}