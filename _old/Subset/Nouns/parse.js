// .nouns() supports some noun-phrase-ish groupings
// pull these apart, if necessary
const parse = function (doc) {
  let res = {
    main: doc,
  }
  //support 'mayor of chicago' as one noun-phrase
  if (doc.has('#Noun (of|by|for) .')) {
    let m = doc.splitAfter('[#Noun+]', 0)
    res.main = m.eq(0)
    res.post = m.eq(1)
  }
  return res
}
module.exports = parse
