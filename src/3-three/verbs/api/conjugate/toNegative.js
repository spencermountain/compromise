import { doDoes, getTense } from '../lib.js'
import { keepTags as keep } from '../../../_lib.js'
import { Imperative, WantInf, SimplePres, SimplePast, AuxPast, PassivePast, InfForm } from '../parse/grammar/forms.js'

// walked -> walk, using the tense of the whole phrase
const toInf = function (vb, parsed) {
  const { toInfinitive } = vb.methods.two.transform.verb
  const str = toInfinitive(parsed.root.text({ keepPunct: false }), vb.model, getTense(vb))
  if (str) {
    vb.replace(parsed.root, str)
  }
  return vb
}

// do/does not walk 
const doesNot = function (vb, parsed) {
  const does = doDoes(vb, parsed)
  vb.prepend(does + ' not')
  return vb
}

const isWas = function (vb) {
  // not be
  let m = vb.match('be')
  if (m.found) {
    m.prepend('not')
    return vb
  }
  // will not
  m = vb.match('(is|was|am|are|will|were)')
  if (m.found) {
    m.append('not')
    return vb
  }
  return vb
}

const hasCopula = (vb) => vb.has('(is|was|am|are|will|were|be)')

//vaguely, turn 'he is cool' into 'he is not cool'
const forms = {

  // he walks' -> 'he does not walk'
  [SimplePres]: (vb, parsed) => {
    // is/was
    if (hasCopula(vb)) {
      return isWas(vb)
    }
    // he walk
    vb = toInf(vb, parsed)
    // does not 
    vb = doesNot(vb, parsed)
    return vb
  },
  // 'he walked' -> 'he did not walk'
  [SimplePast]: (vb, parsed) => {
    // is/was
    if (hasCopula(vb)) {
      return isWas(vb)
    }
    // he walk
    vb = toInf(vb, parsed)
    // vb.debug()
    // did not walk
    vb.prepend('did not')
    return vb
  },

  // walk! -> 'do not walk'
  [Imperative]: (vb) => {
    vb.prepend('do not')
    return vb
  },
  // walk -> does not walk
  [InfForm]: (vb, parsed) => {
    if (hasCopula(vb)) {
      return isWas(vb)
    }
    return doesNot(vb, parsed)
  },

  [PassivePast]: (vb) => {
    // got walked -> did not get walked
    if (vb.has('got')) {
      vb.replace('got', 'get', keep)
      vb.prepend('did not')
      return vb
    }
    // was walked, were walked
    // was being walked
    // had been walked, have been eaten
    const m = vb.match('(was|were|had|have)')
    if (m.found) {
      m.append('not')
    }
    return vb
  },
  [AuxPast]: (vb) => {
    // used to walk
    if (vb.has('used')) {
      vb.prepend('did not')
      return vb
    }
    // he did walk
    const m = vb.match('(did|does|do)')
    if (m.found) {
      m.append('not')
    }
    return vb
  },

  // wants to walk
  [WantInf]: (vb, parsed) => {
    // does not 
    vb = doesNot(vb, parsed)
    // want
    vb = vb.replace('wants', 'want', keep)
    return vb
  },

}

const toNegative = function (vb, parsed, form) {
  // console.log(form)
  // The 'not' in 'not only' is tagged as an adverb.
  // 'to walk' is negated through the verb before it.
  if (vb.has('(#Neg|not)') || vb.lookBehind('#Verb .* to$').found) {
    return vb
  }
  if (Object.hasOwn(forms, form)) {
    vb = forms[form](vb, parsed)
    return vb
  }

  // 'not be'
  let m = vb.matchOne('be')
  if (m.found) {
    m.prepend('not')
    return vb
  }
  // is/was not
  if (hasCopula(vb)) {
    return isWas(vb)
  }

  // 'would not'
  m = vb.matchOne('(will|had|have|has|did|does|do|#Mod)')
  if (m.found) {
    m.append('not')
    return vb
  }
  // do nothing i guess?
  return vb
}
export default toNegative