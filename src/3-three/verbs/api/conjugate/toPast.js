import convertAuxiliary from './auxiliary.js'
import { noop, getTense, wasWere, noWill } from '../lib.js'
const keep = { tags: true }

const fns = {

  noAux: (vb, parsed) => {
    if (parsed.auxiliary.found) {
      vb = vb.remove(parsed.auxiliary)
    }
    return vb
  },

  // walk->walked
  simple: (vb, parsed) => {
    const { conjugate, toInfinitive } = vb.methods.two.transform.verb
    const root = parsed.root
    // 'i may'
    if (root.has('#Modal')) {
      return vb
    }
    let str = root.text({ keepPunct: false })
    str = toInfinitive(str, vb.model, getTense(root))
    const all = conjugate(str, vb.model)
    // 'driven' || 'drove'
    str = all.PastTense
    // all.Participle || all.PastTense
    // but skip the 'is' participle..
    str = str === 'been' ? 'was' : str
    if (str === 'was') {
      str = wasWere(vb, parsed)
    }
    if (str) {
      vb.replace(root, str, keep)
    }
    return vb
  },

  both: function (vb, parsed) {
    if (parsed.root.has('be')) {
      vb.replace('will', wasWere(vb, parsed))
      return vb.remove('be')
    }
    // 'he did not walk'
    if (parsed.negative.found) {
      vb.replace('will', 'did')
      return vb
    }
    // 'he walked'
    vb = fns.simple(vb, parsed)
    vb = fns.noAux(vb, parsed)
    return vb
  },

  // some verbs have this weird past-tense form
  // drive -> driven, (!drove)
  hasParticiple: (vb, parsed) => {
    const { conjugate, toInfinitive } = vb.methods.two.transform.verb
    const root = parsed.root
    let str = root.text('normal')
    str = toInfinitive(str, vb.model, getTense(root))
    return conjugate(str, vb.model).Participle
  },



}


const forms = {

  // walk -> walked
  'infinitive': fns.simple,

  // he walks -> he walked
  'simple-present': fns.simple,

  // he walked
  'simple-past': noop,

  // he will walk -> he walked
  'simple-future': fns.both,

  // he is walking
  'present-progressive': vb => {
    vb.replace('are', 'were', keep)
    vb.replace('(is|are|am)', 'was', keep)
    return vb
  },

  // he was walking
  'past-progressive': noop,

  // he will be walking
  'future-progressive': (vb, parsed) => {
    vb.replace('will', wasWere(vb, parsed), keep)
    vb.remove('be')
    return vb
  },

  // would be walked -> 'would have been walked'
  'present-conditional': vb => {
    vb.replace('be', 'have been')
    return vb
  },

  // would have been walked
  'past-conditional': noop,

  // is going to drink -> was going to drink
  'auxiliary-future': (vb, parsed) => {
    vb.replace('(is|are|am)', wasWere(vb, parsed), keep)
    return vb
  },

  // used to walk
  'auxiliary-past': noop,

  // we do walk -> we did walk
  'auxiliary-present': vb => {
    vb.replace('(do|does)', 'did', keep)
    return vb
  },

  // must walk -> 'must have walked'
  'modal-infinitive': (vb, parsed) => {
    // this modal has a clear tense
    if (vb.has('can')) {
      // can drive -> could drive
      vb.replace('can', 'could', keep)
    } else {
      // otherwise, 
      //  walk -> have walked
      //  drive -> have driven
      const { conjugate, toInfinitive } = vb.methods.two.transform.verb
      const root = toInfinitive(parsed.root.text('normal'), vb.model, getTense(parsed.root))
      const conjugations = conjugate(root, vb.model)
      vb.match(parsed.root).replaceWith('have ' + (conjugations.Participle || conjugations.PastTense))
      vb.match('have').tag('Auxiliary')
    }
    return vb
  },

  // must have walked
  'modal-past': noop,

  // wanted to walk
  'want-infinitive': vb => {
    vb.replace('(want|wants)', 'wanted', keep)
    vb.remove('will')
    return vb
  },

  // started looking
  'gerund-phrase': (vb, parsed) => {
    parsed.root = parsed.root.not('#Gerund$')
    fns.simple(vb, parsed)
    noWill(vb)
    return vb
  },
}

const toPast = function (vb, parsed, form) {
  const converted = convertAuxiliary(vb, parsed, form, 'past')
  if (converted) return converted
  // console.log(form)
  if (forms.hasOwnProperty(form)) {
    vb = forms[form](vb, parsed)
    vb.fullSentence().compute(['tagger', 'chunks'])
    return vb
  }
  // do nothing i guess?
  return vb
}
export default toPast
