'use strict'
//use this file for messing around.
//... it is not included in the build
console.log("\n\n\n\n\n\n\n========================\n\n")

const nlp = require('./src/index')
const log = require('./src/log')


let context = {
  debug: true
}
let r = nlp('John is cool. He is nice', context).to('Exclamation')
log(r, 'main')
log(r, 'main/path')