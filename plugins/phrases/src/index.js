const tagger = require('./tagger')
const tags = require('./tags')
const parse = require('./parse')

const addMethods = function (Doc, world) {
  /**  */
  class Phrases extends Doc {}

  /** post-process tagger */
  world.postProcess(tagger)

  /** add some tags */
  world.addTags(tags)

  /** add our methods */
  Doc.prototype.phrases = function (n) {
    let m = parse(this)
    //grab (n)th result
    if (typeof n === 'number') {
      m = m.get(n)
    }
    return new Phrases(m.list, this, this.world)
  }
}
module.exports = addMethods
