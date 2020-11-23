const parse = require('../parse')

/** overload the original json with noun information */
exports.json = function (options) {
  let n = null
  if (typeof options === 'number') {
    n = options
    options = null
  }
  options = options || { text: true, normal: true, trim: true, terms: true }
  let res = []
  this.forEach((doc) => {
    let json = doc._json(options)[0]
    let obj = parse(doc)
    json.subject = obj.subject.json(options)[0]
    json.verb = obj.verb.json(options)[0]
    json.object = obj.object.json(options)[0]
    res.push(json)
  })
  if (n !== null) {
    return res[n]
  }
  return res
}
