const rules = {
  '#Val': [
    // [five] pm
    '_ (am|pm) -> #Time',
  ],
  '#QW': [
    // [when] stolen
    '_ #VBN -> #Prep',
  ],
  '#Adv': [
    // is [well]
    '#Cop _ $ -> #Adj',
  ],
  '#Pers': [
    // bought a [warhol]
    '(a|an) _ $ -> !#Pers',
  ],
  '#Prop': [
    // in [#ProperNoun] -> #Place
    // in [Foo] California
    'in _ -> #Place',
  ],
  '#Past': [
    // well [made]
    'well _ -> #Adj',
    '(over|under) _ -> #Adj',
  ],
  '#Ger': [
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
  '#Adj': [
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
  '#VBN': [
    // a [blown] motor
    '(the|those|these|a|an) _ #NN -> #Adj',
  ],
  '#V': [
    // the [manufacture] of perfume
    '(a|an|the) _ of -> #NN',
    // became [embroiled]
    '(become|became|becoming|becomes) _ -> #Adj',
  ],
  '#Sing': [
    // the [staff] were
    '(the|these) _ (were|are) -> #Plur',
    // the [repairer] said
    '#Det _ said -> #Actor',
  ],
  '#Inf': [
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
  '#Pres': [
    // taught [thank]-you etiquette
    '(taught|teaches|learns|learned) _ -> #NN',
    // some [thanks] for helping
    '(many|any|some|several) _ for -> #NN',
    // whose [thanks] are appreciated
    'whose _ #Cop -> #NN',
  ],
  '#Abbr': [
    // 500 fifth [ave]
    '#Value _ -> #Unit',
  ],
  '#First': [
    // john [stewart]
    '#First _ -> #Last',
  ],
  '#Card': [
    //  5 June
    '_ #Month -> #Date',
  ],
}

export default rules
