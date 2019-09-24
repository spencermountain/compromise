const rankTags = require('./_rankTags')

const jsonDefault = {
  text: true,
  tags: true,
  implicit: true,

  clean: false,
  raw: false,
  id: false,
  offset: false,
  whitespace: false,
  bestTag: false,
}

/** return various metadata for this term */
exports.json = function(options, world) {
  options = options || {}
  options = Object.assign({}, jsonDefault, options)
  let result = {}

  // default on
  if (options.text) {
    result.text = this.text
  }
  if (options.tags) {
    result.tags = Object.keys(this.tags)
  }

  // default off
  if (options.clean) {
    result.clean = this.clean
  }
  if (options.id || options.offset) {
    result.id = this.id
  }
  if (options.normal) {
    result.normal = this.normal
  }
  if (options.raw) {
    result.raw = this.raw
  }
  if (options.implicit && this.implicit !== null) {
    result.implicit = this.implicit
  }
  if (options.whitespace) {
    result.pre = this.pre
    result.post = this.post
  }
  if (options.bestTag) {
    result.bestTag = rankTags(this, world)[0]
  }

  return result
}
