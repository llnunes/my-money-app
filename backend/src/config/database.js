const moongose = require ('mongoose')
moongose.Promise = global.Promise
module.exports = moongose.connect ('mongodb://localhost/mymoney')

moongose.Error.messages.general.required = "O atributo '{PATH}' é obrigatorio!"
moongose.Error.messages.Number.min = "O '{VALUE}' informado é menor que o limite minimo de '{MIN}'."
moongose.Error.messages.Number.max = "O '{VALUE}' informado é maior que o limite maximo de '{MAX}'."
moongose.Error.messages.String.enum = "O '{VALUE}' não é válido para o atributo '{PATH}'."
