const toInfinitive = function (parsed, methods, model) {
  const { verbToInfinitive } = methods.two.transform
  let root = parsed.root
  // calculate from-tense
  let fromTense = root.has('#PastTense') ? 'PastTense' : 'PresentTense'
  if (root.has('#Gerund')) {
    fromTense = 'Gerund'
  }
  // let vb = root
  // if(
  // pull-apart phrasal
  let particle = root.match('#Particle$')
  let str = root.not(particle).text('normal')
  let inf = verbToInfinitive(str, model, fromTense)
  if (particle.found) {
    inf += ' ' + particle.text('normal')
  }
  return inf
}
export { toInfinitive }
