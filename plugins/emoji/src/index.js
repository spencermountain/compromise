const tagger = require('./tagger')

const addMethods = function(Doc, world) {
  // tag emojis and emoticons
  world.postProcess(tagger)

  /** grab all emojis */
  Doc.prototype.emoji = function() {
    return this.match('#Emoji')
  }
}
module.exports = addMethods
