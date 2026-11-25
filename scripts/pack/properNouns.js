import { pack } from 'efrt'
import properNouns from '../../data/lexicon/nouns/properNouns.js'
import organizations from '../../data/lexicon/nouns/organizations.js'
import femaleNames from '../../data/lexicon/people/femaleNames.js'
import firstnames from '../../data/lexicon/people/firstnames.js'
import lastnames from '../../data/lexicon/people/lastnames.js'
import maleNames from '../../data/lexicon/people/maleNames.js'
import people from '../../data/lexicon/people/people.js'
import cities from '../../data/lexicon/places/cities.js'
import places from '../../data/lexicon/places/places.js'
import regions from '../../data/lexicon/places/regions.js'

// names that are spelled the same in most languages
// - countries and honorifics are translated, so are left out
const lists = {
  ProperNoun: properNouns,
  Organization: organizations,
  City: cities,
  Place: places,
  Region: regions,
  FemaleName: femaleNames,
  FirstName: firstnames,
  LastName: lastnames,
  MaleName: maleNames,
  Person: people,
}

// whole efrt strings, so any efrt unpack() can read them
const packProperNouns = () => {
  // one tag per word - a later list wins, like in the english lexicon
  const byWord = {}
  Object.keys(lists).forEach(tag => {
    lists[tag].forEach(word => {
      byWord[word] = tag
    })
  })
  const result = {}
  Object.keys(lists).forEach(tag => {
    result[tag] = pack(lists[tag].filter(word => byWord[word] === tag))
  })
  return result
}

export default packProperNouns
