const rules = {
  '%Adj|Gerund%': [
    // [boring] the audience
    '_ #Det -> #Ger',
    // is [assuring] us; was [boggling] my mind
    '#Cop _ (#Pron|#Poss|#Reflexive) -> #Ger',
    // world's [leading] manufacturer
    '#Poss _ #NN -> #Adj',
  ],
  '%Adj|Noun%': [
    // her [favourite] sport
    '#Poss _ #NN -> #Adj',
    // a [representative] to
    '#Det _ #Conj -> #NN',
  ],
  '%Noun|Verb%': [
    // to [dream] of
    'to _ #Prep -> #Inf',
    // which [boost] it
    'which _ #NN -> #Inf',
    // Pronouns are nouns too; prefer the embedded object reading.
    // what [work] he did
    '(which|what|whose) _ #Pron -> #NN',
    // [visit] https://example.com
    '^ _ #Url -> #Imp',
    // [commit] to
    '^ _ to -> #Imp',
    //John and Mary [walk]
    // '#Pers _ $ -> #Inf',
  ],
  '%Plural|Verb%': [
    // what [walks] he took
    '(which|what|whose) _ #Pron -> #Plur',
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
