const metaphone = require('./metaphone')

/** adds .numbers() method */
const plugin = function (Doc) {
  Doc.prototype.pronounce = function (opts = {}) {
    opts.normal = true
    let json = this.json(opts)
    json.forEach((obj) => {
      obj.pronounce = metaphone(obj.normal)
    })
    return json
  }
}

module.exports = plugin
