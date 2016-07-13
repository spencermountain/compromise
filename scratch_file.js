'use strict'
//use this file for messing around.
//... it is not included in the build
console.log("\n\n\n\n")

const nlp = require('./src/index')
const log = require('./src/log/log')


let context = {
  debug: true
}
let r = nlp('John is cool. He is nice', context).to('Exclamation')
log.here('main')
log.here('main/cool')
log.change('fun -> funs', 'fun/cool')
log.show(r, 'fun/cool')