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
exports.firstTerm = function() {
  return this.match('^.')
}
/** grab the last term for every match  */
exports.lastTerm = function() {
  return this.match('.$')
}

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

/** grab named capture group results */
exports.named = function(target) {
  let arr = []
  //'reduce' but faster
  for (let i = 0; i < this.list.length; i++) {
    let terms = this.list[i].named(target)

    if (terms.length > 0) {
      arr.push(this.list[i])
    }
  }
  return this.buildFrom(arr)
}

/* grab named capture group terms as object */
exports.groupByNames = function() {
  let res = {}

  const groups = {}
  for (let i = 0; i < this.list.length; i++) {
    const phrase = this.list[i]
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
    res[key] = this.buildFrom(groups[key])
  }

  return res
}
