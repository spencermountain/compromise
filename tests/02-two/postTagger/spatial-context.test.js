import test from 'tape'
import assertSpec from '../_spec.js'
const here = '[two/postTagger/spatial-context] '

test(here + 'spatial prepositions retain verbal contrasts', t => {
  assertSpec(t, `
# second-pass cleanup: spatial prepositions retain verbal contrasts
they stayed above the ship {Pronoun,Past,Prep,Det,Noun}
we waited above my house {Pronoun,Past,Prep,Poss,Noun}
she stood above him {Pronoun,Past,Prep,Pronoun}
they stayed below the ship {Pronoun,Past,Prep,Det,Noun}
we waited below my house {Pronoun,Past,Prep,Poss,Noun}
she stood below him {Pronoun,Past,Prep,Pronoun}
they stayed under the ship {Pronoun,Past,Prep,Det,Noun}
we waited under my house {Pronoun,Past,Prep,Poss,Noun}
she stood under him {Pronoun,Past,Prep,Pronoun}
they stayed over the ship {Pronoun,Past,Prep,Det,Noun}
we waited over my house {Pronoun,Past,Prep,Poss,Noun}
she stood over him {Pronoun,Past,Prep,Pronoun}
they stayed beside the ship {Pronoun,Past,Prep,Det,Noun}
we waited beside my house {Pronoun,Past,Prep,Poss,Noun}
she stood beside him {Pronoun,Past,Prep,Pronoun}
they stayed behind the ship {Pronoun,Past,Prep,Det,Noun}
we waited behind my house {Pronoun,Past,Prep,Poss,Noun}
she stood behind him {Pronoun,Past,Prep,Pronoun}
they stayed against the ship {Pronoun,Past,Prep,Det,Noun}
we waited against my house {Pronoun,Past,Prep,Poss,Noun}
she stood against him {Pronoun,Past,Prep,Pronoun}
they stayed outside the ship {Pronoun,Past,Prep,Det,Noun}
we waited outside my house {Pronoun,Past,Prep,Poss,Noun}
she stood outside him {Pronoun,Past,Prep,Pronoun}
they stayed inside the ship {Pronoun,Past,Prep,Det,Noun}
we waited inside my house {Pronoun,Past,Prep,Poss,Noun}
she stood inside him {Pronoun,Past,Prep,Pronoun}
they stayed near the ship {Pronoun,Past,Prep,Det,Noun}
we waited near my house {Pronoun,Past,Prep,Poss,Noun}
she stood near him {Pronoun,Past,Prep,Pronoun}
they stayed beneath the ship {Pronoun,Past,Prep,Det,Noun}
we waited beneath my house {Pronoun,Past,Prep,Poss,Noun}
she stood beneath him {Pronoun,Past,Prep,Pronoun}
they stayed underneath the ship {Pronoun,Past,Prep,Det,Noun}
we waited underneath my house {Pronoun,Past,Prep,Poss,Noun}
she stood underneath him {Pronoun,Past,Prep,Pronoun}
they stayed aboard the ship {Pronoun,Past,Prep,Det,Noun}
we waited aboard my house {Pronoun,Past,Prep,Poss,Noun}
she stood aboard him {Pronoun,Past,Prep,Pronoun}
they will near the coast {Pronoun,Modal,Inf|!Preposition,Det,Noun}
the boat nears the coast {Det,Noun,Pres|!Preposition,Det,Noun}
`)
  t.end()
})

test(here + 'spatial objects after modifiers and commas', t => {
  assertSpec(t, `
# second-pass cleanup: spatial objects after modifiers and commas
the plane flew well above London {Det,Noun,Past,Adv,Prep|!Verb,City}
she stood directly below the window {Pronoun,Past,Adv,Prep|!Verb,Det,Noun}
we looked just under the bed {Pronoun,Past,Adv,Prep|!Verb,Det,Noun}
the bird flew right over my head {Det,Noun,Past,Adv,Prep|!Verb,Poss,Noun}
he waited, beside her {Pronoun,Past,Prep|!Verb,Pronoun}
she stood, behind him {Pronoun,Past,Prep|!Verb,Pronoun}
they leaned against our fence {Pronoun,Past,Prep|!Verb,Poss,Noun}
she waited outside London {Pronoun,Past,Prep|!Verb,City}
we stayed inside their house {Pronoun,Past,Prep|!Verb,Poss,Noun}
they camped near Toronto {Pronoun,Past,Prep|!Verb,City}
the tunnel runs beneath our house {Det,Noun,Pres,Prep|!Verb,Poss,Noun}
he hid underneath the table {Pronoun,Past,Prep|!Verb,Det,Noun}
she climbed aboard their ship {Pronoun,Past,Prep|!Verb,Poss,Noun}
`)
  t.end()
})

