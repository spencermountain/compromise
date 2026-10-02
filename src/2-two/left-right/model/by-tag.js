const rules = {
  '#ProperNoun': [
    // in [#ProperNoun] -> #Place
    // in [Foo] California
    'in _ -> #Place',
  ],
  '#PastTense': [
    // well [made]
    'well _ -> #Adjective',
  ],
  '#Gerund': [
    // as [entertaining] as
    'as _ as -> #Adjective',
    // more [amusing] than
    'more _ than -> #Adjective',
    // very [entertaining]
    '(so|very|extremely) _ -> #Adjective',
    // the [failing] line
    '#Determiner _ #Noun -> #Adjective',
    // [walking] should be fun
    '_ #Modal -> #Activity',
  ],
  '#Adjective': [
    // the [above] is clear
    // real [evil] is
    '(#Determiner|#Adjective) _ #Copula -> #Noun',
    // no [golden] would
    'no _ #Modal -> #Noun',
    // a [minor] in
    'a _ #Preposition -> #Noun',
    // is [done] well
    '#Copula _ (well|badly|quickly|slowly) -> #Verb',
  ],
  '#Participle': [
    // a [blown] motor
    '(the|those|these|a|an) _ #Noun -> #Adjective',
  ],
  '#Verb': [
    // the [manufacture] of perfume
    '(a|an|the) _ of -> #Noun',
    // became [embroiled]
    '(become|became|becoming|becomes) _ -> #Adjective',
  ],
  '#Singular': [
    // the [staff] were
    '(the|these) _ (were|are) -> #Plural',
    // the [repairer] said
    '#Determiner _ said -> #Actor',
  ],
  '#Infinitive': [
    // in [love]
    // about [thank]-you letters
    '(in|about) _ -> #Singular',
    // any [thank]-you letter
    // no [thank] you
    '(any|no) _ -> #Noun',
    // as [fit] as
    'as _ as -> #Adjective',
    // somebody [call]
    '^(somebody|everybody) _ -> #Imperative',
    // never [say]
    '^never _ -> #Imperative',
    // [continue] playing
    '^ _ #Gerund -> #Imperative',
  ],
  '#PresentTense': [
    // taught [thank]-you etiquette
    '(taught|teaches|learns|learned) _ -> #Noun',
    // some [thanks] for helping
    '(many|any|some|several) _ for -> #Noun',
    // whose [thanks] are appreciated
    'whose _ #Copula -> #Noun',
  ],
  '#Abbreviation': [
    // 500 fifth [ave]
    '#Value _ -> #Unit',
  ],
  '#FirstName': [
    // john [stewart]
    '#FirstName _ -> #LastName',
  ],
}

export default rules
