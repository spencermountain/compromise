// Match a compound's left component, including its silent e.
// Both vowel counting and boundary placement use these same spelling rules.
const compoundPrefixes = [
  /^side(?=kick|line|show|step|stream|track|walk|water|way|winder|wise)/,
  /^some(?=bod|one|time|where)/,
  /^above(?=board|ground)/,
  /^a?fore(?=clos|taste|said|mentioned)/,
  /^ware(?=house|housing)/,
  /^space(?=port|ship)/,
  /^race(?=horse)/,
  /^lake(?=side)/,
  /^white(?=side)/,
  /^state(?=side)/,
  /^juke(?=box)/,
  /^police(?=woman|women|man|men)/,
  /^(?:sale|spoke)s?(?=woman|women|man|men)/,
]

export default compoundPrefixes
