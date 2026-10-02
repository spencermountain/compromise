export default [
  // ==== Region ====
  // west Toronto
  { match: '(west|north|south|east|western|northern|southern|eastern)+ #Place', tag: 'Region', reason: 'west-norfolk' },
  //some us-state acronyms (exlude: al, in, la, mo, hi, me, md, ok..)
  // Toronto [ca]
  {
    match: '#City [(al|ak|az|ar|ca|ct|dc|fl|ga|id|il|nv|nh|nj|ny|oh|pa|sc|tn|tx|ut|vt|pr)]',
    group: 0,
    tag: 'Region',
    reason: 'us-state',
  },
  // Portland [OR]
  { match: 'portland [(or && @isUpperCase)]', group: 0, tag: 'Region', reason: 'portland-or' },
  // with [turkey]
  { match: 'with [(turkey && !@isTitleCase)]', group: 0, unTag: 'Place', tag: 'Uncountable', reason: 'with-turkey' },
  // Toronto point
  {
    match: '#ProperNoun+ (cliff|place|range|pit|place|point|room|grounds|ruins)',
    tag: 'Place',
    reason: 'foo-point',
  },
  // 123 main street
  {
    match: '#Value #Noun+ (st|street|rd|road|crescent|cr|way|tr|terrace|avenue|ave|lane|boulevard|blvd|drive|dr|parkway|way)',
    tag: 'Address',
    reason: 'address-st',
  },
  // port dover
  { match: '(port|mount|mt) #ProperNoun', tag: 'Place', reason: 'port-name' },

]
