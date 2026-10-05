const rules = {
  '%Adj|Gerund%': [
    // world's [leading] manufacturer
    '#Poss _ #NN -> #Adj',
  ],
  '%Adj|Noun%': [
    // a [representative] to
    '#Det _ #Conj -> #NN',
  ],
  '%Noun|Verb%': [
    // which [boost] it
    'which _ #NN -> #Inf',
    // [visit] https://example.com
    '^ _ #Url -> #Imp',
    // [commit] to
    '^ _ to -> #Imp',
    //John and Mary [walk]
    // '#Pers _ $ -> #Inf',
  ],
  '%Plural|Verb%': [
    // asking [questions]
    '#Ger _ -> #Plur',
    // and arms roiling around
    'and _ #Ger -> #Plur',
  ],
  '%Person|Verb%': [
    // [chuck] will ...
    '_ (will|had|has|said|says|told|did|learned|wants|wanted) -> #Pers',
  ],
  '%Person|Place%': [
    // [sydney] harbour
    '_ (harbor|harbour|pier|town|city|place|dump|landfill) -> #Place',
    // east [sydney]
    '(west|east|north|south) _ -> #Place',
  ],
  '%Adj|Present%': [
    // quickly [warm]
    '(slowly|quickly) _ -> #V',
  ],
}

export default rules
