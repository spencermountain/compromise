const isQuestion = require('./isQuestion')

/** return sentences ending with '?' */
exports.isQuestion = function () {
  return this.filter((d) => isQuestion(d))
}
/** return sentences ending with '!' */
exports.isExclamation = function () {
  return this.filter((doc) => {
    let term = doc.lastTerm().termList(0)
    return term.hasPost('!')
  })
}
/** return sentences with neither a question or an exclamation */
exports.isStatement = function () {
  return this.filter((doc) => {
    let term = doc.lastTerm().termList(0)
    return !term.hasPost('?') && !term.hasPost('!')
  })
}

/** 'he is.' -> 'he is!' */
exports.toExclamation = function () {
  this.post('!')
  return this
}
/** 'he is.' -> 'he is?' */
exports.toQuestion = function () {
  this.post('?')
  return this
}
/** 'he is?' -> 'he is.' */
exports.toStatement = function () {
  this.post('.')
  return this
}
