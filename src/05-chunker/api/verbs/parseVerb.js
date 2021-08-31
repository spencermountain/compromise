import forms from './classify.js'

const getMain = function (m) {
  let main = m.match('#Verb+')
  if (main.wordCount() > 1) {
    // main = main.not('(#Adverb|#Negative|#Auxiliary|#Particle)')
    main = main.match('!#Negative')
    main = main.match('!#Auxiliary')
    main = main.match('!#Modal')
    // main = main.match('!#Particle')
  }
  // just get the last one
  if (main.length > 1) {
    main = main.last()
  }
  if (main.wordCount() > 1) {
    // main = main.match('#Copula [#Verb+]', 0)
    // main.debug()
    // main = main.match('.$')
  }
  if (!main.found) {
    return m
  }
  return main
}

const classify = function (verb) {
  for (let i = 0; i < forms.length; i += 1) {
    let todo = forms[i]
    if (verb.has(todo.match) === true) {
      return todo
    }
  }
  return {}
}

const parseVerb = function (view) {
  const { methods, model } = view
  const { verbToInfinitive } = methods.two.transform
  let vb = view.clone()
  vb.contractions().expand()
  const not = vb.match('not') //only this word, for now
  const adverbs = view.match('#Adverb')
  const phrasal = view.match('#PhrasalVerb')
  vb = vb.remove(not)
  vb = vb.remove(adverbs)
  const form = classify(vb)
  const main = getMain(vb)
  const aux = vb.not(main).not(phrasal)

  let verb = {
    adverbs: adverbs,
    main: main,
    negative: not,
    auxiliary: aux,
    copula: main.match('#Copula'),
    phrasal: phrasal,
    form: Object.assign({}, form),
  }
  let fromTense = main.has('#PastTense') ? 'PastTense' : 'PresentTense'
  if (!verb.tense) {
    verb.tense = fromTense
  }
  let str = main.text('normal') //use 'machine'?
  verb.infinitive = verbToInfinitive(str, model, fromTense)
  return verb
}
export default parseVerb
