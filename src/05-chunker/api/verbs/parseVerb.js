import matches from './classify.js'

const getWords = function (m) {
  return m.json({ normal: true }).map(s => s.normal)
}

const getMain = function (m) {
  let main = m.match('#Verb+')
  if (main.wordCount() > 1) {
    // main = main.not('(#Adverb|#Negative|#Auxiliary|#Particle)')
    main = main.match('!#Negative')
    main = main.match('!#Auxiliary')
    main = main.match('!#Particle')
  }
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
  aux = aux.match('!#Negative')
  aux = aux.match('!#Adverb')
  return aux
}

const parseVerb = function (view) {
  let res = view.json()[0]

  const main = getMain(view)
  const aux = getAux(view, main)
  let verb = {
    adverbs: getWords(view.match('#Adverb')),
    main: main.text('normal'),
    negative: view.has('not'),
    auxiliary: getWords(aux),
    copula: main.has('#Copula'),
  }

  let props = {}
  matches.forEach(todo => {
    // if(
  })
  res.verb = verb
  return res
}
export default parseVerb
