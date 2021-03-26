const methods = [
  require('./00-basic'),
  require('./01-values'),
  require('./02-dates'),
  require('./03-sections'),
  require('./04-time'),
  require('./05-shifts'),
  require('./06-intervals'),
  require('./07-timezone'),
  require('./08-fixup'),
]

// run each of the taggers
const tagDate = function (doc) {
  // doc = normalize(doc)
  // run taggers
  methods.forEach((fn) => fn(doc))
  return doc
}
module.exports = tagDate
