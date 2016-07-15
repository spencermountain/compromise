'use strict';

const pos = {
  noun: require('./noun/noun')
}

const extend = (t, more) => {
  Object.keys(more).forEach((k) => {
    t[k] = more[k]
  })
  return t
}

const assign = function(t, tag) {
  if (transforms[tag]) {
    console.log('--assigning ' + tag + ' transforms to "' + t.text + '"')
  }
  return
}

module.exports = assign
