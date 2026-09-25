export default [
  // ==== Ambiguous numbers ====
  // 'second'
  { match: `#Cardinal [second]`, hook: 'second', tag: 'Unit', reason: 'one-second' },
  //'a/an' can mean 1 - "a hour"
  // {
  //   match: '!once? [(a|an)] #Duration', hook: '#Duration',
  //   group: 0,
  //   tag: 'Value',
  //   reason: 'a-is-one',
  // },
  {
    match: '!once? [(a|an)] hundred', hook: 'hundred',
    group: 0,
    tag: 'Value',
    reason: 'a-is-one',
  },
  {
    match: '!once? [(a|an)] thousand', hook: 'thousand',
    group: 0,
    tag: 'Value',
    reason: 'a-is-one',
  },
  {
    match: '!once? [(a|an)] million', hook: 'million',
    group: 0,
    tag: 'Value',
    reason: 'a-is-one',
  },
  {
    match: '!once? [(a|an)] billion', hook: 'billion',
    group: 0,
    tag: 'Value',
    reason: 'a-is-one',
  },
  {
    match: '!once? [(a|an)] trillion', hook: 'trillion',
    group: 0,
    tag: 'Value',
    reason: 'a-is-one',
  },
  // ==== PhoneNumber ====
  //1 800 ...
  { match: '(1|+1) #Value #PhoneNumber', hook: '#PhoneNumber', tag: 'PhoneNumber', reason: '1-800-Value' },
  //(454) 232-9873
  { match: '#NumericValue #PhoneNumber', hook: '#PhoneNumber', tag: 'PhoneNumber', reason: '(800) PhoneNumber' },

  // ==== Currency ====
  // chinese yuan
  { match: '#Demonym #Currency', hook: '#Currency', tag: 'Currency', reason: 'demonym-currency' },
  // ten bucks
  { match: '#Value [(buck|bucks|grand)]', hook: '#Value', group: 0, tag: 'Currency', reason: 'value-bucks' },
  // ==== Money ====
  { match: '[#Value+] #Currency', hook: '#Currency', group: 0, tag: 'Money', reason: '15 usd' },

  // ==== Ordinal ====
  { match: '[second] #Noun', hook: 'second', group: 0, tag: 'Ordinal', reason: 'second-noun' },

  // ==== Units ====
  //5 yan
  { match: '#Value+ [#Currency]', hook: '#Currency', group: 0, tag: 'Unit', reason: '5-yan' },
  { match: '#Value [(foot|feet)]', hook: '#Value', group: 0, tag: 'Unit', reason: 'foot-unit' },
  //5 kg.
  { match: '#Value [#Abbreviation]', hook: '#Abbreviation', group: 0, tag: 'Unit', reason: 'value-abbr' },
  { match: '#Value [k]', hook: 'k', group: 0, tag: 'Unit', reason: 'value-k' },
  { match: '#Unit an hour', hook: 'hour', tag: 'Unit', reason: 'unit-an-hour' },

  // ==== Magnitudes ====
  //minus 7
  { match: '(minus|negative) #Value', hook: '#Value', tag: 'Value', reason: 'minus-value' },
  //seven point five
  { match: '#Value (point|decimal) #Value', hook: '#Value', tag: 'Value', reason: 'value-point-value' },
  //quarter million
  { match: '#Determiner [(half|quarter)] #Ordinal', hook: '#Ordinal', group: 0, tag: 'Value', reason: 'half-ordinal' },
  // thousand and two
  { match: `#Multiple+ and #Value`, hook: 'and', tag: 'Value', reason: 'magnitude-and-value' },
  // 5 miles per hour
  { match: '#Value #Unit [(per|an) (hr|hour|sec|second|min|minute)]', hook: '#Unit', group: 0, tag: 'Unit', reason: '12-miles-per-second' },
  // 5 square miles
  { match: '#Value [(square|cubic)] #Unit', hook: '#Unit', group: 0, tag: 'Unit', reason: 'square-miles' },
  //twelve percent
  { match: '#Cardinal percent', hook: 'percent', tag: '#Percent #Unit', reason: 'value-percent' },
  // ambiguous units
  { match: '#Value [(gb|pa|ft|foot|feet|m)]', hook: '#Value', group: 0, tag: 'Unit', reason: 'ambiguous-unit' },
]
