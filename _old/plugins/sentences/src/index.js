const tags = require('./tags')
const tagger = require('./tagger')

const methods = Object.assign(
  {},
  require('./misc/append'),
  require('./misc/json'),
  require('./misc/negative'),
  require('./questions'),
  require('./tense'),
  require('./phrases')
)

const plugin = function (Doc, world) {
  // our new tags
  world.addTags(tags)
  // run our tagger
  world.postProcess(tagger)
  /**  */
  class Sentences extends Doc {
    constructor(list, from, w) {
      list = list.map((p) => p.clone(true))
      super(list, from, w)
    }
  }
  // add some aliases
  methods.questions = methods.isQuestion
  methods.exclamations = methods.isExclamation
  methods.statements = methods.isStatement
  // keep backups of these methods
  methods._prepend = Sentences.prototype.prepend
  methods._append = Sentences.prototype.append
  methods._json = Sentences.prototype.json
  Object.assign(Sentences.prototype, methods)

  /** create a new Sentences object */
  Sentences.prototype.buildFrom = function (list) {
    list = list.map((p) => p.clone(true))
    let doc = new Sentences(list, this, this.world)
    return doc
  }
  /** create a new Doc object */
  Sentences.prototype.toDoc = function () {
    return Doc.prototype.buildFrom(this.list)
  }

  /** overload original sentences() method and return Sentence class**/
  Doc.prototype.sentences = function (n) {
    let arr = []
    this.list.forEach((p) => {
      arr.push(p.fullSentence())
    })
    let s = new Sentences(arr, this, this.world)
    if (typeof n === 'number') {
      s = s.get(n)
    }
    return s
  }
  return Doc
}
module.exports = plugin
