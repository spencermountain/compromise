/** use only the first result(s) */
exports.first = function(n) {
  if (n === undefined) {
    return this.get(0)
  }
  return this.slice(0, n)
}

/** use only the last result(s) */
exports.last = function(n) {
  if (n === undefined) {
    return this.get(this.list.length - 1)
  }
  let end = this.list.length
  return this.slice(end - n, end)
}

/** grab a given subset of the results*/
exports.slice = function(start, end) {
  let list = this.list.slice(start, end)
  return this.buildFrom(list)
}

/* grab nth result */
exports.eq = function(n) {
  let p = this.list[n]
  if (p === undefined) {
    return this.buildFrom([])
  }
  return this.buildFrom([p])
}
exports.get = exports.eq

/** grab term[0] for every match */
exports.firstTerms = function() {
  return this.match('^.')
}
exports.firstTerm = exports.firstTerms

/** grab the last term for every match  */
exports.lastTerms = function() {
  return this.match('.$')
}
exports.lastTerm = exports.lastTerms

/** return a flat array of term objects */
exports.termList = function(num) {
  let arr = []
  //'reduce' but faster
  for (let i = 0; i < this.list.length; i++) {
    let terms = this.list[i].terms()
    for (let o = 0; o < terms.length; o++) {
      arr.push(terms[o])
      //support .termList(4)
      if (num !== undefined && arr[num] !== undefined) {
        return arr[num]
      }
    }
  }
  return arr
}

/* grab named capture group terms as object */
const groupByNames = function(doc) {
  let res = {}
  const groups = {}
  for (let i = 0; i < doc.list.length; i++) {
    const phrase = doc.list[i]
    const names = Object.values(phrase.names)
    for (let j = 0; j < names.length; j++) {
      const { group, start, length } = names[j]
      if (!groups[group]) {
        groups[group] = []
      }
      groups[group].push(phrase.buildFrom(start, length))
    }
  }
  const keys = Object.keys(groups)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    res[key] = doc.buildFrom(groups[key])
  }
  return res
}

const getOneName = function(doc, name) {
  const arr = []
  for (let i = 0; i < doc.list.length; i++) {
    const phrase = doc.list[i]
    let keys = Object.keys(phrase.names)
    keys = keys.filter(id => {
      if (phrase.names[id].group !== undefined) {
        return phrase.names[id].group === name
      }

      return phrase.names[id].index === name
    })
    keys.forEach(id => {
      arr.push(phrase.buildFrom(phrase.names[id].start, phrase.names[id].length))
    })
  }
  return doc.buildFrom(arr)
}

/** grab named capture group results */
exports.byName = function(target) {
  if (target === undefined) {
    return groupByNames(this)
  }
  if (typeof target === 'number') {
    target = String(target)
  }
  return getOneName(this, target) || this.buildFrom([])
}
exports.names = exports.byName
exports.named = exports.byName

/** get the full-sentence each phrase belongs to */
exports.fullSentence = function(n) {
  let arr = []
  this.list.forEach(p => {
    arr.push(p.fullSentence())
  })
  if (typeof n === 'number') {
    return this.buildFrom([arr[n]])
  }
  return this.buildFrom(arr)
}
exports.fullSentences = exports.fullSentence
exports.sentence = exports.fullSentence
