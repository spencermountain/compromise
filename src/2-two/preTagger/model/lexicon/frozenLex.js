import { SportsTeam, Expr, Org, Actor, Sing, Uncountable, Inf, Pers, Adj, Prop, Country, Region, Place, Adv, Conj, Plur, Past, Pres, Ger, Participle, NN, Unit } from '../../tagSet/_lib.js'

// [[tag, 'phrase,phrase'], ...] -> { phrase: tag }
const expand = pairs => {
  const lex = {}
  pairs.forEach(([tag, phrases]) => {
    phrases.split(',').forEach(phrase => {
      lex[phrase] = tag
    })
  })
  return lex
}

// These phrases also seed the regular lexicon and its derived forms, at load-time.
// data/lexicon/index.js keeps them unique: edit their tags here only.
export const shared = expand([
  ['Honorific', 'first lieutenant,second lieutenant,third lieutenant'],
  [SportsTeam, 'atlanta united,dc united,minnesota united,manchester united,newcastle united,sheffield united'],
  [Expr, 'excuse me'],
  [Org, 'financial times,guns n roses,la z boy,labour party,new kids on the block,new york times,the guess who,thin lizzy'],
  [Actor, 'prime minister'],
  [Sing, 'free market,lay up,spin off'],
  [Uncountable, 'appeal court,cold war,gene pool,machine learning,nail polish,time off'],
  [Inf, 'take part'],
  [Pers, 'bill gates,doctor who,he man,iron man,kid cudi,run dmc,rush limbaugh,snow white,tiger woods'],
  [Adj, 'brand new,en route,left wing,off guard,on board,part time,right wing,so called,spot on,straight forward,super duper,tip top,top notch,up to date,win win'],
  [SportsTeam, 'brooklyn nets,chicago bears,houston astros,houston dynamo,houston rockets,houston texans,minnesota twins,orlando magic,san antonio spurs,san diego chargers,san diego padres'],
  [Prop, 'iron maiden'],
  [Country, 'isle of man,united states,united states of america'],
  [Region, 'prince edward island'],
  [Place, 'cedar breaks,cedar falls'],
  [Adv, 'point blank,tiny bit'],
  [Conj, 'by the time,no matter'],
])

// Frozen-only entries protect phrases without seeding additional derivations.
export default {
  ...shared,
  ...expand([
    [Org, '20th century fox,7 eleven,motel 6'],
    [Sing, 'living room'],
    [Plur, 'living rooms'],
    [Pers, 'dr who'],
    [Plur, 'civil wars,credit cards,default rates,free markets,head starts,home runs,lay ups,phone calls,press releases,record labels,soft serves,student loans,tax returns,tv shows,video games'],
    [Past, 'took part'],
    [Pres, 'takes part'],
    [Ger, 'taking part'],
    [Participle, 'taken part'],
    [NN, 'light bulb,rush hour'],
    [Unit, 'fluid ounce'],
    // keep mcdonalds out of the mcd- surname regex
    [Org, 'the rolling stones,mcdonalds'],
  ]),
}
