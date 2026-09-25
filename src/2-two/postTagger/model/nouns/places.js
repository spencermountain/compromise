export default [
  // ==== Region ====
  // west Toronto
  { match: '(west|north|south|east|western|northern|southern|eastern)+ #Place', hook: '#Place', tag: 'Region', reason: 'west-norfolk' },
  //some us-state acronyms (exlude: al, in, la, mo, hi, me, md, ok..)
  // Toronto [ca]
  {
    match: '#City [(al|ak|az|ar|ca|ct|dc|fl|ga|id|il|nv|nh|nj|ny|oh|pa|sc|tn|tx|ut|vt|pr)]', hook: '#City',
    group: 0,
    tag: 'Region',
    reason: 'us-state',
  },
  // Portland [OR]
  { match: 'portland [(or && @isUpperCase)]', hook: 'portland', group: 0, tag: 'Region', reason: 'portland-or' },
  // i ate [turkey]
  { match: '(eat|ate|eating|roast|roasted|thanksgiving) [turkey]', hook: 'turkey', group: 0, unTag: 'Place', tag: 'Uncountable', reason: 'food-turkey' },
  // with [turkey]
  { match: 'with [(turkey && !@isTitleCase)]', hook: 'turkey', group: 0, unTag: 'Place', tag: 'Uncountable', reason: 'with-turkey-food' },
  // [turkey] dinner
  { match: '[turkey] (roast|dinner|sandwich|burger)', hook: 'turkey', group: 0, unTag: 'Place', tag: 'Uncountable', reason: 'turkey-food' },
  // ankara [turkey]
  { match: '#Place [turkey]', hook: 'turkey', group: 0, tag: 'Country', reason: 'ankara-turkey' },
  // in [turkey]
  { match: '(in|near|nearby|to|from) [turkey]', hook: 'turkey', group: 0, tag: 'Country', reason: 'near-turkey' },
  // Toronto point
  {
    match: '#ProperNoun+ (cliff|place|range|pit|place|point|room|grounds|ruins)', hook: '#ProperNoun',
    tag: 'Place',
    reason: 'foo-point',
  },
  // in [Foo] California
  { match: 'in [#ProperNoun] #Place', hook: 'in', group: 0, tag: 'Place', reason: 'propernoun-place' },
  // 123 main street
  {
    match: '#Value #Noun+ (st|street|rd|road|crescent|cr|way|tr|terrace|avenue|ave|lane|boulevard|blvd|drive|dr|parkway|way)', hook: '#Value',
    tag: 'Address',
    reason: 'address-st',
  },
  // port dover
  { match: '(port|mount|mt) #ProperNoun', hook: '#ProperNoun', tag: 'Place', reason: 'port-name' },

]
