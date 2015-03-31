/////////////////////
///
///  Known issues:
///
////////////////////

#Negation
"the chimney was so yellow".negate
"the name might come from latin"

#Conjugation
verb_conjugate("contain")
verb_conjugate("result")
verb_conjugate("develop")
verb_conjugate("wait")
verb_conjugate("represent")
verb_conjugate("stain")
verb_conjugate("pass")
verb_conjugate("answer")

#POS
pos("Joe would alks the asdf") //"second pass modal"
pos("he blalks the asdf") //"second_pass signal from PRP"
pos("He does not perform it with truly human energies", {}) //issue with needs model
pos("They’re taking risks", {}) //issue with needs model
pos("he lkajsdf so hard", ["PRP", "VB", "RB", "JJ"])
pos("schlooking in toronto is scarey and lkasf", ["VBG", "IN", "NN", "CP", "JJ", "CC", "JJ"])

#Syllables
syllables("birchtree")

#Date parsing
june to march 1995

#Number parsing
two hundred and fifty five thousand

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
nlp.noun('bus').pluralize()
nlp.noun('crisis').pluralize()
nlp.noun('analysis').pluralize()
nlp.noun('neurosis').pluralize()

#negation
"he will really not be a king" -> "he will really be a king"
"he will not really be a king" -> "he will really be a king"
"smoking in the elevator is allowed" -> "smoking in the elevator is not allowed"