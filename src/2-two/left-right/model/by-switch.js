const rules = {
  '%Adj|Gerund%': [
    // world's [leading] manufacturer
    '#Possessive _ #Noun -> #Adjective',
  ],
  '%Adj|Noun%': [
    // a [representative] to
    '#Determiner _ #Conjunction -> #Noun',
  ],
  '%Noun|Verb%': [
    // which [boost] it
    'which _ #Noun -> #Infinitive',
    // [visit] https://example.com
    '^ _ #Url -> #Imperative',
    // [commit] to
    '^ _ to -> #Imperative',
  ],
  '%Plural|Verb%': [
    // asking [questions]
    '#Gerund _ -> #Plural',
  ],
  '%Person|Verb%': [
    // [chuck] will ...
    '_ (will|had|has|said|says|told|did|learned|wants|wanted) -> #Person',
  ],
  '%Person|Place%': [
    // [sydney] harbour
    '_ (harbor|harbour|pier|town|city|place|dump|landfill) -> #Place',
    // east [sydney]
    '(west|east|north|south) _ -> #Place',
  ],
  '%Adj|Present%': [
    // quickly [warm]
    '(slowly|quickly) _ -> #Verb',
  ],
}

export default rules
