import methods from '../../methods/index.js'
import expandIrregulars from './irregulars.js'
import expandModels from './models.js'
import conjugate from '../../methods/transform/verbs/conjugate/index.js'
import models from '../models/index.js'
let tmpModel = {
  two: { models }
}

// defaults for switches
const variables = {
  // 'amusing'
  'Adj|Gerund': 'Adjective',
  // 'standard'
  'Adj|Noun': 'Adjective',
  // 'boiled'
  'Adj|Past': 'Adjective',
  // 'smooth'
  'Adj|Present': 'Adjective',//+conjugations
  // 'box'
  'Noun|Verb': 'Singular', //+conjugations
  //'singing'
  'Noun|Gerund': 'Gerund',
  // 'hope'
  'Person|Noun': 'Noun',
  // 'April'
  'Person|Date': 'Month',
  // 'rob'
  'Person|Verb': 'Person',
  // 'boxes'
  'Plural|Verb': 'Plural',
}

const expandLexicon = function (words, model) {
  // do clever tricks to grow the words
  const world = { model, methods }
  let { lex, _multi } = methods.two.expandLexicon(words, world)
  // store multiple-word terms in a cache
  Object.assign(model.one.lexicon, lex)
  Object.assign(model.one._multiCache, _multi)
  return model
}

// these words have no singular/plural conjugation
const addUncountables = function (words, model) {
  Object.keys(words).forEach(k => {
    if (words[k] === 'Uncountable') {
      model.two.uncountable[k] = true
      words[k] = 'Noun'
    }
  })
  return model
}

const expandVerb = function (str, words, doPresent) {
  let obj = conjugate(str, tmpModel)
  words[obj.PastTense] = words[obj.PastTense] || 'PastTense'
  words[obj.Gerund] = words[obj.Gerund] || 'Gerund'
  if (doPresent === true) {
    // is this plural noun, or present-tense?
    words[obj.PresentTense] = words[obj.PresentTense] || 'PresentTense'
  }
}

// harvest ambiguous words for any conjugations
const expandVariable = function (switchWords, model) {
  let words = {}
  //add first tag as an assumption for each variable word
  Object.keys(switchWords).forEach(w => {
    const name = switchWords[w]
    words[w] = variables[name]
    // conjugate some verbs
    if (name === 'Noun|Verb') {
      expandVerb(w, words, false)
    }
    if (name === 'Adj|Present') {
      expandVerb(w, words, true)
    }
  })
  // add conjugations
  model = expandLexicon(words, model)
  return model
}

const expand = function (model) {
  model = expandLexicon(model.one.lexicon, model)
  model = addUncountables(model.one.lexicon, model)
  model = expandVariable(model.two.variables, model)
  model = expandModels(model)
  model = expandIrregulars(model)
  return model
}
export default expand
