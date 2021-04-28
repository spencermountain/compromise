// const nlp = require('../../src/index')
// nlp.extend(require('./src'))
const compile = require('./src/compile')
const rules = require('./rules.js')
console.log(rules.length, 'total')

let res = compile(rules)
console.log(res)
