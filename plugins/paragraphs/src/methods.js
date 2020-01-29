const addMethods = function(Paragraphs, Doc) {
  const methods = {
    // return back to a regular Doc object
    sentences: function(n) {
      let list = []
      this.paragraphs.forEach(docs => {
        docs.forEach(doc => {
          list = list.concat(doc.list)
        })
      })
      let doc = new Doc(list, this.parent, this.world)
      if (typeof n === 'number') {
        return doc.eq(n)
      }
      return doc
    },

    // grab every term in the paragraph
    terms: function(n) {
      let list = []
      this.paragraphs.forEach(docs => {
        docs.forEach(doc => {
          list = list.concat(doc.terms().list)
        })
      })
      let doc = new Doc(list, this.parent, this.world)
      if (typeof n === 'number') {
        return doc.eq(n)
      }
      return doc
    },

    /** return metadata for each paragraph */
    json: function(options = {}) {
      return this.paragraphs.map(docs => {
        let text = docs.map(d => d.text()).join('')
        let obj = {
          text: text,
          sentences: docs.map(d => d.json(options)),
        }
        if (options.normal) {
          obj.normal = docs.map(d => d.text('normal')).join('')
        }
        return obj
      })
    },

    /** print out the text of each paragraph */
    text: function(options) {
      let text = ''
      this.paragraphs.forEach(docs => {
        docs.forEach(doc => {
          text += doc.text(options)
        })
      })
      return text
    },

    // accessor method wrappers
    eq: function(n) {
      let list = [this.paragraphs[n]]
      list = list.filter(l => l)
      return new Paragraphs(list, this, this.world)
    },
    first: function() {
      return this.eq(0)
    },
    last: function() {
      let len = this.length
      return this.eq(len - 1)
    },
    debug: function() {
      this.paragraphs.forEach(docs => {
        console.log('\n=-=-=-=-')
        docs.forEach(doc => {
          doc.debug()
        })
      })
    },

    // match methods

    // returns doc objects, not paragraph objects
    match: function(str) {
      let list = []
      this.paragraphs.forEach(docs => {
        docs.forEach(doc => {
          let m = doc.match(str)
          if (m.found) {
            list = list.concat(m.list)
          }
        })
      })
      return new Doc(list, this.parent, this.world)
    },
    // returns doc objects
    not: function(str) {
      let list = []
      this.paragraphs.forEach(docs => {
        docs.forEach(doc => {
          let m = doc.not(str)
          if (m.found) {
            list = list.concat(m.list)
          }
        })
      })
      return new Doc(list, this.parent, this.world)
    },
    // returns paragraph objects
    if: function(str) {
      let list = this.paragraphs.filter(docs => {
        return docs.some(doc => doc.has(str))
      })
      return new Paragraphs(list, this, this.world)
    },
    ifNo: function(str) {
      let list = this.paragraphs.filter(docs => {
        return docs.some(doc => doc.has(str) === false)
      })
      return new Paragraphs(list, this, this.world)
    },
    // returns boolean
    has: function(str) {
      return this.paragraphs.some(docs => {
        return docs.some(doc => doc.has(str))
      })
    },

    //loops
    forEach: function(fn) {
      this.paragraphs.forEach(docs => {
        let p = new Paragraphs([docs], this, this.world)
        fn(p)
      })
      return this
    },
    map: function(fn) {
      let paragraphs = this.paragraphs.map(docs => {
        let p = new Paragraphs([docs], this, this.world)
        return fn(p)
      })
      new Paragraphs(paragraphs, this, this.world)
    },

    //each paragraph must have atleast one sentence that matches
    filter: function(fn) {
      this.paragraphs = this.paragraphs.filter(docs => {
        return docs.some(fn)
      })
      return this
    },
  }
  // aliases
  methods.get = methods.eq

  Object.keys(methods).forEach(k => {
    Paragraphs.prototype[k] = methods[k]
  })
}
module.exports = addMethods
