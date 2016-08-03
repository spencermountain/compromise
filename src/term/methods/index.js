'use strict';
const fns = require('../../fns');
const terms = require('../../term');
const tags = require('../../tags');
let filters = {};
let gets = {};
let transforms = {};
let info = {};
let is_methods = {};

// each POS tag is a filter in plural form,
// and a transform, like 'toNoun'
Object.keys(tags).forEach((tag) => {
  const plural = fns.toPlural(tag.toLowerCase());
  filters[plural] = tag;
  const name = 'to' + fns.titleCase(tag);
  transforms[name] = tag;
});

// 'is' methods become filters in plural form
Object.keys(terms.is_methods).forEach((method) => {
  const plural = fns.toPlural(method.toLowerCase());
  filters[plural] = method;
});

// 'to' methods are bulk transforms
Object.keys(terms.transforms).forEach((method) => {
  let name = 'to' + fns.titleCase(method);
  transforms[name] = method;
});
//
//'info' methods - are 'get' calls
Object.keys(terms.infos).forEach((method) => {
  const name = fns.toPlural(method);
  gets[name] = terms.infos;
  info[method] = terms.infos[method];
});


Object.keys(terms.is_methods).forEach((method) => {
  is_methods[method] = terms.is_methods[method];
});

module.exports = {
  filters: filters,
  gets: gets,
  transforms: transforms,
  info: info,
  is_methods: is_methods
};
