import isPlural from '../../nouns/api/isPlural.js'

const pluralPhrase = phrase => {
  return isPlural(phrase, phrase) || phrase.has('#NN and #Det? #Adj+? #NN')
}

export default pluralPhrase
