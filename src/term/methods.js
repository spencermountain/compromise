'use strict';
const fns = require('../fns')
const terms = require('../term')
const tags = require('../tags').tags

let filters = {}
let get = {}
let transforms = {}

// each POS tag is a filter in plural form,
// and a transform, like 'toNoun'
Object.keys(tags).forEach((tag) => {
  const plural = fns.toPlural(tag.toLowerCase())
  filters[plural] = (t) => {
    return t.pos[tag]
  }
  const name = 'to' + fns.titleCase(tag)
  transforms[name] = (t) => {
    return t.tag(tag)
  }
})

// 'is' methods become filters in plural form
Object.keys(terms.is_methods).forEach((method) => {
  const plural = fns.toPlural(method.toLowerCase())
  filters[plural] = (t) => {
    return t.is(method)
  }
})

// 'to' methods are bulk transforms
Object.keys(terms.transforms).forEach((method) => {
  let name = 'to' + fns.titleCase(method)
  transforms[name] = (t) => {
    return t.to(method)
  }
})
//
//'info' methods - are 'get' calls
Object.keys(terms.infos).forEach((method) => {
  const name = fns.toPlural(method)
  get[name] = (t) => {
    return t.info(method)
  }
})

module.exports = {
  filters: filters,
  get: get,
  transforms: transforms
}
