const randChar = function(char) {
  let len = Math.random() * 10
  len = Math.ceil(len)
  let str = ''
  for (let i = 0; i < len; i++) {
    str += char
  }
  return str
}

const doProp = function(doc, prop, options, tag) {
  // not false
  if (options[prop]) {
    let m = doc[prop]()
    // replace with custom char of random length
    if (typeof options[prop] === 'string') {
      if (options[prop].length === 1) {
        m.replaceWith(randChar(options[prop]))
      } else {
        m.replaceWith(options[prop])
      }
    }
    // support a custom function
    else if (typeof options[prop] === 'function') {
      let fn = options[prop]
      m.replaceWith(fn(m))
    }
    // optionally, tag the replacement
    if (tag) {
      m.tag(tag, 'redact-' + prop)
    }
  }
}

const redact = function(doc, options) {
  doProp(doc, 'dates', options, 'Date')
  doProp(doc, 'numbers', options, 'Value')
  doProp(doc, 'money', options, 'Money')
  doProp(doc, 'people', options, 'Person')
  doProp(doc, 'places', options, 'Place')
  doProp(doc, 'organizations', options, 'Organization')
  return doc
}
module.exports = redact
