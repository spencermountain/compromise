'use strict';

let terms = [
  'adjective',
  'adverb',
  'date',
  'noun',
  'person',
  'place',
  'term',
  'url',
  'value',
  'verb'
].reduce((h, t) => {
  h[t] = require('./' + t + '/index.js')
  return h
}, {})

//get all the transforms, etc
const grab_methods = (str) => {
  let obj = {}
  Object.keys(terms).forEach((k) => {
    Object.keys(terms[k][str]).forEach((method) => {
      if (obj[method]) {
        console.log('--name collison--' + method)
      }
      obj[method] = terms[k][str][method]
    })
  })
  return obj
}

module.exports = {
  transforms: grab_methods('transform'),
  infos: grab_methods('info'),
  is_methods: grab_methods('is'),
  renders: terms.term.render
}
// console.log(module.exports)
