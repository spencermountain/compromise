'use strict';
const fns = require('../fns')
const terms = require('../term')
const tags = require('../tags').tags

let filters = {}
let get = {}
let transforms = {}

//each POS tag is a filter in plural form,
// and a transform in toNoun form
// Object.keys(tags).forEach((tag) => {
//   const plural = fns.toPlural(tag)
//   filters[plural] = (t) => {
//     return t.pos[tag]
//   }
//   const name = 'to' + fns.titleCase(tag)
//   transforms[name] = (t) => {
//     return t.tag(tag)
//   }
// })
//
// all term.is() methods become filters in plural form
Object.keys(terms.is_methods).forEach((method) => {
  const plural = fns.toPlural(method)
  filters[plural] = (t) => {
    return t.is(method)
  }
})
//
// let transforms = {}
// //'to' methods - grab (& inflect) each 'is' method in terms
// Object.keys(terms.transforms).forEach((method) => {
//   let name = 'to' + fns.titleCase(method)
//   transforms[name] = (t) => {
//     return t.to(method)
//   }
// })
//
// let infos = {}
// //'info' methods - grab (& inflect) each 'is' method in terms
// Object.keys(terms.infos).forEach((method) => {
//   const plural = fns.toPlural(method)
//   infos[plural] = (t) => {
//     return t.info(method)
//   }
// })

module.exports = {
  filters: filters,
  get: get,
  transforms: transforms
}
console.log(module.exports)
