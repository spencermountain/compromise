import test from 'tape'
import assertSpec from '../_spec.js'
const here = '[two/postTagger/person-context] '

test(here + 'names and honorifics', t => {
  assertSpec(t, `
# index.js: names and honorifics
He is Foo Smith. {Pronoun,Copula,FirstName,LastName}
Dwayne 'the rock' Johnson. {Person,Person,Person,Person}
John b Smith. {Person,Person,Person}
J. Smith. {Person,Person}
John jr. {Person,Person}
Dr. J. {Honorific,Person}
John Smith III. {Person,Person,Person}
John b. {Person,Person}
Ludwig van Beethoven. {Person,Person,Person}
King of Spain. {Noun,Prep,Place}
Al Smith. {Person,Person}
Ferdinand de Almar. {Person,Person,Person}
Osama bin Laden. {Person,Person,Person}
John L. Foo. {Person,Person,Person}
Mr Foo. {Honorific,Person}
Peter the great. {Person,Person,Person}
John van Smith. {Person,Person,Person}
Jose de Sucre. {Person,Person,Person}
Jani K. Smith. {Person,Person,Person}
John Keith Jones. {Person,Person,Person}
John Foo. {Person,Person}
Joe K. Sombrero. {Person,Person,Person}
Anthony de Marco. {Person,Person,Person}
Sergeant major Harold. {Honorific,Honorific,Person}
General John. {Honorific,Person}
Miss John. {Honorific,Person}
Dr John foobar. {Honorific,Person,Person}
His excellency John. {Honorific,Honorific,Person}
Dr teacher. {Honorific,Person}
First lady Michelle Obama. {Honorific,Honorific,Person,Person}
Louis IV. {Person,Person}
Ebenezer Scrooge. {Person,Person}
June Smith. {Person,Person}
Cliff Clavin. {Person,Person}
Ollie Faroo. {Person,Person}
They really wade. {Pronoun,Adv,Inf}
She drew closer. {Pronoun,Past,Comparative}
Wade Smith. {Person,Person}
Wade G. Slapgoop. {Person,Person,Person}
Will Smith. {Person,Person}
Jack Layton won. {Person,Person,Past}
Captain John walks. {Honorific,Person,Pres}
`)
  t.end()
})

test(here + 'Will inside sentences and modal contrasts', t => {
  assertSpec(t, `
# second-pass cleanup: Will inside sentences and modal contrasts
yesterday Will walked home {Date,FirstName|!Modal,Past,Adv}
after lunch Will called {Prep,Noun,FirstName|!Modal,Past}
Mary smiled, and Will waved {Person,Past,Conj,FirstName|!Modal,Past}
Will you help? {Modal|!FirstName,Pronoun,Inf}
Will she call? {Modal|!FirstName,Pronoun,Inf}
Will they leave? {Modal|!FirstName,Pronoun,Inf}
`)
  t.end()
})

test(here + 'numbered lieutenant titles', t => {
  assertSpec(t, `
# rule cleanup: numbered lieutenant titles
the first lieutenant arrived {Det,Honorific,Honorific,Past}
the second lieutenant arrived {Det,Honorific,Honorific,Past}
the third lieutenant arrived {Det,Honorific,Honorific,Past}
the 1st lieutenant arrived {Det,Honorific,Honorific,Past}
the 2nd lieutenant arrived {Det,Honorific,Honorific,Past}
the 3rd lieutenant arrived {Det,Honorific,Honorific,Past}
the first visitor arrived {Det|!Honorific,Ordinal|!Honorific,Actor|!Honorific,Past|!Honorific}
the second train stopped {Det|!Honorific,Ordinal|!Honorific,Noun|!Honorific,Past|!Honorific}
the third child waved {Det|!Honorific,Ordinal|!Honorific,Noun|!Honorific,Past|!Honorific}
`)
  t.end()
})

test(here + 'person names with roman numerals', t => {
  assertSpec(t, `
# rule cleanup: person names with roman numerals
King Louis XIV {Person,Person,Person}
Queen Elizabeth II {Person,Person,Person}
Pope John Paul II {Person,Person,Person,Person}
King Louis the XIV {Person,Person,Person,Person}
`)
  t.end()
})
