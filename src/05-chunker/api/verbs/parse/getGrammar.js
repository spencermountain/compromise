import forms from './forms.js'

const cleanUp = function (vb, res) {
  vb = vb.clone()
  // remove negatives
  if (vb.has('not')) {
    vb = vb.remove('not')
  }
  // remove adverbs
  if (res.adverbs.pre && res.adverbs.pre.found) {
    vb.remove(res.adverbs.pre)
  }
  if (res.adverbs.post && res.adverbs.post.found) {
    vb.remove(res.adverbs.post)
  }
  // cut-off phrasal-verb
  if (res.root.has('#PhrasalVerb #Particle')) {
    vb.remove('#Particle$')
  }
  return vb
}

const getGrammar = function (vb, res) {
  let grammar = {}
  // make it easy to classify, first
  vb = cleanUp(vb, res)
  for (let i = 0; i < forms.length; i += 1) {
    let todo = forms[i]
    if (vb.has(todo.match) === true) {
      grammar.form = todo.name
      Object.assign(grammar, todo.data)
      break //only match one
    }
  }
  // fallback to 'naiive' tense detection
  if (!grammar.tense) {
    grammar.tense = res.root.has('#PastTense') ? 'PastTense' : 'PresentTense'
  }
  grammar.copula = res.root.has('#Copula')
  return grammar
}

export default getGrammar
