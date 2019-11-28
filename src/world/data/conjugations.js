// a list of irregular verb conjugations
// used in verbs().conjugate()
// but also added to our lexicon

//use shorter key-names
const mapping = {
  g: 'Gerund',
  prt: 'Participle',
  perf: 'PerfectTense',
  pst: 'PastTense',
  fut: 'FuturePerfect',
  pres: 'PresentTense',
  pluperf: 'Pluperfect',
  a: 'Actor',
}

// '_' in conjugations is the infinitive form
let conjugations = {
  act: {
    a: '_or',
  },
  age: {
    g: 'ageing',
    pst: 'aged',
    pres: 'ages',
  },
  aim: {
    a: '_er',
    g: '_ing',
    pst: '_ed',
  },
  arise: {
    prt: '_n',
    pst: 'arose',
  },
  babysit: {
    a: '_ter',
    pst: 'babysat',
  },
  ban: {
    a: '',
    g: '_ning',
    pst: '_ned',
  },
  be: {
    a: '',
    g: 'am',
    prt: 'been',
    pst: 'was',
    pres: 'is',
  },
  beat: {
    a: '_er',
    g: '_ing',
    prt: '_en',
  },
  become: {
    prt: '_',
  },
  begin: {
    g: '_ning',
    prt: 'begun',
    pst: 'began',
  },
  being: {
    g: 'are',
    pst: 'were',
    pres: 'are',
  },
  bend: {
    prt: 'bent',
  },
  bet: {
    a: '_ter',
    prt: '_',
  },
  bind: {
    pst: 'bound',
  },
  bite: {
    g: 'biting',
    prt: 'bitten',
    pst: 'bit',
  },
  bleed: {
    prt: 'bled',
    pst: 'bled',
  },
  blow: {
    prt: '_n',
    pst: 'blew',
  },
  boil: {
    a: '_er',
  },
  brake: {
    prt: 'broken',
  },
  break: {
    pst: 'broke',
  },
  breed: {
    pst: 'bred',
  },
  bring: {
    prt: 'brought',
    pst: 'brought',
  },
  broadcast: {
    pst: '_',
  },
  budget: {
    pst: '_ed',
  },
  build: {
    prt: 'built',
    pst: 'built',
  },
  burn: {
    prt: '_ed',
  },
  burst: {
    prt: '_',
  },
  buy: {
    prt: 'bought',
    pst: 'bought',
  },
  can: {
    a: '',
    fut: '_',
    g: '',
    pst: 'could',
    perf: 'could',
    pluperf: 'could',
    pres: '_',
  },
  catch: {
    pst: 'caught',
  },
  choose: {
    g: 'choosing',
    prt: 'chosen',
    pst: 'chose',
  },
  cling: {
    prt: 'clung',
  },
  come: {
    prt: '_',
    pst: 'came',
  },
  compete: {
    a: 'competitor',
    g: 'competing',
    pst: '_d',
  },
  cost: {
    pst: '_',
  },
  creep: {
    prt: 'crept',
  },
  cut: {
    prt: '_',
  },
  deal: {
    prt: '_t',
    pst: '_t',
  },
  develop: {
    a: '_er',
    g: '_ing',
    pst: '_ed',
  },
  die: {
    g: 'dying',
    pst: '_d',
  },
  dig: {
    g: '_ging',
    prt: 'dug',
    pst: 'dug',
  },
  dive: {
    prt: '_d',
  },
  do: {
    pst: 'did',
    pres: '_es',
  },
  draw: {
    prt: '_n',
    pst: 'drew',
  },
  dream: {
    prt: '_t',
  },
  drink: {
    prt: 'drunk',
    pst: 'drank',
  },
  drive: {
    g: 'driving',
    prt: '_n',
    pst: 'drove',
  },
  drop: {
    g: '_ping',
    pst: '_ped',
  },
  eat: {
    a: '_er',
    g: '_ing',
    prt: '_en',
    pst: 'ate',
  },
  edit: {
    g: '_ing',
  },
  egg: {
    pst: '_ed',
  },
  fall: {
    prt: '_en',
    pst: 'fell',
  },
  feed: {
    prt: 'fed',
    pst: 'fed',
  },
  feel: {
    a: '_er',
    pst: 'felt',
  },
  fight: {
    prt: 'fought',
    pst: 'fought',
  },
  find: {
    pst: 'found',
  },
  flee: {
    g: '_ing',
    prt: 'fled',
  },
  fling: {
    prt: 'flung',
  },
  fly: {
    prt: 'flown',
    pst: 'flew',
  },
  forbid: {
    pst: 'forbade',
  },
  forget: {
    g: '_ing',
    prt: 'forgotten',
    pst: 'forgot',
  },
  forgive: {
    g: 'forgiving',
    prt: '_n',
    pst: 'forgave',
  },
  free: {
    a: '',
    g: '_ing',
  },
  freeze: {
    g: 'freezing',
    prt: 'frozen',
    pst: 'froze',
  },
  get: {
    pst: 'got',
    prt: 'gotten',
  },
  give: {
    g: 'giving',
    prt: '_n',
    pst: 'gave',
  },
  go: {
    prt: '_ne',
    pst: 'went',
    pres: 'goes',
  },
  grow: {
    prt: '_n',
  },
  hang: {
    prt: 'hung',
    pst: 'hung',
  },
  have: {
    g: 'having',
    prt: 'had',
    pst: 'had',
    pres: 'has',
  },
  hear: {
    prt: '_d',
    pst: '_d',
  },
  hide: {
    prt: 'hidden',
    pst: 'hid',
  },
  hit: {
    prt: '_',
  },
  hold: {
    prt: 'held',
    pst: 'held',
  },
  hurt: {
    prt: '_',
    pst: '_',
  },
  ice: {
    g: 'icing',
    pst: '_d',
  },
  imply: {
    pst: 'implied',
    pres: 'implies',
  },
  is: {
    a: '',
    g: 'being',
    pst: 'was',
    pres: '_',
  },
  keep: {
    prt: 'kept',
  },
  kneel: {
    prt: 'knelt',
  },
  know: {
    prt: '_n',
  },
  lay: {
    prt: 'laid',
    pst: 'laid',
  },
  lead: {
    prt: 'led',
    pst: 'led',
  },
  leap: {
    prt: '_t',
  },
  leave: {
    prt: 'left',
    pst: 'left',
  },
  lend: {
    prt: 'lent',
  },
  lie: {
    g: 'lying',
    pst: 'lay',
  },
  light: {
    prt: 'lit',
    pst: 'lit',
  },
  log: {
    g: '_ging',
    pst: '_ged',
  },
  loose: {
    prt: 'lost',
  },
  lose: {
    g: 'losing',
    pst: 'lost',
  },
  make: {
    prt: 'made',
    pst: 'made',
  },
  mean: {
    prt: '_t',
    pst: '_t',
  },
  meet: {
    a: '_er',
    g: '_ing',
    prt: 'met',
    pst: 'met',
  },
  miss: {
    pres: '_',
  },
  pay: {
    prt: 'paid',
    pst: 'paid',
  },
  prove: {
    prt: '_n',
  },
  puke: {
    g: 'puking',
  },
  put: {
    prt: '_',
  },
  quit: {
    prt: '_',
  },
  read: {
    prt: '_',
    pst: '_',
  },
  ride: {
    prt: 'ridden',
  },
  ring: {
    prt: 'rung',
    pst: 'rang',
  },
  rise: {
    fut: 'will have _n',
    g: 'rising',
    prt: '_n',
    pst: 'rose',
    pluperf: 'had _n',
  },
  rub: {
    g: '_bing',
    pst: '_bed',
  },
  run: {
    g: '_ning',
    prt: '_',
    pst: 'ran',
  },
  say: {
    prt: 'said',
    pst: 'said',
    pres: '_s',
  },
  seat: {
    prt: 'sat',
  },
  see: {
    g: '_ing',
    prt: '_n',
    pst: 'saw',
  },
  seek: {
    prt: 'sought',
  },
  sell: {
    prt: 'sold',
    pst: 'sold',
  },
  send: {
    prt: 'sent',
  },
  set: {
    prt: '_',
  },
  sew: {
    prt: '_n',
  },
  shake: {
    prt: '_n',
  },
  shave: {
    prt: '_d',
  },
  shed: {
    g: '_ding',
    pst: '_',
    pres: '_s',
  },
  shine: {
    prt: 'shone',
    pst: 'shone',
  },
  shoot: {
    prt: 'shot',
    pst: 'shot',
  },
  show: {
    pst: '_ed',
  },
  shut: {
    prt: '_',
  },
  sing: {
    prt: 'sung',
    pst: 'sang',
  },
  sink: {
    pst: 'sank',
    pluperf: 'had sunk',
  },
  sit: {
    pst: 'sat',
  },
  ski: {
    pst: '_ied',
  },
  slay: {
    prt: 'slain',
  },
  sleep: {
    prt: 'slept',
  },
  slide: {
    prt: 'slid',
    pst: 'slid',
  },
  smash: {
    pres: '_es',
  },
  sneak: {
    prt: 'snuck',
  },
  speak: {
    fut: 'will have spoken',
    prt: 'spoken',
    pst: 'spoke',
    perf: 'have spoken',
    pluperf: 'had spoken',
  },
  speed: {
    prt: 'sped',
  },
  spend: {
    prt: 'spent',
  },
  spill: {
    prt: '_ed',
    pst: 'spilt',
  },
  spin: {
    g: '_ning',
    prt: 'spun',
    pst: 'spun',
  },
  spit: {
    prt: 'spat',
  },
  split: {
    prt: '_',
  },
  spread: {
    pst: '_',
  },
  spring: {
    prt: 'sprung',
  },
  stand: {
    pst: 'stood',
  },
  steal: {
    a: '_er',
    pst: 'stole',
  },
  stick: {
    pst: 'stuck',
  },
  sting: {
    pst: 'stung',
  },
  stink: {
    prt: 'stunk',
    pst: 'stunk',
  },
  stream: {
    a: '_er',
  },
  strew: {
    prt: '_n',
  },
  strike: {
    g: 'striking',
    pst: 'struck',
  },
  suit: {
    a: '_er',
    g: '_ing',
    pst: '_ed',
  },
  sware: {
    prt: 'sworn',
  },
  swear: {
    pst: 'swore',
  },
  sweep: {
    prt: 'swept',
  },
  swim: {
    g: '_ming',
    pst: 'swam',
  },
  swing: {
    pst: 'swung',
  },
  take: {
    fut: 'will have _n',
    pst: 'took',
    perf: 'have _n',
    pluperf: 'had _n',
  },
  teach: {
    pst: 'taught',
    pres: '_es',
  },
  tear: {
    pst: 'tore',
  },
  tell: {
    pst: 'told',
  },
  think: {
    pst: 'thought',
  },
  thrive: {
    prt: '_d',
  },
  tie: {
    g: 'tying',
    pst: '_d',
  },
  undergo: {
    prt: '_ne',
  },
  understand: {
    pst: 'understood',
  },
  upset: {
    prt: '_',
  },
  wait: {
    a: '_er',
    g: '_ing',
    pst: '_ed',
  },
  wake: {
    pst: 'woke',
  },
  wear: {
    pst: 'wore',
  },
  weave: {
    prt: 'woven',
  },
  weep: {
    prt: 'wept',
  },
  win: {
    g: '_ning',
    pst: 'won',
  },
  wind: {
    prt: 'wound',
  },
  withdraw: {
    pst: 'withdrew',
  },
  wring: {
    prt: 'wrung',
  },
  write: {
    g: 'writing',
    prt: 'written',
    pst: 'wrote',
  },
}

//uncompress our ad-hoc compression scheme
let keys = Object.keys(conjugations)
for (let i = 0; i < keys.length; i++) {
  const inf = keys[i]
  let final = {}
  Object.keys(conjugations[inf]).forEach(key => {
    let str = conjugations[inf][key]
    //swap-in infinitives for '_'
    str = str.replace('_', inf)

    let full = mapping[key]
    final[full] = str
  })
  //over-write original
  conjugations[inf] = final
}

module.exports = conjugations
