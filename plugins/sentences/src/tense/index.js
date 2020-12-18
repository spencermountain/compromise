const parse = require('../parse')

// 'i could drive' -> 'i could have driven'
const useParticiple = function (vb) {
  if (vb.has('(could|should|would|may|can|must)')) {
    return true
  }
  return false
}

/** he walks -> he walked */
exports.toPastTense = function () {
  this.forEach((doc) => {
    if (doc.has('#PastTense')) {
      return
    }
    let obj = parse(doc)
    let vb = obj.verb.clone()
    // support 'he could drive' -> 'he could have driven'
    if (useParticiple(vb)) {
      vb = vb.verbs().toParticiple()
      obj.verb.replaceWith(vb, false)
    } else {
      //   //do a normal conjugation
      vb = vb.verbs().toPastTense()
      obj.verb.replaceWith(vb, false)
    }
    // // trailing gerund/future/present are okay, but 'walked and eats' is not
    if (obj.object && obj.object.found && obj.object.has('#PresentTense')) {
      let verbs = obj.object.verbs()
      verbs.if('#PresentTense').verbs().toPastTense()
    }
  })
  return this
}

/** he drives -> he has driven */
exports.toParticiple = function () {
  this.forEach((doc) => {
    if (doc.has('has #Participle')) {
      return
    }
    let obj = parse(doc)
    let vb = obj.verb.clone()
    vb = vb.verbs().toParticiple()
    obj.verb.replaceWith(vb, false)
    // trailing gerund/future/present are okay, but 'walked and eats' is not
    if (obj.object && obj.object.found && obj.object.has('#PresentTense')) {
      let verbs = obj.object.verbs()
      verbs.if('#PresentTense').verbs().toParticiple()
    }
  })
  return this
}

/** he walked -> he walks */
exports.toPresentTense = function () {
  this.forEach((doc) => {
    let obj = parse(doc)
    let isPlural = obj.verb.lookBehind('(i|we) (#Adverb|#Verb)?$').found
    let vb = obj.verb.clone()
    // 'i look', not 'i looks'
    if (isPlural) {
      //quick hack for copula verb - be/am
      if (vb.has('(is|was|am|be)')) {
        vb = vb.replace('will? (is|was|am|be)', 'am')
      } else {
        vb = vb.verbs().toInfinitive()
      }
    } else {
      //'he looks'
      vb = vb.verbs().toPresentTense()
    }
    obj.verb.replaceWith(vb, false)

    // future is okay, but 'walks and ate' -> 'walks and eats'
    if (obj.object && obj.object.found && obj.object.has('#PastTense')) {
      let verbs = obj.object.verbs()
      verbs.if('#PastTense').verbs().toPresentTense()
    }
  })
  return this
}

/**he walked -> he will walk */
exports.toFutureTense = function () {
  this.forEach((doc) => {
    let obj = parse(doc)
    let vb = obj.verb.clone()
    vb = vb.verbs().toFutureTense()
    obj.verb.replaceWith(vb, false)
    //Present is okay, but 'will walk and ate' -> 'will walk and eat'
    if (obj.object && obj.object.found && obj.object.has('(#PastTense|#PresentTense)')) {
      let verbs = obj.object.verbs()
      verbs.if('(#PastTense|#PresentTense)').verbs().toInfinitive()
    }
  })
  return this
}

/** the main noun of the sentence */
exports.subjects = function () {
  return this.map((doc) => {
    let res = parse(doc)
    return res.subject
  })
}

/** return sentences that are in passive-voice */
exports.isPassive = function () {
  return this.if('was #Adverb? #PastTense #Adverb? by') //haha
}
