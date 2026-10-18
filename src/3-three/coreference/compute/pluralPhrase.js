import isPlural from '../../nouns/api/isPlural.js'

const pluralPhrase = phrase => {
  return isPlural(phrase, phrase) || phrase.has('#Noun and #Determiner? #Adjective+? #Noun')
}

export default pluralPhrase
