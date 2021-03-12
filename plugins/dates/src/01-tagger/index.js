const methods = [
  require('./00-basic'),
  require('./01-values'),
  require('./02-dates'),
  require('./03-sections'),
  require('./04-time'),
  require('./05-shifts'),
  require('./06-intervals'),
  require('./07-fixup'),
]

// normalizations to run before tagger
const normalize = function (doc) {
  // turn '20mins' into '20 mins'
  if (typeof doc.numbers === 'function') {
    doc.numbers().normalize()
  } else {
    console.warn(
      `Warning: compromise-numbers plugin is not loaded.\n   You should load this plugin \n     - https://bit.ly/3t8RfFG`
    )
  }
  return doc
}

// run each of the taggers
const tagDate = function (doc) {
  doc = normalize(doc)
  // run taggers
  methods.forEach((fn) => fn(doc))
  return doc
}
module.exports = tagDate
