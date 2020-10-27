const hasPlural = require('./plural/hasPlural')
const getArticle = require('./getArticle')
const isPlural = require('./plural/isPlural')
const toPossessive = require('./toPossessive')
const parse = require('./parse')

const methods = {
  /** overload the original json with noun information */
  json: function (options) {
    let n = null
    if (typeof options === 'number') {
      n = options
      options = null
    }
    options = options || { text: true, normal: true, trim: true, terms: true }
    let res = []
    this.forEach(doc => {
      let json = doc.json(options)[0]
      json.article = getArticle(doc)
      res.push(json)
    })
    if (n !== null) {
      return res[n]
    }
    return res
  },
  /** get all adjectives describing this noun*/
  adjectives: function () {
    let list = this.lookAhead('^(that|who|which)? (was|is|will)? be? #Adverb? #Adjective+')
    list = list.concat(this.lookBehind('#Adjective+ #Adverb?$'))
    list = list.match('#Adjective')
    return list.sort('index')
  },

  isPlural: function () {
    return this.if('#Plural') //assume tagger has run?
  },
  hasPlural: function () {
    return this.filter(d => hasPlural(d))
  },
  toPlural: function (agree) {
    let toPlural = this.world.transforms.toPlural
    this.forEach(doc => {
      if (doc.has('#Plural') || hasPlural(doc) === false) {
        return
      }
      // double-check it isn't an un-tagged plural
      let main = parse(doc).main
      let str = main.text('reduced')
      if (!main.has('#Singular') && isPlural(str) === true) {
        return
      }
      str = toPlural(str, this.world)
      main.replace(str).tag('#Plural')
      // 'an apple' -> 'apples'
      if (agree) {
        let an = main.lookBefore('(an|a) #Adjective?$').not('#Adjective')
        if (an.found === true) {
          an.remove()
        }
      }
    })
    return this
  },
  toSingular: function (agree) {
    let toSingular = this.world.transforms.toSingular
    this.forEach(doc => {
      if (doc.has('^#Singular+$') || hasPlural(doc) === false) {
        return
      }
      // double-check it isn't an un-tagged plural
      let main = parse(doc).main
      let str = main.text('reduced')
      if (!main.has('#Plural') && isPlural(str) !== true) {
        return
      }
      str = toSingular(str, this.world)
      main.replace(str).tag('#Singular')
      // add an article
      if (agree) {
        // 'apples' -> 'an apple'
        let start = doc
        let adj = doc.lookBefore('#Adjective')
        if (adj.found) {
          start = adj
        }
        let article = getArticle(start)
        start.insertBefore(article)
      }
    })
    return this
  },
  toPossessive: function () {
    this.forEach(d => {
      toPossessive(d)
    })
    return this
  },
}
module.exports = methods
