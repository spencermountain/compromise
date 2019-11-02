const tagger = function(doc) {
  doc
    .match(
      '(hundred|thousand|million|billion|trillion|quadrillion|quintillion|sextillion|septillion)'
    )
    .tag('#Multiple')
  //  in the 400s
  doc.match('the [/[0-9]+s$/]').tag('#Plural')
}
module.exports = tagger
