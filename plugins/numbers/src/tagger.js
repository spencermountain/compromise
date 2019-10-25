const tagger = function(doc) {
  doc
    .match(
      '(hundred|thousand|million|billion|trillion|quadrillion|quintillion|sextillion|septillion)'
    )
    .tag('#Multiple')
}
module.exports = tagger
