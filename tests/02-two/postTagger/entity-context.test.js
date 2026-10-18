import test from 'tape'
import assertSpec from '../../lib/spec.js'
const here = '[two/postTagger/entity-context] '

test(here + 'miscellaneous, organizations and places', t => {
  assertSpec(t, `
# index.js: miscellaneous, organizations and places
U r cool. {Pronoun,Copula,Adj}
The captain who left. {Det,Noun,Prep,Past}
Who is that? {QuestionWord,Copula,Pronoun}
I like this. {Pronoun,Inf,Pronoun}
Some sort of food. {Det,Noun,Prep,Noun}
Food of some sort. {Noun,Prep,Det,Noun}
Some eat apples. {Noun,Inf,Plural}
Put it there. {Inf,Pronoun,Adv}
Such skill. {Det,Noun}
Are ya ready? {Copula,Pronoun,Adj}
Is there food? {Copula,There,Noun}
Should there be food? {Modal,There,Inf,Noun}
Do you agree? {QuestionWord,Pronoun,Inf}
Does he agree? {QuestionWord,Pronoun,Inf}
The person who runs. {Det,Noun,Prep,Pres}
The person which eats. {Det,Noun,Prep,Pres}
Guess who. {Inf,QuestionWord}
University of Toronto. {Organization,Organization,Organization}
John & Mary Ltd. {Organization,Organization,Organization,Organization}
Smith & Rogers. {Organization,Organization,Organization}
Walmart USA. {Organization,Organization}
Toronto Microsoft. {Organization,Organization}
FitBit Inc. {Organization,Organization}
The XYZ corporation. {Det,Organization,Organization}
Government of India. {Organization,Organization,Organization}
School board. {Organization,Organization}
Special committee. {Organization,Organization}
Global Microsoft. {Organization,Organization}
Toronto public school. {Organization,Organization,Organization}
Toronto Yankees. {Organization,Organization}
Manchester United. {Organization,Organization}
Toronto FC. {Organization,Organization}
The New Orleans basketball team. {Det,Organization,Organization,Organization,Organization}
West Toronto. {Place,Place}
Toronto ca. {Place,Place}
Portland OR. {Place,Place}
With turkey. {Prep,Noun}
Toronto point. {Place,Place}
123 main street. {Address,Address,Address}
Port Dover. {Place,Place}
`)
  t.end()
})
