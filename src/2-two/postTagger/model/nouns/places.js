export default [
  // ==== Region ====
  //West Norforlk
  { match: '(west|north|south|east|western|northern|southern|eastern)+ #Place', tag: 'Region', reason: 'west-norfolk' },
  //some us-state acronyms (exlude: al, in, la, mo, hi, me, md, ok..)
  { match: '#City [(al|ak|az|ar|ca|ct|dc|fl|ga|id|il|nv|nh|nj|ny|oh|pa|sc|tn|tx|ut|vt|pr)]', group: 0, tag: 'Region', reason: 'us-state' },
  // portland oregon
  { match: 'portland [or]', group: 0, tag: 'Region', reason: 'portland-or' },
  //Foo District
  { match: '#ProperNoun+ (district|region|province|county|prefecture|municipality|territory|burough|reservation)', tag: 'Region', reason: 'foo-district' },
  //landforms - 'Foo river'
  { match: '#ProperNoun+ (river|lake|bay|inlet|creek|narrows|cove|dune|coast|lagoon|beach|peninsula|hill|mountain|canyon|marsh|island|trail|valley|glacier|estuary|desert|escarpment|gorge|plains|waterfall)', tag: 'Place', reason: 'foo-river' },
  //landforms - 'gulf of foo'
  { match: '(river|gulf|lake) of? #ProperNoun+', tag: 'Place', reason: 'river-foo' },
  //District of Foo
  { match: '(district|region|province|municipality|territory|burough|state) of #ProperNoun', tag: 'Region', reason: 'district-of-Foo' },
  // in Foo California
  { match: 'in [#ProperNoun] #Place', group: 0, tag: 'Place', reason: 'propernoun-place' },
  // Address 
  { match: '#Value #Noun (st|street|rd|road|crescent|cr|way|tr|terrace|avenue|ave)', tag: 'Address', reason: 'address-st' },
]
