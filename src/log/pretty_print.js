'use strict'
const fns = require('./fns')
const color = require('./color')

//specific-ways to print classes
var format = {
  Sentence: (s, indent) => {
    console.log(indent + '[Sentence] ' + color.red(s.input))
    s.terms.forEach((t) => {
      console.log(indent + '   ' + color.green('- ' + t.text) + '   [' + t.constructor.name + ']')
    })
  }
}
format.Text = (t, indent) => {
  console.log(indent + '[Text] ' + color.red(t.input))
  t.sentences.forEach((s) => {
    format.Sentence(s, indent + '   ')
  })
}

const pretty_print = function(input, path) {
  path = path || ''
  let indent = fns.findIndent(path) || ''
  console.log(fns.makePath(path, indent))

  indent = fns.leftPad(indent, path.length, ' ') || ' '
  if (typeof input === 'string') {
    console.log(indent + input)
    return
  }
  if (typeof input === 'object' && format[input.constructor.name]) {
    format[input.constructor.name](input, indent)
    return
  }
  return
}

module.exports = pretty_print
