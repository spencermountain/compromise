module.exports = [
  // ==== PhoneNumber ====
  //1 800 ...
  { match: '1 #Value #PhoneNumber', tag: 'PhoneNumber', reason: '1-800-Value' },
  //(454) 232-9873
  { match: '#NumericValue #PhoneNumber', tag: 'PhoneNumber', reason: '(800) PhoneNumber' },

  // ==== Currency ====
  { match: '#Demonym #Currency', tag: 'Currency', reason: 'demonym-currency' },
  // ==== Ordinal ====
  { match: '[second] #Noun', group: 0, tag: 'Ordinal', reason: 'second-noun' },
  // ==== Money ====
  { match: '#Value+ #Currency', tag: 'Money', reason: '15 usd' },
  // ==== Unit ====
  //5 yan
  { match: '#Value+ [#Currency]', group: 0, tag: 'Unit', reason: '5-yan' },
  { match: '#Value [(foot|feet)]', group: 0, tag: 'Unit', reason: 'foot-unit' },

  //minus 7
  { match: '(minus|negative) #Value', tag: 'Value', reason: 'minus-value' },
  //5 kg.
  { match: '#Value #Abbreviation', tag: 'Value', reason: 'value-abbr' },
  //seven point five
  { match: '#Value (point|decimal) #Value', tag: 'Value', reason: 'value-point-value' },
  // ten grand
  { match: '#Value grand', tag: 'Value', reason: 'value-grand' },
  //quarter million
  { match: '#Determiner [(half|quarter)] #Ordinal', group: 0, tag: 'Value', reason: 'half-ordinal' },
  { match: 'a #Value', tag: 'Value', reason: 'a-value' },

  // thousand and two
  {
    match: `(hundred|thousand|million|billion|trillion|quadrillion)+ and #Value`,
    tag: 'Value',
    reason: 'magnitude-and-value',
  },
  //'a/an' can mean 1 - "a hour"
  {
    match: '[(a|an)] (#Duration|hundred|thousand|million|billion|trillion)',
    group: 0,
    tag: 'Value',
    reason: 'a-is-one',
  },
]
