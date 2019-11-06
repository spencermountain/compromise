const toAdverb = require('./toAdverb')
const toNoun = require('./toNoun')
const toVerb = require('./toVerb')

const addMethods = function(Doc) {
  /**  */
  class Adjective extends Doc {
    /** overload the original json with noun information */
    json(options) {
      let n = null
      if (typeof options === 'number') {
        n = options
        options = null
      }
      let res = []
      this.forEach(doc => {
        let json = doc.json(options)[0]
        let str = doc.text('reduced')
        json.toAdverb = toAdverb(str)
        json.toNoun = toNoun(str)
        json.toVerb = toVerb(str)
        res.push(json)
      })
      if (n !== null) {
        return res[n]
      }
      return res
    }
    conjugate(n) {
      let transform = this.world.transforms.adjectives
      let arr = []
      this.forEach(doc => {
        let str = doc.text('reduced')
        let obj = transform(str)
        obj.Adverb = toAdverb(str)
        obj.Noun = toNoun(str)
        obj.Verb = toVerb(str)
        arr.push(obj)
      })
      //support nth result
      if (typeof n === 'number') {
        return arr[n]
      }
      return arr
    }

    toSuperlative() {
      let transform = this.world.transforms.adjectives
      this.forEach(doc => {
        let obj = transform(doc.text('reduced'))
        doc.replaceWith(obj.Superlative, true)
      })
      return this
    }
    toComparative() {
      let transform = this.world.transforms.adjectives
      this.forEach(doc => {
        let obj = transform(doc.text('reduced'))
        doc.replaceWith(obj.Comparative, true)
      })
      return this
    }
    toAdverb() {
      this.forEach(doc => {
        let adverb = toAdverb(doc.text('reduced'))
        doc.replaceWith(adverb, true)
      })
      return this
    }
    toVerb() {
      this.forEach(doc => {
        let verb = toVerb(doc.text('reduced'))
        doc.replaceWith(verb, true)
      })
      return this
    }
    toNoun() {
      this.forEach(doc => {
        let noun = toNoun(doc.text('reduced'))
        doc.replaceWith(noun, true)
      })
      return this
    }
  }

  /** grab all the adjectives */
  Doc.prototype.adjectives = function(n) {
    let m = this.match('#Adjective')
    //grab (n)th result
    if (typeof n === 'number') {
      m = m.get(n)
    }
    return new Adjective(m.list, this, this.world)
  }
}
module.exports = addMethods
