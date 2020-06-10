const parse = require('./parse')
const methods = require('./methods')

const addMethod = function (Doc) {
  /**  */
  class Sentences extends Doc {
    constructor(list, from, world) {
      list = list.map((p) => p.clone(true))
      super(list, from, world)
    }

    /** overload the original json with noun information */
    json(options) {
      let n = null
      if (typeof options === 'number') {
        n = options
        options = null
      }
      options = options || { text: true, normal: true, trim: true, terms: true }
      let res = []
      this.forEach((doc) => {
        let json = doc.json(options)[0]
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

    /** the main noun of the sentence */
    subjects() {
      return this.map((doc) => {
        let res = parse(doc)
        return res.subject
      })
    }

    /** return sentences that are in passive-voice */
    isPassive() {
      return this.if('was #Adverb? #PastTense #Adverb? by') //haha
    }

    /** add a word to the start of this sentence */
    prepend(str) {
      this.forEach((doc) => {
        // repair the titlecase
        let firstTerms = doc.match('^.')
        firstTerms.not('#ProperNoun').toLowerCase()
        // actually add the word
        firstTerms.prepend(str)
        // add a titlecase
        firstTerms.terms(0).toTitleCase()
      })
      return this
    }

    /** add a word to the end of this sentence */
    append(str) {
      let hasEnd = /[.?!]\s*$/.test(str)
      this.forEach((doc) => {
        let end = doc.match('.$')
        let lastTerm = end.termList(0)
        let punct = lastTerm.post
        if (hasEnd === true) {
          punct = ''
        }
        // add punctuation to the end
        end.append(str + punct)
        // remove punctuation from the former last-term
        lastTerm.post = ' '
      })
      return this
    }
  }
  // add some aliases
  methods.questions = methods.isQuestion
  methods.exclamations = methods.isExclamation
  methods.statements = methods.isStatement

  Object.assign(Sentences.prototype, methods)

  /** overload original sentences() method and return Sentence class**/
  Doc.prototype.sentences = function (n) {
    let arr = []
    this.list.forEach((p) => {
      arr.push(p.fullSentence())
    })
    //grab (n)th result
    let s = new Sentences(arr, this, this.world)
    if (typeof n === 'number') {
      s = s.get(n)
    }
    return s
  }
  return Doc
}
module.exports = addMethod
