const parse = require('../parse')

/** he walks -> he walked */
exports.toPastTense = function() {
  this.forEach(doc => {
    let obj = parse(doc)
    let vb = obj.verb.clone()
    vb = vb.verbs().toPastTense()
    obj.verb.replaceWith(vb, false, true)
    // trailing gerund/future/present are okay, but 'walked and eats' is not
    if (obj.object && obj.object.found && obj.object.has('#PresentTense')) {
      let verbs = obj.object.verbs()
      verbs
        .if('#PresentTense')
        .verbs()
        .toPastTense()
    }
  })
  return this
}

/** he walked -> he walks */
exports.toPresentTense = function() {
  this.forEach(doc => {
    let obj = parse(doc)
    let isPlural = obj.verb.lookBehind('(i|we) (#Adverb|#Verb)?$').found
    let vb = obj.verb.clone()
    // 'i look', not 'i looks'
    if (isPlural) {
      vb = vb.verbs().toInfinitive()
    } else {
      //'he looks'
      vb = vb.verbs().toPresentTense()
    }
    obj.verb.replaceWith(vb, false, true)

    // future is okay, but 'walks and ate' -> 'walks and eats'
    if (obj.object && obj.object.found && obj.object.has('#PastTense')) {
      let verbs = obj.object.verbs()
      verbs
        .if('#PastTense')
        .verbs()
        .toPresentTense()
    }
  })
  return this
}

/**he walked -> he will walk */
exports.toFutureTense = function() {
  this.forEach(doc => {
    let obj = parse(doc)
    let vb = obj.verb.clone()
    vb = vb.verbs().toFutureTense()
    obj.verb.replaceWith(vb, false, true)
    //Present is okay, but 'will walk and ate' -> 'will walk and eat'
    if (obj.object && obj.object.found && obj.object.has('(#PastTense|#PresentTense)')) {
      let verbs = obj.object.verbs()
      verbs
        .if('(#PastTense|#PresentTense)')
        .verbs()
        .toInfinitive()
    }
  })
  return this
}

// toContinuous() {
//   return this
// }
