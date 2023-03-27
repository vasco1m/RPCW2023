var express = require('express');
var router = express.Router();
var Pessoas = require('../controllers/pessoas')

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Pessoas.list()
    .then(pessoas => {
      res.render('index', { slist: pessoas, d: data });
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da lista de pessoas"})
    })
});

/* GET Student Form. */
router.get('/pessoas/registo', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  res.render('addPessoaForm', {d: data})
});

/* GET Student page. */
router.get('/pessoas/:idPessoa', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Pessoas.getPessoa(req.params.idPessoa)
    .then(pessoa => {
      res.render('pessoa', { p: pessoa, d: data });
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do registo de pessoa"})
    })
});

/* GET Student Update Form. */
router.get('/pessoas/edit/:idPessoa', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Pessoas.getPessoa(req.params.idPessoa)
    .then(pessoa => {
      res.render('updatePessoaForm', {p: pessoa, d: data})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do registo de pessoa"})
    })
});

/* GET Student Delete Form. */
router.get('/pessoas/delete/:idPessoa', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Pessoas.getPessoa(req.params.idPessoa)
    .then(pessoa => {
      res.render('deletePessoaForm', {p: pessoa, d: data})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do registo de pessoa"})
    })
});

/* GET Delete Confirmation */
router.get('/pessoas/delete/:idPessoa/confirm', (req,res)=>{
  Pessoas.deletePessoa(req.params.idPessoa)
    .then(resposta => {
      res.redirect('/')
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do registo de pessoa"})
    })
})

// POST Student Form Data
router.post('/pessoas/registo', (req,res) => {
  Pessoas.addPessoa(req.body)
    .then(pessoa => {
      res.render('addPessoaConfirm', {p: pessoa})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro no armazenamento do registo de pessoa"})
    })
})

// POST Student Update Form
router.post('/pessoas/edit', (req,res) => {
  var data = new Date().toISOString().substring(0, 16)
  Pessoas.updatePessoa(req.body)
    .then(pessoa => {
      res.render('updatePessoaConfirm', {p: pessoa})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na alteração do registo de pessoa"})
    })
})

module.exports = router;
