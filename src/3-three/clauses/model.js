// english clause-rules - other languages supply their own model.three.clauses
export default {
  // a comma, but not a clause break
  notClause: [
    '@hasComma (and|or) .', //cool, and fun
    // '@hasComma (too|also)$', //at end of sentence
  ],
  // split a clause after these
  splitAfter: [
    // i said
    '^#Pron (said|says)',
  ],
  // split a clause before these
  splitBefore: [
    // ... said John.
    '(said|says) #Prop$',
    // ... if it was
    '. . if .{4}',
    // various conjunctions
    'and while',
    'now that',
    'ever since',
    '(supposing|although)',
    'even (while|if|though)',
    '(whereas|whose)',
    // 'as (far|long|much|soon) as',
    'as (though|if)',
    '(til|until)',
  ],
  // split a clause before the [captured] word
  splitBeforeGroup: [
    // it is cool but it is ..
    '#Verb .* [but] .* #Verb',
    // if it is this then that
    'if .{2,9} [then] .',
  ],
}
