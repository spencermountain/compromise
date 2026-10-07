import test from 'tape'
import assertSpec from '../../lib/spec.js'
const here = '[two/postTagger/spatial-preposition] '

const spec = `
The lantern flickered beside the window. {Det,Singular,Past,Prep,Det,Singular}
The ducks swim near the reeds. {Det,Plural,Pres,Prep,Det,Plural}
There was a spider beneath the chair. {There,Copula,Det,Singular,Prep,Det,Singular}
My receipt is inside the bag. {Poss,Singular,Copula,Prep,Det,Singular}
The sun disappeared behind a cloud. {Det,Singular,Past,Prep,Det,Singular}
A rabbit hid under the shed. {Det,Singular,Past,Prep,Det,Singular}
Our cat sleeps beside the radiator. {Poss,Singular,Pres,Prep,Det,Singular}
The goldfish swam behind the rock. {Det,Singular,Past,Prep,Det,Singular}
The leash hangs near the door. {Det,Singular,Pres,Prep,Det,Singular}
She planted carrots behind the shed. {Pronoun,Past,Plural,Prep,Det,Singular}
Our table is near the window. {Poss,Singular,Copula,Prep,Det,Singular}
We hung balloons above the table. {Pronoun,Past,Plural,Prep,Det,Singular}

The dog slept beneath the bench. {Det,Singular,Past,Prep,Det,Singular}
She stood beside her bicycle. {Pronoun,Past,Prep,Poss,Singular}
We waited near the entrance. {Pronoun,Past,Prep,Det,Singular}
The keys fell behind the sofa. {Det,Plural,Past,Prep,Det,Singular}
He stored the blankets under the bed. {Pronoun,Past,Det,Plural,Prep,Det,Singular}
A lamp hangs above the desk. {Det,Singular,Pres,Prep,Det,Singular}
The temperature dropped below zero. {Det,Singular,Past,Prep,Val}
They sat outside the cafe. {Pronoun,Past,Prep,Det,Singular}
She placed the letter inside the drawer. {Pronoun,Past,Det,Singular,Prep,Det,Singular}
The ladder rested against the wall. {Det,Singular,Past,Prep,Det,Singular}
A bird flew over the roof. {Det,Singular,Past,Prep,Det,Singular}
The path runs alongside the river. {Det,Singular,Pres,Prep,Det,Singular}

The box is directly under the shelf. {Det,Singular,Copula,Adv,Prep,Det,Singular}
She stood right beside me. {Pronoun,Past,Adv,Prep,Pronoun}
The sign hangs just above the door. {Det,Singular,Pres,Adv,Prep,Det,Singular}
We parked near her house. {Pronoun,Past,Prep,Poss,Singular}
The dog hid behind us. {Det,Singular,Past,Prep,Pronoun}

The inside pocket is empty. {Det,Adj,Singular,Copula,Adj}
The outside wall is blue. {Det,Adj,Singular,Copula,Adj}
The above examples are simple. {Det,Adj,Plural,Copula,Adj}
`

test(here, t => {
  assertSpec(t, spec, here)
  t.end()
})
