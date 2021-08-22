export default [
  // that should smoke
  { match: '#Determiner #Modal [#Noun]', group: 0, tag: 'PresentTense', reason: 'should-smoke' },
  //this rocks
  { match: '(this|that) [#Plural]', group: 0, tag: 'PresentTense', reason: 'this-verbs' },
  //let him glue
  {
    match: '(let|make|made) (him|her|it|#Person|#Place|#Organization)+ [#Singular] (a|an|the|it)',
    group: 0,
    tag: 'Infinitive',
    reason: 'let-him-glue',
  },
]
