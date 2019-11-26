const parse = require('./parse')

const addMethod = function(Doc) {
  /**  */
  class Sentences extends Doc {
    constructor(list, from, world) {
      list = list.map(p => p.clone(true))
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
      this.forEach(doc => {
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
      return this.map(doc => {
        let res = parse(doc)
        return res.subject
      })
    }

    toPastTense() {
      this.forEach(doc => {
        let obj = parse(doc)
        let vb = obj.verb.clone()
        vb = vb.verbs().toPastTense()
        obj.verb.replaceWith(vb.text(), true, true)
      })
      return this
    }
    toPresentTense() {
      this.forEach(doc => {
        let obj = parse(doc)
        let vb = obj.verb.clone()
        vb = vb.verbs().toPresentTense()
        obj.verb.replaceWith(vb.text(), true, true)
      })
      return this
    }
    toFutureTense() {
      this.forEach(doc => {
        let obj = parse(doc)
        let vb = obj.verb.clone()
        vb = vb.verbs().toFutureTense()
        obj.verb.replaceWith(vb.text(), true, true)
      })
      return this
    }
    toContinuous() {}

    toNegative() {
      this.forEach(doc => {
        let obj = parse(doc)
        let vb = obj.verb.clone()
        vb = vb.verbs().toNegative()
        obj.verb.replaceWith(vb.text(), true, true)
      })
      return this
    }
    toPositive() {
      this.forEach(doc => {
        let obj = parse(doc)
        let vb = obj.verb.clone()
        vb = vb.verbs().toPositive()
        obj.verb.replaceWith(vb.text(), true, true)
      })
      return this
    }

    isPassive() {
      return this.has('was #Adverb? #PastTense #Adverb? by') //haha
    }
    /** return sentences ending with '?' */
    isQuestion() {
      return this.filter(doc => {
        let term = doc.lastTerm().termList(0)
        return term.hasPost('?')
      })
    }
    /** return sentences ending with '!' */
    isExclamation() {
      return this.filter(doc => {
        let term = doc.lastTerm().termList(0)
        return term.hasPost('!')
      })
    }
    /** return sentences with neither a question or an exclamation */
    isStatement() {
      return this.filter(doc => {
        let term = doc.lastTerm().termList(0)
        return !term.hasPost('?') && !term.hasPost('!')
      })
    }

    /** add a word to the start of this sentence */
    prepend(str) {
      this.forEach(doc => {
        // repair the titlecase
        let firstTerms = doc.match('^.')
        firstTerms.not('#ProperNoun').toLowerCase()
        // actually add the word
        firstTerms.prepend(str)
        // add a titlecase
        firstTerms.terms(0).toTitleCase()
      })
    }

    /** add a word to the end of this sentence */
    append(str) {
      let hasEnd = /[.?!]\s*$/.test(str)
      this.forEach(doc => {
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
    }

    toExclamation() {}
    toQuestion() {}
    toStatement() {}
  }

  Doc.prototype.sentences = function(n) {
    let match = this.all()

    //grab (n)th result
    if (typeof n === 'number') {
      match = match.get(n)
    }
    return new Sentences(match.list, this, this.world)
  }
  return Doc
}
module.exports = addMethod
