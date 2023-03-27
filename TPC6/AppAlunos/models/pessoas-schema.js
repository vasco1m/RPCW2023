var mongoose = require('mongoose');

var moradaSchema = new mongoose.Schema({
    cidade: String,
    distrito: String
});

var partidoSchema = new mongoose.Schema({
    party_abbr: String,
    party_name: String
});

var atributoSchema = new mongoose.Schema({
    fumador: Boolean,
    gosta_cinema: Boolean,
    gosta_viajar: Boolean,
    gosta_musica: Boolean,
    gosta_leitura: Boolean,
    gosta_comer: Boolean,
    gosta_cafe: Boolean,
    gosta_cerveja: Boolean,
    gosta_vinho: Boolean,
    gosta_cachaca: Boolean,
    gosta_animais_estimacao: Boolean,
    gosta_dancar: Boolean,
    acorda_cedo: Boolean,
    comida_favorita: String
});

var pessoaSchema = new mongoose.Schema({
    nome: String,
    idade: Number,
    sexo: String,
    morada: moradaSchema,
    BI: String,
    profissao: String,
    partido_politico: partidoSchema,
    religiao: String,
    desportos: [String],
    animais: [String],
    figura_publica_pt: [String],
    marca_carro: String,
    destinos_favoritos: [String],
    atributos: atributoSchema,
    id: String
});

module.exports = mongoose.model('Pessoa', pessoaSchema);