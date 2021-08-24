import forms from './classify.js'

const getMain = function (m) {
  let main = m.match('#Verb+')
  if (main.wordCount() > 1) {
    // main = main.not('(#Adverb|#Negative|#Auxiliary|#Particle)')
    main = main.match('!#Negative')
    main = main.match('!#Auxiliary')
    main = main.match('!#Particle')
  }
  // just get the last one
  if (main.wordCount() > 1) {
    main = main.match('.$')
  }
  if (!main.found) {
    return m
  }
  return main
}

const getAux = function (m, main) {
  let aux = m.not(main)
  return aux
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
  const not = vb.match('not') //only this word, for now
  const adverbs = view.match('#Adverb')
  const phrasal = view.match('#PhrasalVerb')
  vb.remove(not)
  vb.remove(adverbs)
  const form = classify(vb)
  const main = getMain(vb)
  // const aux = getAux(vb, main)
  const aux = vb.not(main)
  aux.debug()

  let verb = {
    adverbs: adverbs,
    main: main,
    negative: not,
    auxiliary: aux,
    copula: main.match('#Copula'),
    form: form.name,
    tense: form.tense,
    phrasal: phrasal,
  }
  let fromTense = main.has('#PastTense') ? 'PastTense' : 'PresentTense'
  verb.infinitive = verbToInfinitive(verb.main, model, fromTense)

  return verb
}
export default parseVerb
