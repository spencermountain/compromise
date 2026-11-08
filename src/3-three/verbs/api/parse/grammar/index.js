import forms, { InfForm } from './forms.js'
import { Pres } from '../../../../../2-two/preTagger/tagSet/_lib.js'

const cleanUp = function (vb, res) {
  vb = vb.clone()
  // remove adverbs
  if (res.adverbs.post && res.adverbs.post.found) {
    vb.remove(res.adverbs.post)
  }
  if (res.adverbs.pre && res.adverbs.pre.found) {
    vb.remove(res.adverbs.pre)
  }
  // remove negatives
  if (vb.has('#Neg')) {
    vb = vb.remove('#Neg')
  }
  // remove prefixes like 'anti'
  if (vb.has('#Prefix')) {
    vb = vb.remove('#Prefix')
  }
  // cut-off phrasal-verb
  if (res.root.has('#PhrV #Particle')) {
    vb.remove('#Particle$')
  }
  // did we miss any of these?
  // vb = vb.remove('#Adverb')
  vb = vb.not('#Adv')
  return vb
}

// 'learned [to code]'
const isInfinitive = function (vb) {
  // Auxiliary tagging can remove Infinitive from 'have' or 'be'. The leading
  // 'to' still governs the whole complement, including intervening modifiers.
  return vb.growLeft('to (#Adv|#Neg)+?').has('^to (#Adv|#Neg)+? #Verb')
}

const getGrammar = function (vb, res) {
  const grammar = {}
  const infinitive = isInfinitive(vb)
  // make it easy to classify, first
  vb = cleanUp(vb, res)
  for (let i = 0; i < forms.length; i += 1) {
    const todo = forms[i]
    if (vb.has(todo.match)) {
      grammar.form = todo.name
      Object.assign(grammar, todo.data)
      break //only match one
    }
  }
  // did we find nothing?
  if (!grammar.form) {
    if (vb.has('^#Verb$')) {
      grammar.form = InfForm
    }
  }
  // fallback to 'naiive' tense detection
  if (!grammar.tense) {
    grammar.tense = res.root.has('#Past') ? 'PastTense' : Pres
  }
  grammar.copula = res.root.has('#Cop')
  // 'learn to code'
  grammar.isInfinitive = infinitive
  return grammar
}

export default getGrammar
