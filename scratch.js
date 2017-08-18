'use strict'
// var nlp = require('./src/index')
// nlp.verbose('tagger');
// const fresh = require('./test/unit/lib/freshPrince.js');

// let nlp2 = nlp.clone()
// nlp.addWords({ here: 'Different' })

// nlp('here').debug()
// nlp2('here').debug()

// let lexicon = { here: 'init' }
// let lexicon2 = Object.assign({}, lexicon)
// lexicon.here = 'different'
// console.log(lexicon)
// console.log(lexicon2)

// let original = {
//   flag: 'init'
// }
//
// let state = Object.assign({}, original)
//
// const World = function(state) {
//   this.state = state
//   let nlp = () => {
//     console.log('hi ' + this.state)
//   }
//   nlp.change = () => {
//     this.state = 'new'
//   }
//   // console.log(this)
//   return nlp
// }
// let nlp = new World('init')
// // let nlp2 = new World('new')
//
// nlp()
// nlp.change()
// nlp()
// // nlp2()
// // nlp()

var original = { name: 'Marvin' }
var world = function() {
  console.log('Hello, ' + this.name)
}

var nlp = function() {
  world.call(original)
}
var toOriginal = function() {
  nlp = function() {
    world.call(original)
  }
}
nlp.original = toOriginal
nlp.change = function(state) {
  nlp = function() {
    world.call(state)
  }
  nlp.original = toOriginal
}

nlp()
nlp.change({ name: 'Zaphod' })
nlp()
nlp.original()
nlp()
