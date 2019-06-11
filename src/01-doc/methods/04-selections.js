//these are selections that don't require their own subclasses/methods
module.exports = {
  /** split-up results into multi-term phrases */
  clauses: function(n) {
    let r = this.splitAfter('#ClauseEnd')
    if (typeof n === 'number') {
      r = r.get(n)
    }
    return r
  },
  /** */
  hashTags: function(n) {
    let r = this.match('#HashTag').terms()
    if (typeof n === 'number') {
      r = r.get(n)
    }
    return r
  },
  /** */
  organizations: function(n) {
    let r = this.splitAfter('#Comma')
    r = r.match('#Organization+')
    if (typeof n === 'number') {
      r = r.get(n)
    }
    return r
  },
  /** */
  phoneNumbers: function(n) {
    let r = this.splitAfter('#Comma')
    r = r.match('#PhoneNumber+')
    if (typeof n === 'number') {
      r = r.get(n)
    }
    return r
  },
  /** */
  places: function(n) {
    let r = this.splitAfter('#Comma')
    r = r.match('#Place+')
    if (typeof n === 'number') {
      r = r.get(n)
    }
    return r
  },
  /** */
  topics: function(n) {
    let r = this.clauses()
    // Find people, places, and organizations
    let yup = r.people()
    yup.concat(r.places())
    yup.concat(r.organizations())
    let ignore = ['someone', 'man', 'woman', 'mother', 'brother', 'sister', 'father']
    yup = yup.not(ignore)
    //return them to normal ordering
    yup.sort('chronological')
    // yup.unique() //? not sure
    if (typeof n === 'number') {
      yup = yup.get(n)
    }
    return yup
  },
  /** */
  urls: function(n) {
    let r = this.match('#Url')
    if (typeof n === 'number') {
      r = r.get(n)
    }
    return r
  },
  /** */
  parentheses: function(n) {
    let r = this.match('#Parentheses+')
    //split-up consecutive ones
    r = r.splitAfter('#EndBracket')
    if (typeof n === 'number') {
      r = r.get(n)
    }
    return r
  },

  /** */
  questions: function(doc) {
    let list = doc.list.filter(p => {
      return p.lastTerm().hasQuestionMark()
    })
    return doc.buildFrom(list)
  },
  /** */
  statements: function(doc) {
    let list = doc.list.filter(p => {
      return p.lastTerm().hasQuestionMark() === false
    })
    return doc.buildFrom(list)
  },
  /** */
  sentences: function(doc) {
    let list = doc.list.filter(p => {
      return p.lastTerm().hasQuestionMark() !== true
    })
    return doc.buildFrom(list)
  },
}
