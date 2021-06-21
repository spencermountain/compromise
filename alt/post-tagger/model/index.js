module.exports = {
  patterns: [
    { match: 'foo #Person', group: 0, tag: 'Nope' },
    { match: '#Person [#PastTense]', group: 0, tag: 'PresentTense' },
  ],
}
