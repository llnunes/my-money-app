const BillingCycle = require('./billingCycle')
// inclusao post faz validação de campos
// alteracao put nao faz validacao de campos
BillingCycle.methods(['get', 'post', 'put', 'delete'])
BillingCycle.updateOptions({new: true, runValidators: true})

module.exports = BillingCycle

