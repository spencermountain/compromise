import methods from '../../methods/index.js'
import expandIrregulars from './irregulars.js'
import toPlural from '../../methods/transform/nouns/toPlural/index.js'
import conjugate from '../../methods/transform/verbs/conjugate/index.js'
import { toSuperlative, toComparative } from '../../methods/transform/adjectives/inflect.js'
import toInfinitive from '../../methods/transform/verbs/toInfinitive/index.js'
import models from '../models/index.js'
import { Actor, Adj, Sing, Ger, NN, First, Pers, Plur, Uncountable, Past, Pres, Sup, Comp, Inf, Month, ActorVerb, AdjGerund, AdjNoun, AdjPast, AdjPresent, NounVerb, NounGerund, PersonNoun, PersonVerb, PersonAdj, PluralVerb } from '../../tagSet/_lib.js'
const tmpModel = {
  one: { lexicon: {} },
  two: { models }
}

// defaults for switches
const switchDefaults = {
  // 'pilot'
  [ActorVerb]: Actor, //
  // 'amusing'
  [AdjGerund]: Adj, //+conjugations
  // 'standard'
  [AdjNoun]: Adj,
  // 'boiled'
  [AdjPast]: Adj, //+conjugations
  // 'smooth'
  [AdjPresent]: Adj,//+conjugations
  // 'box'
  [NounVerb]: Sing, //+conjugations (no-present)
  //'singing'
  [NounGerund]: Ger, //+conjugations
  // 'hope'
  [PersonNoun]: NN,
  // 'April'
  'Person|Date': Month,
  // 'rob'
  [PersonVerb]: First,//+conjugations
  // 'victoria'
  'Person|Place': Pers,
  // 'rusty'
  [PersonAdj]: 'Comparable',
  // 'boxes'
  [PluralVerb]: Plur, //(these are already derivative)
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
  if (doPresent) {
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
    if (name === ActorVerb) {
      const plural = toPlural(w, model)
      if (switchWords[plural] === PluralVerb) {
        actorPlurals[plural] = [Plur, Actor]
      }
    }
    // conjugate some verbs
    if ([NounVerb, PersonVerb, ActorVerb].includes(name)) {
      expandVerb(w, lex, false)
    }
    if (name === AdjPresent) {
      expandVerb(w, lex, true)
      expandAdjective(w, lex, model)
    }
    if (name === PersonAdj) {
      expandAdjective(w, lex, model)
    }
    // add infinitives for gerunds
    if ([AdjGerund, NounGerund].includes(name)) {
      const inf = toInfinitive(w, tmpModel, Ger)
      if (!lex[inf]) {
        words[inf] = Inf //expand it later
      }
    }
    // add plurals for nouns
    if ([NounGerund, AdjNoun, PersonNoun].includes(name)) {
      lex[toPlural(w, model)] ||= Plur
    }
    if (name === AdjPast) {
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
