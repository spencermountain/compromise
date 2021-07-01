//directory of files to pack with `node scripts/pack.js`
//they are stored in compressed form
import lex from './misc.js'
import singulars from './nouns/singulars.js'
import professions from './nouns/professions.js'
import sportsTeams from './nouns/sportsTeams.js'
import uncountables from './nouns/uncountables.js'
import pronouns from './nouns/pronouns.js'
import organizations from './nouns/organizations.js'
import demonyms from './nouns/demonyms.js'
import possessives from './nouns/possessives.js'
import currencies from './misc/currencies.js'
import units from './numbers/units.js'
import countries from './places/countries.js'
import regions from './places/regions.js'
import places from './places/places.js'
import cities from './places/cities.js'
import weekdays from './dates/weekdays.js'
import months from './dates/months.js'
import dates from './dates/dates.js'
import firstnames from './people/firstnames.js'
import lastnames from './people/lastnames.js'
import maleNames from './people/maleNames.js'
import femaleNames from './people/femaleNames.js'
import honorifics from './people/honorifics.js'
import people from './people/people.js'
import infinitives from './verbs/infinitives.js'
import verbs from './verbs/verbs.js'
import phrasals from './verbs/phrasals.js'
import modals from './verbs/modals.js'
import adjectives from './adjectives/adjectives.js'
import comparables from './adjectives/comparables.js'
import ordinals from './numbers/ordinals.js'
import cardinals from './numbers/cardinals.js'
import adverbs from './misc/adverbs.js'
import expressions from './misc/expressions.js'
import prepositions from './misc/prepositions.js'
import determiners from './misc/determiners.js'
import conjunctions from './misc/conjunctions.js'
// import misc from './abbreviations/misc'
// import units from './abbreviations/units'
// import nouns from './abbreviations/nouns'
// import honorifics from './abbreviations/honorifics'
// import months from './abbreviations/months'
// import organizations from './abbreviations/organizations'
// import places from './abbreviations/places'
//add-in the generic, flat word-lists
const data = [
  [singulars, 'Singular'],
  [professions, 'Actor'],
  [sportsTeams, 'SportsTeam'],
  [uncountables, 'Uncountable'],
  [pronouns, 'Pronoun'],
  [organizations, 'Organization'],
  [demonyms, 'Demonym'],
  [possessives, 'Possessive'], //+pronoun?
  [currencies, 'Currency'],
  [units, 'Unit'],
  [countries, 'Country'],
  [regions, 'Region'],
  [places, 'Place'],
  [cities, 'City'],
  [weekdays, 'WeekDay'],
  [months, 'Month'],
  [dates, 'Date'],
  [firstnames, 'FirstName'],
  [lastnames, 'LastName'],
  [maleNames, 'MaleName'],
  [femaleNames, 'FemaleName'],
  [honorifics, 'Honorific'],
  [people, 'Person'],
  [infinitives, 'Infinitive'],
  [verbs, 'Verb'],
  [phrasals, 'PhrasalVerb'],
  [modals, 'Modal'],
  [adjectives, 'Adjective'],
  [comparables, 'Comparable'],
  [ordinals, 'Ordinal'],
  [cardinals, 'Cardinal'],
  // [misc, 'Abbreviation'],
  // [units, 'Unit'],
  // [nouns, 'Abbreviation|Noun'],
  // [honorifics, 'Abbreviation|Honorific'],
  // [months, 'Abbreviation|Month'],
  // [organizations, 'Abbreviation|Organization'],
  // [places, 'Abbreviation|Place'],
  [adverbs, 'Adverb'],
  [expressions, 'Expression'],
  [prepositions, 'Preposition'],
  [determiners, 'Determiner'],
  [conjunctions, 'Conjunction'],
]
for (let i = 0; i < data.length; i++) {
  const list = data[i][0]
  for (let o = 0; o < list.length; o++) {
    //log duplicates
    // if (lex[list[o]]) {
    //   console.log(list[o] + '  ' + lex[list[o]] + ' ' + data[i][1])
    // }
    lex[list[o]] = data[i][1]
  }
}

export default lex
// console.log(Object.keys(lex).length);
// console.log(lex['zero'])
