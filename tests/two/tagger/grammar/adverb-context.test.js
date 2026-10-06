import test from 'tape'
import assertSpec from '../../_spec.js'

test('two/tagger/adverb-context: adverbs and dates', t => {
  assertSpec(t, `
# index.js: adverbs and dates
Way too hot. {Adv,Adv,Adj}
They sing like an angel. {Pronoun,Inf,Prep,Det,Noun}
They barely even walk. {Pronoun,Adv,Adv,Inf}
They are cheering hard. {Pronoun,Aux,Ger,Adv}
He is well. {Pronoun,Copula,Adj}
A bit cold. {Det,Adv,Adj}
They become overly weakened. {Pronoun,Inf,Adv,Adj}
A completely beaten man. {Det,Adv,Adj,Noun}
A close friend. {Det,Adj,Noun}
He does better. {Pronoun,Pres,Adv}
Walking close. {Ger,Adv}
He charged back. {Pronoun,Past,Adv}
The well. {Det,Noun}
He sees well. {Pronoun,Pres,Adv}
On sat. {Prep,WeekDay}
In march. {Prep,Month}
This march. {Date,Month}
This may. {Date,Month}
March 5th. {Month,Date}
5th of march. {Date,Date,Month}
March and feb. {Month,Conj,Month}
Feb to march. {Month,Prep,Month}
Quickly march. {Adv,Inf}
12 am. {Time,Time}
5th of June. {Date,Date,Month}
5 June. {Date,Month}
June 5 to 7. {Month,Date,Date,Date}
June the 12th. {Month,Date,Date}
June 7. {Month,Date}
7 June. {Date,Month}
Aug 20-21. {Month,Date,Date,Date}
Wednesday June 5th. {WeekDay,Month,Date}
Aug 5th 2021. {Month,Date,Date}
China standard time. {Timezone,Timezone,Timezone}
Eastern time. {Timezone,Timezone}
Central european time. {Timezone,Timezone,Timezone}
`)
  t.end()
})
