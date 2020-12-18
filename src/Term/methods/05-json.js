const rankTags = require('./_bestTag')

const jsonDefault = {
  text: true,
  tags: true,
  implicit: true,
  whitespace: true,

  clean: false,
  id: false,
  index: false,
  offset: false,
  bestTag: false,
}

/** return various metadata for this term */
exports.json = function (options, world) {
  options = options || {}
  options = Object.assign({}, jsonDefault, options)
  let result = {}

  // default on
  if (options.text) {
    result.text = this.text
  }
  if (options.normal) {
    result.normal = this.clean
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
