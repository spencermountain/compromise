/////////////////////
///
///  Known issues:
///
////////////////////

#Negation
"the chimney was so yellow".negate
"the name might come from latin"

#Conjugation
console.log(verb_conjugate("contain")) ///*****bug
console.log(verb_conjugate("result")) //****bug
console.log(verb_conjugate("develop")) //****bug
console.log(verb_conjugate("wait"))//****bug
console.log(verb_conjugate("represent"))//****bug
console.log(verb_conjugate("stain"))//****bug
console.log(verb_conjugate("pass"))//****bug
console.log(verb_conjugate("answer"))//****bug

#POS
fun = pos("Joe would alks the asdf") //"second pass modal"
fun = pos("he blalks the asdf") //"second_pass signal from PRP"
fun = pos("He does not perform it with truly human energies", {}) //issue with needs model
fun = pos("They’re taking risks", {}) //issue with needs model

assert_pos("he lkajsdf so hard", ["PRP", "VB", "RB", "JJ"])
assert_pos("schlooking in toronto is scarey and lkasf", ["VBG", "IN", "NN", "CP", "JJ", "CC", "JJ"])

#Syllables
console.log(syllables("birchtree"))

#Date parsing
june to march 1995

#Number parsing
ambiguity for 'tenth, hundredth, thousandth...'
   "two thousandth" => 0.002 or 2000th ?

this is tricky to do, but possible:
   "four and a half" => 4.5
   two and a half thousand", 2,500

shitbags javascipt float multiplication issue
   "four point seven seven" -> 4.7700000000000005,

there's an idiomatic rule against saying this, though technically fine.
   "twenty hundred" -> 2000

#inflection
printer(nlp.noun('bus').pluralize() , 'buses')
printer(nlp.noun('crisis').pluralize() , 'crises')
printer(nlp.noun('analysis').pluralize() , 'analyses')
printer(nlp.noun('neurosis').pluralize() , 'neuroses')
