//directory of files to pack with `node scripts/pack.js`
//they are stored in compressed form in ../_packed
module.exports = {
  adjectives: require('./adjectives'),
  adverbs: require('./adverbs'),
  airports: require('./airports'),
  cities: require('./cities'),
  countries: require('./countries'),
  demonyms: require('./demonyms'),
  expressions: require('./expressions'),
  female: require('./female'),
  firstnames: require('./firstnames'),
  holidays: require('./holidays'),
  lastnames: require('./lastnames'),
  male: require('./male'),
  organizations: require('./organizations'),
  prepositions: require('./prepositions'),
  professions: require('./professions'),
  sportsTeams: require('./sportsTeams'),
  //utils
  uncountables: require('./uncountables'),
  orgWords: require('./orgWords'),
  phrasals: require('./phrasals'),
};
