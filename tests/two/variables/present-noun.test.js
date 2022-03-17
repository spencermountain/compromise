import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/present-noun] '

let arr = [
  // present-plural
  ['bakes', '#PresentTense'],
  ['fakes', '#PresentTense'],
  ['makes', '#PresentTense'],
  ['mistakes', '#PresentTense'],
  ['overtakes', '#PresentTense'],
  ['retakes', '#PresentTense'],
  ['forsakes', '#PresentTense'],
  ['shakes', '#PresentTense'],
  ['snakes', '#PresentTense'],
  ['takes', '#PresentTense'],
  ['undertakes', '#PresentTense'],

  [`i wish that`, 'i #Infinitive .'],
  [`that wish`, '. #Singular'],
  [`he changes`, `#Noun #PresentTense`],
  [`his changes`, `#Noun #Plural`],

  // noun-verb
  [`date the boy`, '#PresentTense #Determiner #Noun'],
  [`date of birth`, '#Noun #Preposition #Noun'],
  [`any flood`, '#Determiner #Noun'],
  [`will flood`, '. #PresentTense'],
  [`suddenly flood`, '. #PresentTense'],
  [`not flood`, '. #PresentTense'],
  [`we date`, '. #PresentTense'],
  [`you flood`, '. #PresentTense'],

  // infinitive-singular
  [`date spencer`, '#Verb .'],
  [`flash the`, '#Verb .'],
  [`flash his`, '#Verb .'],
  [`flash around`, '#Verb .'],
  [`flood you`, '#Verb .'],
  [`my flood`, '. #Noun'],
  [`one flood`, '. #Noun'],
  [`flash could`, '#Noun .'],
  [`flash is`, '#Noun .'],

  // the #Noun #Infinitive  ->Noun
  [`the planning [process]`, `the #Noun #Noun`],
  [`the printing press`, `the #Noun #Noun`],
  [`the tip line`, `the #Noun #Noun`],
  [`the defence budget`, `the #Noun #Noun`],
  [`the cross cook`, `the #Noun #Noun`],
  [`the security guard`, `the #Noun #Noun`],
  [`the intersection sign`, `the #Noun #Noun`],

  // the #Noun #Infinitive  ->Verb
  [`did the banana say`, `. the #Noun #Infinitive`],
  // [`did the skeleten show`, `. the #Noun #Infinitive`],
  [`does the king want`, `. the #Noun #Infinitive`],
  [`does the writer say`, `. the #Noun #Infinitive`],
  [`let the messiah go`, `. the #Noun #Infinitive`],
  [`the critics keep writing`, `the #Noun #Verb #Verb`],
  [`the critics be`, `the #Noun #Infinitive`],
  [`the captain put himself`, `the #Noun #Infinitive himself`],
  [`the parties dispute which`, `the #Noun #Infinitive which`],
  [`the Princess thought`, `the #Noun #PastTense`],
  [`the feet kick him`, `the #Noun #Infinitive him`],
  [`the midnight knock`, `the #Noun #Noun`],
  [`the universal process`, `the #Adjective #Singular`],
  [`the collective budget`, `the #Adjective #Singular`],
  [`the work stress`, `the #Noun #Singular`],
  [`the american touch`, `the #Demonym #Singular`],
  [`the road upgrade`, `the #Noun #Singular`],
  [`the city strain`, `the #Noun #Singular`],
  [`the software patch`, `the #Noun #Singular`],
  [`the toronto fire`, `the #Noun #Singular`],
  // [`The paving-stone`, `the #Noun #Singular`],
  // -> plurals
  [`the universal processes`, `the #Adjective #Plural`],
  [`the collective budgets`, `the #Adjective #Plural`],
  // [`the work stresses`, `the #Noun #Plural`],
  [`the american touches`, `the #Noun #Plural`],
  [`the road upgrades`, `the #Noun #Plural`],
  [`the city strains`, `the #Noun #Plural`],
  // [`the software patches`, `the #Noun #Plural`],
  // [`the toronto fires`, `the #Noun #Plural`],
  [`The paving-stones`, `the #Noun #Plural`],
  // [`cost of living`, `#PastTense #Preposition #Noun`],
  [`The similar TORRO scale ranges from`, 'the #Adjective #Noun #Noun #PresentTense from'],
  // [`New project crowdsources help for Toronto's homeless`, '#Adjective #Noun #PresentTense #Noun for #Possessive #Noun'],
  [`Bharti initiates talks`, '#Noun #PresentTense #Plural'],
  [`Grandma opens a present with a pair`, '#Noun #PresentTense a #Noun with a #Noun'],

  // [`a nice present`, 'a #Adjective #Noun'],//noun
  [`present the trophy`, '#Verb the #Noun'],//verb
  [`tony is present`, '#Person is #Adjective'],//adjective

  [`in every bite`, 'in #Determiner #Noun'],
  [`There was a prison break and I saw it`, 'there #Copula a #Noun #Noun and I #Verb it'],
  [`we gotta do, damage control.`, 'we got to do #Noun #Noun'],
  [`Go to the chicken farm and take the hatchet.`, '#Verb to the #Noun #Noun and #Verb the #Noun'],
  [`He split 2 1980 fights with Roberto Duran`, '#Pronoun #Verb #Value #Value #Plural with #Person #Person'],
  // [`what are those, fish hooks?`, 'what are . #Noun #Plural'],
  [`the sweet potato fries.`, '#Determiner sweet #Noun #Plural'],
  [`my friend's house.`, 'my #Noun #Noun'],
  [`major record labels.`, '#Adjective #Noun #Plural'],
  [`our mission of progress.`, '#Possessive #Noun of #Noun'],
  [`the .dat file`, 'the #Noun #Noun'],
  [`the 9pm show`, '#Determiner #Time #Noun'],
  [`continue as state chief`, '#Verb as #Noun #Noun'],
  [`no tones`, 'no #Plural'],
  [`& other types`, 'and other #Plural'],
  [`40 gallons of water a day`, '#Value #Plural of #Noun a #Noun'],

  ['3 trains', '#Value #Noun'],
  // ['help unmask the great slice', '#Verb #Verb the #Adjective #Noun'],
  ['help Dubai heal', '#Verb #Noun #Verb'],
  ['the euro sense', 'the #Noun #Noun'],
  ['the lights come on', 'the #Plural #Verb #Particle'],
  ['the letters concern', 'the #Plural #Verb'],
  ['the thriving village', '#Determiner #Adjective #Noun'],
  ['the roof got wet', 'the #Noun #Verb #Adjective'],
  ['the aging process', 'the #Noun #Noun'],
  ['the new start', 'the #Adjective #Noun'],
  ['this cabinet post', '#Determiner #Noun #Noun'],
  ['our drink', '#Possessive #Noun'],
  ['our drinks', '#Possessive #Noun'],
  ['mandatory spending', '#Adjective #Noun'],
  // ['falling into diet traps', '#Gerund into #Noun #Plural'],
  ['a flexible tape measure', 'a #Adjective #Noun #Noun'],
  ['home-field advantage', '#Noun #Noun #Noun'],
  ['while in this state', 'while in this #Noun'],
  ['I’M camping', '#Pronoun #Copula #Gerund'],
  ['dutch brewing giant', '#Noun #Noun #Noun'],
  [`was running around stores.`, 'was #Gerund around #Plural'],
  // ['mental age and calendar age', '#Noun #Noun and #Noun #Noun'],
  ['side with traitors', '#Verb with #Plural'],

  //determiner-corrections
  ['this rocks dude', '#Determiner #Verb #Noun'],
  ['that rocks dude', '#Determiner #Verb #Noun'],
  ['the rocks dude', '#Determiner #Plural #Noun'],
  ['these rocks dude', '#Determiner #Plural #Noun'],
  ['those rocks dude', '#Determiner #Plural #Noun'],
  ['the test string', '#Determiner #Noun #Noun'],

  ['The stream really runs', '#Determiner #Noun #Adverb #Verb'],
  ['The nice stream really runs', '#Determiner #Adjective #Noun #Adverb #Verb'],
  ['there are reasons', '#Noun #Copula #Plural'],
  ['there were many walks', '#Noun #Copula #Adjective #Plural'],
  ['there were the phase', '#Noun #Copula #Determiner #Noun'],
  ['book the flight', '#Verb #Determiner #Noun'],
  ['the euro challenge to', '#Determiner #Noun #Singular to'],
  ['the euro challenge', '#Determiner #Noun #Noun'],
  [`appeal court`, `#Noun #Noun`],
  // [`uncovered wounds heal faster`, '#Adjective #Noun #Verb #Comparative'],
  // [`become overly weakened`, '#Verb #Adverb #PastTense'],
  // [`a completely beaten man`, 'a #Adverb #Verb #Noun'],
  // [`the said card`, 'the #Adjective #Noun'],
  // [`one super strong character`, '. #Adverb #Adjective #Noun'],
  // [`have given up on reason`, '#Auxiliary #PhrasalVerb #Particle on #Noun'],
  // [`you have some valid points`, '#Noun #Verb some #Adjective #Plural'],

  [`he changes`, '. #PresentTense'],
  [`our changes`, '. #Noun'],
  [`then changes`, '. #PresentTense'],
  [`quickly changes`, '. #PresentTense'],
  [`seven changes`, '. #Noun'],
  [`with changes`, '. #Noun'],
  [`without changes`, '. #Noun'],
  [`abrupt changes`, '. #Noun'],
  [`and changes gears`, 'and #PresentTense .'],
  [`changes the gears`, '#PresentTense . .'],
  [`changes my gears`, '#PresentTense . .'],
  [`changes are coming`, '#Noun . .'],
  [`changes quickly`, '#PresentTense #Adverb'],
  [`changes seven things`, '#PresentTense #Value #Plural'],
  [`changes into batman`, '#PresentTense . .'],

  // two consecutive variables
  // [`cut costs`, '#Verb #Plural'],
  // ['The stream runs', '#Determiner #Noun #Verb'],

]
test('match:', function (t) {
  arr.forEach(function (a) {
    let [str, match] = a
    let doc = nlp(str).compute('tagRank')
    let tags = doc.json()[0].terms.map(term => term.tagRank[0])
    let m = doc.match(match)
    let msg = `'${(str + "' ").padEnd(20, ' ')}  - '${tags.join(', ')}'`
    t.equal(m.text(), doc.text(), here + msg)
  })
  t.end()
})