test(here + 'spatial modifiers retain their prepositions', t => {
  assertSpec(t, `
# rule cleanup: spatial modifiers retain their prepositions
the plane flew well above the clouds {Det,Noun,Past,Adv,Prep,Det,Plural}
she stood well above my window {Pronoun,Past,Adv,Prep,Poss,Noun}
it hovered well above him {Pronoun,Past,Adv,Prep,Pronoun}
the plane flew well below the clouds {Det,Noun,Past,Adv,Prep,Det,Plural}
she stood well below my window {Pronoun,Past,Adv,Prep,Poss,Noun}
it hovered well below him {Pronoun,Past,Adv,Prep,Pronoun}
the plane flew well under the clouds {Det,Noun,Past,Adv,Prep,Det,Plural}
she stood well under my window {Pronoun,Past,Adv,Prep,Poss,Noun}
it hovered well under him {Pronoun,Past,Adv,Prep,Pronoun}
the plane flew well over the clouds {Det,Noun,Past,Adv,Prep,Det,Plural}
she stood well over my window {Pronoun,Past,Adv,Prep,Poss,Noun}
it hovered well over him {Pronoun,Past,Adv,Prep,Pronoun}
the plane flew just above the clouds {Det,Noun,Past,Adv,Prep,Det,Plural}
she stood just above my window {Pronoun,Past,Adv,Prep,Poss,Noun}
it hovered just above him {Pronoun,Past,Adv,Prep,Pronoun}
the plane flew just below the clouds {Det,Noun,Past,Adv,Prep,Det,Plural}
she stood just below my window {Pronoun,Past,Adv,Prep,Poss,Noun}
it hovered just below him {Pronoun,Past,Adv,Prep,Pronoun}
the plane flew just under the clouds {Det,Noun,Past,Adv,Prep,Det,Plural}
she stood just under my window {Pronoun,Past,Adv,Prep,Poss,Noun}
it hovered just under him {Pronoun,Past,Adv,Prep,Pronoun}
the plane flew just over the clouds {Det,Noun,Past,Adv,Prep,Det,Plural}
she stood just over my window {Pronoun,Past,Adv,Prep,Poss,Noun}
it hovered just over him {Pronoun,Past,Adv,Prep,Pronoun}
the plane flew right above the clouds {Det,Noun,Past,Adv,Prep,Det,Plural}
she stood right above my window {Pronoun,Past,Adv,Prep,Poss,Noun}
it hovered right above him {Pronoun,Past,Adv,Prep,Pronoun}
the plane flew right below the clouds {Det,Noun,Past,Adv,Prep,Det,Plural}
she stood right below my window {Pronoun,Past,Adv,Prep,Poss,Noun}
it hovered right below him {Pronoun,Past,Adv,Prep,Pronoun}
the plane flew right under the clouds {Det,Noun,Past,Adv,Prep,Det,Plural}
she stood right under my window {Pronoun,Past,Adv,Prep,Poss,Noun}
it hovered right under him {Pronoun,Past,Adv,Prep,Pronoun}
the plane flew right over the clouds {Det,Noun,Past,Adv,Prep,Det,Plural}
she stood right over my window {Pronoun,Past,Adv,Prep,Poss,Noun}
it hovered right over him {Pronoun,Past,Adv,Prep,Pronoun}
the plane flew directly above the clouds {Det,Noun,Past,Adv,Prep,Det,Plural}
she stood directly above my window {Pronoun,Past,Adv,Prep,Poss,Noun}
it hovered directly above him {Pronoun,Past,Adv,Prep,Pronoun}
the plane flew directly below the clouds {Det,Noun,Past,Adv,Prep,Det,Plural}
she stood directly below my window {Pronoun,Past,Adv,Prep,Poss,Noun}
it hovered directly below him {Pronoun,Past,Adv,Prep,Pronoun}
the plane flew directly under the clouds {Det,Noun,Past,Adv,Prep,Det,Plural}
she stood directly under my window {Pronoun,Past,Adv,Prep,Poss,Noun}
it hovered directly under him {Pronoun,Past,Adv,Prep,Pronoun}
the plane flew directly over the clouds {Det,Noun,Past,Adv,Prep,Det,Plural}
she stood directly over my window {Pronoun,Past,Adv,Prep,Poss,Noun}
it hovered directly over him {Pronoun,Past,Adv,Prep,Pronoun}
we looked under the bed {Pronoun,Past,Prep,Det,Noun}
`)
  t.end()
})

test('rule cleanup: under after a verb', t => {
  assertSpec(t, `
    we looked under the bed {Pronoun,Past,Prep,Det,Noun}
    she crawled under my desk {Pronoun,Past,Prep,Poss,Noun}
    they stood under it {Pronoun,Past,Prep,Pronoun}
  `, here.trim())
  t.end()
})
