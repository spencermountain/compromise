import test from 'tape'
import assertSpec from '../_spec.js'
const here = '[two/output/spec-switches] '

const spec = `
# Actor|Verb candidates; plural forms also need Plural|Verb membership.
They author the report. {Noun,Vb,Det,Noun}
The author is famous. {Det,Actor,Vb,Adj}
She authors the report. {Noun,Vb,Det,Noun}
The authors are famous. {Det,Actor,Vb,Adj}
They mentor young students. {Noun,Vb,Adj,Noun}
The mentor is helpful. {Det,Actor,Vb,Adj}
She mentors young students. {Noun,Vb,Adj,Noun}
The mentors are helpful. {Det,Actor,Vb,Adj}
They tutor young students. {Noun,Vb,Adj,Noun}
The tutor is helpful. {Det,Actor,Vb,Adj}
She tutors young students. {Noun,Vb,Adj,Noun}
The tutors are helpful. {Det,Actor,Vb,Adj}
They partner with schools. {Noun,Vb,Prep,Noun}
The partner is helpful. {Det,Actor,Vb,Adj}
She partners with schools. {Noun,Vb,Prep,Noun}
The partners are helpful. {Det,Actor,Vb,Adj}

# Distributive each must not hide a preceding subject from switch clues.
We each pay rent. {Noun,Det,Vb,Noun}
They each book rooms. {Noun,Det,Vb,Noun}
They each own a car. {Noun,Det,Vb,Det,Noun}
Each work permit expired. {Det,Noun,Noun,Vb}
Each book costs money. {Det,Noun,Vb,Noun}

# rival needs a noun reading as well as its adjective and verb uses.
Their rival is strong. {Poss,Noun,Vb,Adj}
Our rival won. {Poss,Noun,Vb}
The rival team won. {Det,Adj,Noun,Vb}
They rival the best teams. {Noun,Vb,Det,Adj,Noun}

# Distributive each controls
Each pay rise helps {Det,Noun,Noun,Pres}
Each small pay rise helps {Det,Adj,Noun,Noun,Pres}
Each bus stop serves the town {Det,Noun,Noun,Pres,Det,Noun}
Each book covers three topics {Det,Noun,Pres,Value,Plural}
Each bus stop {Det,Noun,Noun}


# switch candidates spec
# pressure: missing Noun|Verb membership
They pressure the officials. {Noun,Vb,Det,Noun}
The pressure is high. {Det,Noun,Vb,Adj}
She pressures the officials. {Noun,Vb,Det,Noun}
The pressures are high. {Det,Noun,Vb,Adj}
They pressured the officials. {Noun,Vb,Det,Noun}
They are pressuring the officials. {Noun,Vb,Vb,Det,Noun}

# bill: Person|Noun currently excludes the everyday verb reading
They bill the customer. {Noun,Vb,Det,Noun}
The bill is overdue. {Det,Noun,Vb,Adj}
She bills the customer. {Noun,Vb,Det,Noun}
The bills are overdue. {Det,Noun,Vb,Adj}
They billed the customer. {Noun,Vb,Det,Noun}
They are billing the customer. {Noun,Vb,Vb,Det,Noun}
Bill paid the customer. {Person,Vb,Det,Noun}

# dim, captain, pioneer and inventory switches spec
# Adj|Present
They dim the lights. {Noun,Vb,Det,Noun}
The lights are dim. {Det,Noun,Vb,Adj}
# Actor|Verb
They captain the team. {Noun,Vb,Det,Noun}
The captain is tired. {Det,Actor,Vb,Adj}
They pioneer new methods. {Noun,Vb,Adj,Noun}
The pioneer is famous. {Det,Actor,Vb,Adj}
# Noun|Verb
They inventory the supplies. {Noun,Vb,Det,Noun}
The inventory is complete. {Det,Noun,Vb,Adj}

# adjective and verb switches spec
They average ten points. {Noun,Vb,Val,Noun}
The average is high. {Det,Noun,Vb,Adj}
The score is average. {Det,Noun,Vb,Adj}
They round the corner. {Noun,Vb,Det,Noun}
The table is round. {Det,Noun,Vb,Adj}
The round is over. {Det,Noun,Vb,Adj}
They ready the boat. {Noun,Vb,Det,Noun}
The boat is ready. {Det,Noun,Vb,Adj}

# inconvenience, disadvantage and content switches spec
They inconvenience the passengers. {Noun,Vb,Det,Noun}
The inconvenience is minor. {Det,Noun,Vb,Adj}
They disadvantage smaller companies. {Noun,Vb,Adj,Noun}
The disadvantage is clear. {Det,Noun,Vb,Adj}
They content themselves. {Noun,Vb,Noun}
The children are content. {Det,Noun,Vb,Adj}
The content is useful. {Det,Noun,Vb,Adj}

# motion, petition and vacation switches spec
They motion toward the door. {Noun,Vb,Prep,Det,Noun}
The motion was smooth. {Det,Noun,Vb,Adj}
They petition the council. {Noun,Vb,Det,Noun}
The petition is popular. {Det,Noun,Vb,Adj}
They vacation in France. {Noun,Vb,Prep,Noun}
The vacation was short. {Det,Noun,Vb,Adj}

# number, fine and square switches spec
They number the pages. {Noun,Vb,Det,Noun}
The number is wrong. {Det,Noun,Vb,Adj}
They fine the driver. {Noun,Vb,Det,Noun}
The driver is fine. {Det,Noun,Vb,Adj}
The fine is large. {Det,Noun,Vb,Adj}
They square the number. {Noun,Vb,Det,Noun}
The room is square. {Det,Noun,Vb,Adj}
The square is large. {Det,Noun,Vb,Adj}

# quiz, alert and sanction switches spec
They quiz the students. {Noun,Vb,Det,Noun}
The quiz was difficult. {Det,Noun,Vb,Adj}
They alert the staff. {Noun,Vb,Det,Noun}
The staff are alert. {Det,Noun,Vb,Adj}
The alert was useful. {Det,Noun,Vb,Adj}
They sanction the deal. {Noun,Vb,Det,Noun}
The sanction is severe. {Det,Noun,Vb,Adj}

# sequence, parallel and shepherd switches spec
# Noun|Verb
They sequence the genes. {Noun,Vb,Det,Noun}
The sequence is clear. {Det,Noun,Vb,Adj}
# Adj|Present
They parallel the road. {Noun,Vb,Det,Noun}
The roads are parallel. {Det,Noun,Vb,Adj}
The parallel is clear. {Det,Noun,Vb,Adj}
# Actor|Verb
They shepherd the children. {Noun,Vb,Det,Noun}
The shepherd is tired. {Det,Actor,Vb,Adj}

# tense, bare and brave switches spec
They tense their muscles. {Noun,Vb,Poss,Noun}
The atmosphere is tense. {Det,Noun,Vb,Adj}
The tense is wrong. {Det,Noun,Vb,Adj}
They bare their teeth. {Noun,Vb,Poss,Noun}
The walls are bare. {Det,Noun,Vb,Adj}
They brave the cold. {Noun,Vb,Det,Noun}
The children are brave. {Det,Noun,Vb,Adj}

# actor plurals and bus switches spec
She pilots the plane. {Noun,Vb,Det,Noun}
The pilots are tired. {Det,Actor,Vb,Adj}
She hosts the party. {Noun,Vb,Det,Noun}
The hosts are friendly. {Det,Actor,Vb,Adj}
She witnesses the event. {Noun,Vb,Det,Noun}
The witnesses are reliable. {Det,Actor,Vb,Adj}
They bus the children to school. {Noun,Vb,Det,Noun,Prep,Noun}
The bus is late. {Det,Noun,Vb,Adj}

# parents, champions, recruits and graduates switches spec
She parents the children. {Noun,Vb,Det,Noun}
The parents are helpful. {Det,Actor,Vb,Adj}
She champions the cause. {Noun,Vb,Det,Noun}
The champions are famous. {Det,Actor,Vb,Adj}
She recruits new staff. {Noun,Vb,Adj,Noun}
The recruits are young. {Det,Actor,Vb,Adj}
She graduates this year. {Noun,Vb,Det,Noun}
The graduates are young. {Det,Actor,Vb,Adj}

# doctors, grooms, coaches and judges switches spec
She doctors the records. {Noun,Vb,Det,Noun}
The doctors are helpful. {Det,Actor,Vb,Adj}
She grooms the dogs. {Noun,Vb,Det,Noun}
The grooms are nervous. {Det,Actor,Vb,Adj}
She coaches the team. {Noun,Vb,Det,Noun}
The coaches are helpful. {Det,Actor,Vb,Adj}
She judges the contest. {Noun,Vb,Det,Noun}
The judges are fair. {Det,Actor,Vb,Adj}

# cooks, engineers, guides and volunteers
She cooks the food. {Noun,Vb,Det,Noun}
The cooks are helpful. {Det,Actor,Vb,Adj}
She engineers the solution. {Noun,Vb,Det,Noun}
The engineers are helpful. {Det,Actor,Vb,Adj}
She guides the visitors. {Noun,Vb,Det,Noun}
The guides are helpful. {Det,Actor,Vb,Adj}
She volunteers at schools. {Noun,Vb,Prep,Noun}
The volunteers are helpful. {Det,Actor,Vb,Adj}

# Plural actor switches: preserve the noun subtype and the verb reading
She scouts the area. {Noun,Vb,Det,Noun}
The scouts are helpful. {Det,Actor,Vb,Adj}
She ushers the guests. {Noun,Vb,Det,Noun}
The ushers are helpful. {Det,Actor,Vb,Adj}
She bullies the children. {Noun,Vb,Det,Noun}
The bullies are cruel. {Det,Actor,Vb,Adj}
She fools the audience. {Noun,Vb,Det,Noun}
The fools are loud. {Det,Actor,Vb,Adj}
`

test(here, t => {
  assertSpec(t, spec, here)
  t.end()
})
