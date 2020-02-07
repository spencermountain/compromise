const places = '(paris|alexandria|houston|kobe|salvador|sydney)'
let list = [
  //West Norforlk
  {
    match: '(west|north|south|east|western|northern|southern|eastern)+ #Place',

    tag: 'Region',
    reason: 'west-norfolk',
  },
  // addresses
  {
    match: '#Value #Noun (st|street|rd|road|crescent|cr|way|tr|terrace|avenue|ave)',
    tag: 'Address',
    reason: 'address-st',
  },
  //Foo District
  {
    match: '#ProperNoun+ (district|region|province|county|prefecture|municipality|territory|burough|reservation)',
    tag: 'Region',
    reason: 'foo-district',
  },
  //District of Foo
  {
    match: '(district|region|province|municipality|territory|burough|state) of #ProperNoun',
    tag: 'Region',
    reason: 'district-of-Foo',
  },
  // in houston
  { match: `in [${places}]`, group: 0, tag: 'Place', reason: 'in-paris' },
  { match: `near [${places}]`, group: 0, tag: 'Place', reason: 'near-paris' },
  { match: `at [${places}]`, group: 0, tag: 'Place', reason: 'at-paris' },
  { match: `from [${places}]`, group: 0, tag: 'Place', reason: 'from-paris' },
  { match: `to [${places}]`, group: 0, tag: 'Place', reason: 'to-paris' },
  { match: `#Place [${places}]`, group: 0, tag: 'Place', reason: 'tokyo-paris' },
  // houston texas
  { match: `[${places}] #Place`, group: 0, tag: 'Place', reason: 'paris-france' },
  //some us-state acronyms (exlude: al, in, la, mo, hi, me, md, ok..)
  {
    match: '#City [(al|ak|az|ar|ca|ct|dc|fl|ga|id|il|nv|nh|nj|ny|oh|or|pa|sc|tn|tx|ut|vt|pr)]',
    group: 0,
    tag: 'Region',
    reason: 'us-state',
  },
]
module.exports = list
