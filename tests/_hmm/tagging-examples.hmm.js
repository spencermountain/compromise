import test from 'tape'
import assertSpec from '../lib/spec.js'
const here = '[hmm/tagging-examples] '

// Expected tags come from the language, not the tagger, so some lines fail today.
// '.' skips a word this line is not about.
const spec = `
# --- the original four
Version 10.11.12 is installed {Noun,Noun|!Date|!Value,Copula,Past}
I live at 12 March Street. {Pronoun,Inf,Prep,Addr|Numeric|!Date,Addr|!Date|!Month,Addr}
It is the third quarter of the game {Pronoun,Copula,Det,Ordinal,Noun|!Fraction,Prep,Det,Noun}
A good morning routine helps {Det,Adj,Noun,Noun,Pres}

# --- version numbers are not dates
version 2.0.1 is out {Noun,Noun|!Date,.,.}
Version 1.0.0 {Noun,Noun|!Date}
the firmware 10.11.12 update {Det,Noun,Noun|!Date,Noun}
install build 10.11.12 today {.,Noun,Noun|!Date,Date}
upgrade to v 10.11.12 {.,.,Noun,Noun|!Date}
we shipped release 10.11.12 {.,.,Noun,Noun|!Date}
Python 3.11.4 is fast {Noun,Noun|!Date,.,.}
node 18.19.0 is out {Noun,Noun|!Date,.,.}
Ubuntu 22.04.3 is out {Noun,Noun|!Date,.,.}
1.0.0 {Noun|!Date}
2.30.5 {Noun|!Date}
Python 3.12.10 is out {Noun,Noun|!Date,.,.} # date-shaped, with no version word
macOS 10.15.7 is old {Noun|!Plural,Noun|!Date,Copula,Adj}
upgrade to v10.11.12 now {.,Prep,Noun,Adv}
# dotted dates stay dates
The meeting is 10.11.12 {Det,Noun,Copula,Date}
Deadline 10.11.12 {Noun,Date}
Monday 10.11.12 {Date,Date}
Release 15.03.2020 {.,Date}
on 2024.01.15 we left {Prep,Date,Pronoun,Past}
15.01.2024 {Date}
01.15.2024 {Date}
2015.08.13 {Date}
9.8.2013 {Date}
12.3.99 {Date}
I was born on 12.03.1985 {Pronoun,Copula,Past,Prep,Date}
Born on 10.11.12 {Past,Prep,Date}

# --- a street named after a month is not a date
I live at 12 May Street. {Pronoun,Inf,Prep,Addr|!Date,Addr|!Date,Addr}
I live at 40 April Road. {Pronoun,Inf,Prep,Addr|!Date,Addr|!Date,Addr}
I live at 12 June Avenue. {Pronoun,Inf,Prep,Addr|!Date,Addr|!Date,Addr}
I live at 12 August Lane. {Pronoun,Inf,Prep,Addr|!Date,Addr|!Date,Addr}
I live at 12 January Street. {Pronoun,Inf,Prep,Addr|!Date,Addr|!Date,Addr}
She moved to 5 October Drive {Pronoun,Past,Prep,Addr|!Date,Addr|!Date,Addr}
12 December Boulevard is nice {Addr|!Date,Addr|!Date,Addr,Copula,Adj}
12 March St. {Addr|!Date,Addr|!Date,Addr}
I live at 12 march street. {Pronoun,Inf,Prep,Addr|!Date,Addr|!Date,Addr}
I live at 12 may street. {Pronoun,Inf,Prep,Addr|!Date,Addr|!Modal,Addr|!Vb}
I live at 12 MARCH STREET. {Pronoun,Inf,Prep,Addr|!Date,Addr|!Date,Addr}
I live at 12 Main Street. {Pronoun,Inf,Prep,Addr,Addr,Addr}
I live at 123 main street {Pronoun,Inf,Prep,Addr,Addr,Addr}
12 Elm Road {Addr,Addr,Addr}
One Yonge Street {Addr,Addr,Addr}
the hotel at 3000 Las Vegas Blvd {Det,Noun,Prep,Addr,Addr,Addr,Addr}
# not addresses
a 4 hour drive away {Det,Val|!Addr,Noun|!Addr,Noun|!Addr,.}
It is a 12 hour drive. {Pronoun,Copula,Det,Val|!Addr,Noun|!Addr,Noun|!Addr}
a 2,800 km road {Det,Val|!Addr,Unit|!Addr,Noun|!Addr}
his little four wheel drive {Poss,Adj,Val|!Addr,Noun|!Addr,Noun|!Addr}
a two lane road {Det,Val|!Addr,Noun|!Addr,Noun|!Addr}
There is not one ideal way to do it. {There,Copula,Negative,Val|!Addr,Adj|!Addr,Noun|!Addr,.,.,.}
It is not a one way street. {Pronoun,Copula,Negative,Det,Val|!Addr,Noun|!Addr,Noun|!Addr}
On 12 March road closures begin. {Prep,Date|!Addr,Month|!Addr,Noun|!Addr,Plural,Inf}
On 12 march road closures begin. {Prep,Date|!Addr,Month|!Addr,Noun|!Addr,Plural,Inf}
The 12 March drive was long. {Det,Date|!Addr,Month|!Addr,Noun|!Addr,Copula,Adj}
5 March street parties were held. {Date|!Addr,Month|!Addr,Noun|!Addr,Plural,.,.}
5 march street parties were held. {Date|!Addr,Month|!Addr,Noun|!Addr,Plural,.,.}
the soundtrack of the 2011 film Drive {Det,Noun,Prep,Det,Val|!Addr,Noun|!Addr,Noun|!Addr}

# --- a quarter or half with a determiner is a noun, not a fraction
the first quarter of the year {Det,Ordinal,Noun|!Fraction,Prep,Det,Noun}
the third quarter of 2024 {Det,Ordinal,Noun|!Fraction,Prep,Date}
in the last quarter of the year {Prep,Det,Adj,Noun|!Fraction,Prep,Det,Noun}
the final quarter of the match {Det,Adj,Noun|!Fraction,Prep,Det,Noun}
each quarter of the year {Det,Noun|!Fraction,Prep,Det,Noun}
the 3rd quarter of the game {Det,Ordinal,Noun|!Fraction,Prep,Det,Noun}
Second quarter of the game {Ordinal,Noun|!Fraction,Prep,Det,Noun}
It is the second half of the game {Pronoun,Copula,Det,Ordinal,Noun|!Fraction,Prep,Det,Noun}
the first half of the century {Det,Ordinal,Noun|!Fraction,Prep,Det,Noun}
the other half of the people {Det,Adj,Noun|!Fraction,Prep,Det,Plural}
the lower half of the body {Det,Adj,Noun|!Fraction,Prep,Det,Noun}
my half of the deal {Poss,Noun|!Fraction,Prep,Det,Noun}
# real fractions, which should not also be dates
a quarter of the pie {.,Fraction|!Date,Prep,Det,Noun}
one quarter of the pie {.,Fraction|!Date,Prep,Det,Noun}
quarter of the pie {Fraction|!Date,Prep,Det,Noun}
about a quarter of a mile {.,.,Fraction|!Date,Prep,Det,Noun}
he ate a quarter of it {Pronoun,Past,.,Fraction|!Date,Prep,Pronoun}
half of the people left {Fraction,Prep,Det,Plural,Past}
half the people left {Fraction,Det,Plural,Past}
half a penny {Fraction,Det,Noun}
at least half of the people {.,.,Fraction,Prep,Det,Plural}
nearly half of the people {Adv,Fraction,Prep,Det,Plural}

# --- a singular determiner leads a singular subject, so the last word is the verb
A routine helps {Det,Noun,Pres}
This routine helps {Det,Noun,Pres}
That routine helps {Det,Noun,Pres}
A morning routine helps {Det,Noun,Noun,Pres}
A good plan helps {Det,Adj,Noun,Pres}
A very good plan helps {Det,Adv,Adj,Noun,Pres}
A big new plan helps {Det,Adj,Adj,Noun,Pres}
Another plan works {Det,Noun,Pres}
I think a good plan helps {Pronoun,Inf,Det,Adj,Noun,Pres}
Every child counts {Det,Noun,Pres}
Each step matters {Det,Noun,Pres}
A good diet matters {Det,Adj,Noun,Pres}
A new system works {Det,Adj,Noun,Pres}
An idea matters {Det,Noun,Pres}
A representative helps {Det,Noun,Pres}
a good meeting helps {Det,Adj,Noun,Pres}
a meeting helps {Det,Noun,Pres}
A wedding matters {Det,Noun,Pres}
how a plane works {.,Det,Noun,Pres}
a disease state results {Det,Noun,Noun,Pres}
# the same shape without a singular determiner, which is hard to separate from a plural noun
The routine helps. {Det,Noun,Pres}
The new plan works. {Det,Adj,Noun,Pres}
The morning routine helps. {Det,Noun,Noun,Pres}
The representative helps. {Det,Noun,Pres}
The whole thing stinks. {Det,Adj,Noun,Pres}
Good sleep helps. {Adj,Noun,Pres}
Exercise helps. {Noun,Pres}
Sleep helps. {Noun,Pres}
My plan works. {Poss,Noun,Pres}
My morning routine helps. {Poss,Noun,Noun,Pres}
Expanding opportunity works. {.,Noun,Pres}
The news breaks. {Det,Noun,Pres}
Politics matters. {Noun,Pres}

# --- plural nouns stay plural
the fire trucks {Det,Noun,Plural}
the school buses {Det,Noun,Plural}
the bus stops {Det,Noun,Plural}
the morning routines {Det,Noun,Plural}
The dog treats. {Det,Noun,Plural}
the sweet potato fries. {Det,Adj,Noun,Plural}
the health services {Det,Noun,Plural}
the graduate programs {Det,Noun,Plural}
your guild colors {Poss,Noun,Plural}
Trembling hands. {.,Plural}
near death experiences {Adj,Noun,Plural}
Near death experiences. {Adj,Noun,Plural}
ambitious sales targets {Adj,Plural,Plural}
sales targets {Plural,Plural}
the sales targets {Det,Plural,Plural}
these sales targets {Det,Plural,Plural}
few sales targets {.,Plural,Plural}
many sales targets {.,Plural,Plural}
a few sales targets {.,.,Plural,Plural}
a lot of sales targets {.,.,Prep,Plural,Plural}
savings accounts {Plural,Plural}
media reports {.,Plural}
a friend's plans {Det,Poss,Plural}
An old man's dreams {Det,Adj,Poss,Plural}
This year's plans {Det,Poss,Plural}
Each child's needs {Det,Poss,Plural}
this company's patents {Det,Poss,Plural}
this director's films {Det,Poss,Plural}
a couple plans {Det,Noun,Plural}
a great many plans {Det,Adj,Adj,Plural}
this many plans {Det,Adj,Plural}
a dozen plans {Det,Val,Plural}
a hundred signs {Det,Val,Plural}
once a year updates {.,Det,Noun,Plural}
Every few steps {Det,.,Plural}
a fantasy sports league {Det,Noun,Plural,Noun}
I'd love to have a job cleaning mirrors. {Pronoun,Modal,Inf,.,.,Det,Noun,.,Plural}
# mid-clause compounds, which are harder than the last word of a clause
sports records are made {Plural,Plural,Copula,.}
media markets to have {.,Plural,.,.}
Media markets are growing. {.,Plural,Aux,Ger}
Human rights abuses were reported. {.,Plural,Plural,.,.}
Savings accounts help people. {Plural,Plural,Inf,Plural}
The Arctic lands were subjected. {Det,.,Plural,.,.}
The Arab states are divided. {Det,.,Plural,.,.}
# a plural inside a prepositional phrase does not stop the next word being the verb
Heaviest rain in four decades hits Delhi {.,Noun,Prep,Val,Plural,Pres,.}
A recent survey of 126 countries shows that it is true {Det,Adj,Noun,Prep,Val,Plural,Pres,.,.,.,.}
The first set of regulations focuses on equipment {Det,Ordinal,Noun,Prep,Plural,Pres,Prep,Noun}
Plan to phase out old vehicles hits roadblock {Noun,.,.,.,Adj,Plural,Pres,Noun}
Danvers overpowers the guard. {Noun|!Plural,Pres,Det,Noun}
as the Times reports {.,Det,Noun,Pres}

# --- may is a modal beside a date word
Tomorrow may be better. {Date,Modal,Inf,Adj}
Monday may be busy. {Date,Modal,Inf,Adj}
Today may be the day. {Date,Modal,Inf,Det,Noun}
Next week may be better. {.,Noun,Modal,Inf,Adj}
Monday may not work. {Date,Modal,Negative,Inf}
Tomorrow may also be fine. {Date,Modal,Adv,Inf,Adj}
The day may have come. {Det,Noun,Modal,.,Vb}
The week may seem long. {Det,Noun,Modal,Inf,Adj}
Tomorrow he may leave. {Date,Pronoun,Modal,Inf}
On Monday we may leave. {Prep,Date,Pronoun,Modal,Inf}
In 2020 they may leave. {Prep,Date,Pronoun,Modal,Inf}
By 2020 may be too late. {Prep,Date,Modal,Inf,Adv,Adj}
2020 may be the year. {Date,Modal,Inf,Det,Noun}
The year 2020 may be the best. {Det,Noun,Date,Modal,Inf,Det,.}
Tomorrow, may I go? {Date,Modal,Pronoun,Inf}
You may leave tomorrow. {Pronoun,Modal,Inf,Date}
We may go Monday. {Pronoun,Modal,Inf,Date}
He may call tomorrow. {Pronoun,Modal,Inf,Date}
It may rain today. {Pronoun,Modal,Inf,Date}
It may take years. {Pronoun,Modal,Inf,Noun}
It may this year. {Pronoun,Modal,Det,Noun}
May I go tomorrow? {Modal,Pronoun,Inf,Date}
They may come in June. {Pronoun,Modal,Inf,Prep,Month}
This may be true. {.,Modal,Inf,Adj}
This may not be an easy conversation. {.,Modal,Negative,Inf,Det,Adj,Noun}
This may also be true. {.,Modal,Adv,Inf,Adj}
as may be necessary {.,Modal,Inf,Adj}
as may suffice for now {.,Modal,Inf,.,.}
more than may be expected {.,.,Modal,Inf,.}
A drink or two may have you feeling fine. {Det,Noun,Conj,Val|!Date,Modal,.,Pronoun,.,.}
These 5 may leave. {Det,Val|!Date,Modal,Inf}
The two may leave. {Det,Val|!Date,Modal,Inf}
All 12 may apply. {.,Val|!Date,Modal,Inf}
These 12 may not leave. {Det,Val|!Date,Modal,Negative,Inf}
These 12 may also leave. {Det,Val|!Date,Modal,Adv,Inf}
The first may leave. {Det,Val|!Date,Modal,Inf}
$5 may help. {Money|!Date,Modal,Inf}
20% may leave. {Percent|!Date,Modal,Inf}

# --- march is a verb after a subject
Tomorrow we march on. {Date,Pronoun,Vb,.}
On Monday we march. {Prep,Date,Pronoun,Vb}
They march tomorrow. {Pronoun,Vb,Date}
We march Monday. {Pronoun,Vb,Date}
They march on Monday. {Pronoun,Vb,Prep,Date}
They march to Monday. {Pronoun,Vb,Prep,Date}
They march until Monday. {Pronoun,Vb,Prep,Date}
They march 5 miles a day. {Pronoun,Vb,Val,Plural,Det,Noun}
The soldiers march on Monday. {Det,Plural,Vb,Prep,Date}
The soldiers march tomorrow. {Det,Plural,Vb,Date}
The soldiers march through Monday. {Det,Plural,Vb,Prep,Date}
The soldiers march. {Det,Plural,Vb}
Protesters march in the streets. {Plural,Vb,Prep,Det,Plural}
The three march on. {Det,Val|!Date,Vb,.}
Two march in step. {Val|!Date,Vb,Prep,Noun}
These 12 march on. {Det,Val|!Date,Vb,.}
All 12 march in step. {.,Val|!Date,Vb,Prep,Noun}
The 12 march on. {Det,Val|!Date,Vb,.}
# march as a noun
the protest march was peaceful {Det,Noun,Noun|!Month,Copula,Adj}
the students march ended {Det,Plural,Noun|!Month,Past}
the civil rights march on Washington {Det,Adj,Plural,Noun|!Month,Prep,.}
the first march on the capital {Det,Val|!Date,Noun|!Month,Prep,Det,Noun}
The march on Monday was long {Det,Noun|!Month,Prep,Date,Copula,Adj}
The Prince's March {Det,Poss,Noun|!Vb}

# --- march and may are months
I left on 12 March. {Pronoun,Past,Prep,Date,Month}
I left on 12 May. {Pronoun,Past,Prep,Date,Month}
12 march 2021 {Date,Month,Date}
March 12 {Month,Date}
3 May was a Monday {Date,Month,Copula,Det,Date}
12 May ended badly {Date,Month,Past,Adv}
5th May {Date,Month}
on 1st March {Prep,Date,Month}
on the 5th of May {Prep,Det,Date,Date,Month}
the fifth of March {Det,Date,Date,Month}
October 11, 1871 – March 31, 1945 {Month,Date,Date,Month,Date,Date}
June and may {Month,Conj,Month}
June to march {Month,Prep,Month}
feb to march {Month,Prep,Month}
from January through March {Prep,Month,Prep,Month}
Monday, March 5 {Date,Month,Date}
Monday May 5th {Date,Month,Date}
tomorrow in may {Date,Prep,Month}
last year in March {.,Noun,Prep,Month}
In 2020 may was hot. {Prep,Date,Month,Copula,Adj}
2020 may 5 {Date,Month,Date}
March and feb {Month,Conj,Month}
may and june {Month,Conj,Month}
may to june {Month,Prep,Month}
march through june {Month,Prep,Month}
March 2020 {Month,Date}
May 2020 {Month,Date}
March of 2020 {Month,Prep,Date}
may in 2020 {Month,Prep,Date}
May this year was hot. {Month,Det,Noun,Copula,Adj}
May that year was hot. {Month,Det,Noun,Copula,Adj}
the period March to May that year {Det,Noun,Month,Prep,Month,Det,Noun}
march next year {Month,.,Noun}
may last year {Month,.,Noun}
March on Monday {Month,Prep,Date}
in March next year {Prep,Month,.,Noun}
5pm may 5 {Date,Month,Date}
Last May I went home. {.,Month,Pronoun,Past,.}
Next May we leave. {.,Month,Pronoun,Inf}
This May we left. {.,Month,Pronoun,Past}
On 5 May I went home. {Prep,Date,Month,Pronoun,Past,.}
On 12 March we left. {Prep,Date,Month,Pronoun,Past}
In May I went home. {Prep,Month,Pronoun,Past,.}
In May leave was granted. {Prep,Month,Noun,Copula,Past}
As May approaches {.,Month,Pres}
Results March to May {Plural,Month,Prep,Month}
Results March to June {Plural,Month,Prep,Month}
Elections May 5 {Plural,Month,Date}
Sales March 2020 {Plural,Month,Date}
this may {.,Month}
last may {.,Month}
April showers bring May flowers. {.,Plural,Inf,Month,Plural}
August is hot. {Month,Copula,Adj}

# --- a time of day as a modifier
an evening class {Det,Noun,Noun}
a morning flight {Det,Noun,Noun}
# is a greeting an Expression? (convention to confirm)
Good morning! {Expr,Expr}
Good morning, Alice {Expr,Expr,Person}
good morning everyone {Expr,Expr,.}

# --- other words tagged wrongly today
Time flies like an arrow. {Noun,Pres,Prep,Det,Noun}
Turn right at the light. {Imperative,Adv,Prep,Det,Noun}
She has a right to vote. {Pronoun,Vb,Det,Noun,.,Inf}
Come back soon. {.,.,Adv}
I second the motion. {Pronoun,Inf,Det,Noun}
Will will pay. {Person,Modal,Inf}
An august body {Det,Adj,Noun}
Apple makes apple pie. {Org,Pres,Noun,Noun}
I know that dogs bark. {Pronoun,Inf,Conj,Plural,Inf}
In the fall, leaves fall. {Prep,Det,Noun,Plural,Inf}
The sun set. {Det,Noun,Past}
She is 30 years old. {Pronoun,Copula,Val,Unit,Unit} # 'years old' is a multi-word unit
Every day walk to school. {Det,Noun,Vb,Prep,Noun}
the spending reductions that it mandates are big {Det,.,Plural,.,Pronoun,Pres,Copula,Adj}
I know that helps. {Pronoun,Inf,.,Pres}
I think that works. {Pronoun,Inf,.,Pres}
I was born in 1985. {Pronoun,Copula,Past,Prep,Date}
He was born yesterday. {Pronoun,Copula,Past,Date}
They put it down yesterday. {Pronoun,Past,Pronoun,.,Date}
He cut the cake yesterday. {Pronoun,Past,Det,Noun,Date}
We set the table last night. {Pronoun,Past,Det,Noun,.,.}
Swimming pools are closed. {Noun,Plural,Copula,.}
I have lived here since 2010. {Pronoun,Aux,Past,.,Prep,Date}
`

test(here, t => {
  assertSpec(t, spec, here)
  t.end()
})
