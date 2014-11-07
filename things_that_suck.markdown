/////////////////////
///
///  Known issues:
///
////////////////////

#Negation
"the chimney was so yellow".negate

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

#Syllables
console.log(syllables("birchtree"))

#Date parsing
june to march 1995