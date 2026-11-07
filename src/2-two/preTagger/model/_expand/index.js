import methods from '../../methods/index.js'
import expandIrregulars from './irregulars.js'
import toPlural from '../../methods/transform/nouns/toPlural/index.js'
import conjugate from '../../methods/transform/verbs/conjugate/index.js'
import { toSuperlative, toComparative } from '../../methods/transform/adjectives/inflect.js'
import toInfinitive from '../../methods/transform/verbs/toInfinitive/index.js'
import models from '../models/index.js'
import { Actor, Adj, Sing, Ger, NN, First, Pers, Plur, Uncountable, Past, Pres, Sup, Comp, Inf } from '../../tagSet/_lib.js'
const tmpModel = {
  one: { lexicon: {} },
  two: { models }
}

// defaults for switches
const switchDefaults = {
  // 'pilot'
  'Actor|Verb': Actor, //
  // 'amusing'
  'Adj|Gerund': Adj, //+conjugations
  // 'standard'
  'Adj|Noun': Adj,
  // 'boiled'
  'Adj|Past': Adj, //+conjugations
  // 'smooth'
  'Adj|Present': Adj,//+conjugations
  // 'box'
  'Noun|Verb': Sing, //+conjugations (no-present)
  //'singing'
  'Noun|Gerund': Ger, //+conjugations
  // 'hope'
  'Person|Noun': NN,
  // 'April'
  'Person|Date': 'Month',
  // 'rob'
  'Person|Verb': First,//+conjugations
  // 'victoria'
  'Person|Place': Pers,
  // 'rusty'
  'Person|Adj': 'Comparable',
  // 'boxes'
  'Plural|Verb': Plur, //(these are already derivative)
  // 'miles'
  'Unit|Noun': NN,
}

const expandLexicon = function (words, model) {
  // do clever tricks to grow the words
  const world = { model, methods }
  const { lex, _multi } = methods.two.expandLexicon(words, world)
  // store multiple-word terms in a cache
  Object.assign(model.one.lexicon, lex)
  Object.assign(model.one._multiCache, _multi)
  return model
}

// these words have no singular/plural conjugation
const addUncountables = function (words, model) {
  Object.keys(words).forEach(k => {
    if (words[k] === Uncountable) {
      model.two.uncountable[k] = true
      words[k] = Uncountable
    }
  })
  return model
}

const expandVerb = function (str, words, doPresent) {
  const obj = conjugate(str, tmpModel)
  words[obj.PastTense] ||= Past
  words[obj.Gerund] ||= Ger
  if (doPresent === true) {
    // is this plural noun, or present-tense?
    words[obj.PresentTense] ||= Pres
  }
}

const expandAdjective = function (str, words, model) {
  const sup = toSuperlative(str, model)
  words[sup] ||= Sup
  const comp = toComparative(str, model)
  words[comp] ||= Comp
}

// harvest ambiguous words for any conjugations
const expandVariable = function (switchWords, model) {
  const words = {}
  const actorPlurals = {}
  const lex = model.one.lexicon
  //add first tag as an assumption for each variable word
  Object.keys(switchWords).forEach(w => {
    const name = switchWords[w]
    words[w] = switchDefaults[name]
    // Plural actors keep their actor reading until a verb clue wins.
    if (name === 'Actor|Verb') {
      const plural = toPlural(w, model)
      if (switchWords[plural] === 'Plural|Verb') {
        actorPlurals[plural] = [Plur, Actor]
      }
    }
    // conjugate some verbs
    if (['Noun|Verb', 'Person|Verb', 'Actor|Verb'].includes(name)) {
      expandVerb(w, lex, false)
    }
    if (name === 'Adj|Present') {
      expandVerb(w, lex, true)
      expandAdjective(w, lex, model)
    }
    if (name === 'Person|Adj') {
      expandAdjective(w, lex, model)
    }
    // add infinitives for gerunds
    if (['Adj|Gerund', 'Noun|Gerund'].includes(name)) {
      const inf = toInfinitive(w, tmpModel, Ger)
      if (!lex[inf]) {
        words[inf] = Inf //expand it later
      }
    }
    // add plurals for nouns
    if (['Noun|Gerund', 'Adj|Noun', 'Person|Noun'].includes(name)) {
      lex[toPlural(w, model)] ||= Plur
    }
    if (name === 'Adj|Past') {
      const inf = toInfinitive(w, tmpModel, Past)
      // An unchanged guess is not evidence that an adjective is an infinitive.
      if (inf !== w && !lex[inf]) {
        words[inf] = Inf //expand it later
      }
    }
  })
  // add conjugations
  Object.assign(words, actorPlurals)
  model = expandLexicon(words, model)
  return model
}

const expand = function (model) {
  model = expandLexicon(model.one.lexicon, model)
  model = addUncountables(model.one.lexicon, model)
  model = expandVariable(model.two.switches, model)
  model = expandIrregulars(model)
  return model
}
export default expand
