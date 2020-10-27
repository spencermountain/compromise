/** use only the first result(s) */
exports.first = function (n) {
  if (n === undefined) {
    return this.get(0)
  }
  return this.slice(0, n)
}

/** use only the last result(s) */
exports.last = function (n) {
  if (n === undefined) {
    return this.get(this.list.length - 1)
  }
  let end = this.list.length
  return this.slice(end - n, end)
}

/** grab a given subset of the results*/
exports.slice = function (start, end) {
  let list = this.list.slice(start, end)
  return this.buildFrom(list)
}

/* grab nth result */
exports.eq = function (n) {
  let p = this.list[n]
  if (p === undefined) {
    return this.buildFrom([])
  }
  return this.buildFrom([p])
}
exports.get = exports.eq

/** grab term[0] for every match */
exports.firstTerms = function () {
  return this.match('^.')
}
exports.firstTerm = exports.firstTerms

/** grab the last term for every match  */
exports.lastTerms = function () {
  return this.match('.$')
}
exports.lastTerm = exports.lastTerms

/** return a flat array of term objects */
exports.termList = function (num) {
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
const getGroups = function (doc) {
  let res = {}
  const allGroups = {}
  for (let i = 0; i < doc.list.length; i++) {
    const phrase = doc.list[i]
    const groups = Object.keys(phrase.groups).map(k => phrase.groups[k])
    for (let j = 0; j < groups.length; j++) {
      const { group, start, length } = groups[j]

      if (!allGroups[group]) {
        allGroups[group] = []
      }
      allGroups[group].push(phrase.buildFrom(start, length))
    }
  }
  const keys = Object.keys(allGroups)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    res[key] = doc.buildFrom(allGroups[key])
  }
  return res
}

const getOneName = function (doc, name) {
  const arr = []
  for (let i = 0; i < doc.list.length; i++) {
    const phrase = doc.list[i]
    let keys = Object.keys(phrase.groups)
    keys = keys.filter(id => phrase.groups[id].group === name)
    keys.forEach(id => {
      arr.push(phrase.buildFrom(phrase.groups[id].start, phrase.groups[id].length))
    })
  }
  return doc.buildFrom(arr)
}

/** grab named capture group results */
exports.groups = function (target) {
  if (target === undefined) {
    return getGroups(this)
  }
  if (typeof target === 'number') {
    target = String(target)
  }
  return getOneName(this, target) || this.buildFrom([])
}
exports.group = exports.groups

/** get the full-sentence each phrase belongs to */
exports.sentences = function (n) {
  let arr = []
  this.list.forEach(p => {
    arr.push(p.fullSentence())
  })
  if (typeof n === 'number') {
    return this.buildFrom([arr[n]])
  }
  return this.buildFrom(arr)
}
exports.sentence = exports.sentences
