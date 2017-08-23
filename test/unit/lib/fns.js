'use strict'

var pad = function(str, width, char) {
  char = char || '.'
  str = str.toString()
  while (str.length < width) {
    str += char
  }
  return str
}

//helpers to make test output messages nicer
var str_test = function(got, input, want, t) {
  var msg = pad("'" + got + "'", 20) + "(want: '" + want + "' )" //'\'' + input +
  t.equal(got, want, msg)
  return
}

var arr_test = function(got, input, want, t) {
  got = JSON.stringify(got)
  want = JSON.stringify(want)
  var msg = pad("'" + got + "'") + " (want: '" + want + "' )" //'\'' + input +
  t.equal(got, want, msg)
  return
}

var has_pos = function(r, tags) {
  var terms = r.terms()
  for (var i = 0; i < terms.list.length; i++) {
    var t = terms.list[i].terms[0]
    if (!t.tags[tags[i]]) {
      return false
    }
  }
  return true
}

var pos_test = function(r, tags, t) {
  var str = ''
  var got = r
    .terms()
    .list.map(function(ts) {
      var term = ts.terms[0]
      str += ' ' + term.normal
      return Object.keys(term.tags)[0]
    })
    .join(', ')
  var msg = pad('"' + str.trim() + '"', 30) + pad(tags.join(', '), 45) + got
  t.equal(has_pos(r, tags), true, msg)
  return
}

var terms_test = function(terms, want, t, isText) {
  var str = ''
  var got = terms.map(function(term) {
    str += ' ' + term.text
    if (isText) {
      return term.text
    }
    return term.normal
  })
  var msg = pad('"' + str + '"', 38) + ' got: [' + got.join(',') + ']  want: [' + want.join(',') + ']'
  t.deepEqual(got, want, msg)
}

var isArray = function(someVar) {
  if (Object.prototype.toString.call(someVar) === '[object Array]') {
    return true
  }
  return false
}

module.exports = {
  str_test: str_test,
  pos_test: pos_test,
  terms_test: terms_test,
  arr_test: arr_test,
  isArray: isArray
}
