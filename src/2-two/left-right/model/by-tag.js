const rules = {
  '#Person': [
    // bought a [warhol]
    '(a|an) _ $ -> !#Pers',
  ],
  '#ProperNoun': [
    // in [#ProperNoun] -> #Place
    // in [Foo] California
    'in _ -> #Place',
  ],
  '#PastTense': [
    // well [made]
    'well _ -> #Adj',
    '(over|under) _ -> #Adj',
  ],
  '#Gerund': [
    // as [entertaining] as
    'as _ as -> #Adj',
    // more [amusing] than
    'more _ than -> #Adj',
    // very [entertaining]
    '(so|very|extremely) _ -> #Adj',
    // the [failing] line
    '#Det _ #NN -> #Adj',
    // [walking] should be fun
    '_ #Mod -> #Activity',
    // i think tipping sucks
    '#Inf _ #Pres -> #Noun',
  ],
  '#Adjective': [
    // the [above] is clear
    // real [evil] is
    '(#Det|#Adj) _ #Cop -> #NN',
    // no [golden] would
    'no _ #Mod -> #NN',
    // a [minor] in
    'a _ #Prep -> #NN',
    // is [done] well
    '#Cop _ (well|badly|quickly|slowly) -> #V',
    // for the poor this
    'the _ #Det -> #NN',
  ],
  '#Participle': [
    // a [blown] motor
    '(the|those|these|a|an) _ #NN -> #Adj',
  ],
  '#Verb': [
    // the [manufacture] of perfume
    '(a|an|the) _ of -> #NN',
    // became [embroiled]
    '(become|became|becoming|becomes) _ -> #Adj',
  ],
  '#Singular': [
    // the [staff] were
    '(the|these) _ (were|are) -> #Plur',
    // the [repairer] said
    '#Det _ said -> #Actor',
  ],
  '#Infinitive': [
    // in [love]
    // about [thank]-you letters
    '(in|about) _ -> #Sing',
    // any [thank]-you letter
    // no [thank] you
    '(any|no) _ -> #NN',
    // as [fit] as
    'as _ as -> #Adj',
    // somebody [call]
    '^(somebody|everybody) _ -> #Imp',
    // never [say]
    '^never _ -> #Imp',
    // [continue] playing
    '^ _ #Ger -> #Imp',
    // much [thank]-you mail
    'much _ -> #NN',
  ],
  '#PresentTense': [
    // taught [thank]-you etiquette
    '(taught|teaches|learns|learned) _ -> #NN',
    // some [thanks] for helping
    '(many|any|some|several) _ for -> #NN',
    // whose [thanks] are appreciated
    'whose _ #Cop -> #NN',
  ],
  '#Abbreviation': [
    // 500 fifth [ave]
    '#Value _ -> #Unit',
  ],
  '#FirstName': [
    // john [stewart]
    '#First _ -> #Last',
  ],
  '#Cardinal': [
    //  5 June
    '_ #Month -> #Date',
  ],
}

export default rules
