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
// (order matters, to the lexicon)
let conjugations = {
  act: {
    a: '_or',
  },
  ache: {
    pst: 'ached',
    g: 'aching',
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
    pst: 'bled',
    prt: 'bled',
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
    pst: 'brought',
    prt: 'brought',
  },
  broadcast: {
    pst: '_',
  },
  budget: {
    pst: '_ed',
  },
  build: {
    pst: 'built',
    prt: 'built',
  },
  burn: {
    prt: '_ed',
  },
  burst: {
    prt: '_',
  },
  buy: {
    pst: 'bought',
    prt: 'bought',
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
    g: 'coming',
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
    pst: '_t',
    prt: '_t',
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
    pst: 'dug',
    prt: 'dug',
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
    pst: '_ed',
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
    pst: 'fought',
    prt: 'fought',
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
    pst: 'hung',
    prt: 'hung',
  },
  have: {
    g: 'having',
    pst: 'had',
    prt: 'had',
    pres: 'has',
  },
  hear: {
    pst: '_d',
    prt: '_d',
  },
  hide: {
    prt: 'hidden',
    pst: 'hid',
  },
  hit: {
    prt: '_',
  },
  hold: {
    pst: 'held',
    prt: 'held',
  },
  hurt: {
    pst: '_',
    prt: '_',
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
    pst: 'laid',
    prt: 'laid',
  },
  lead: {
    pst: 'led',
    prt: 'led',
  },
  leap: {
    prt: '_t',
  },
  leave: {
    pst: 'left',
    prt: 'left',
  },
  lend: {
    prt: 'lent',
  },
  lie: {
    g: 'lying',
    pst: 'lay',
  },
  light: {
    pst: 'lit',
    prt: 'lit',
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
    pst: 'made',
    prt: 'made',
  },
  mean: {
    pst: '_t',
    prt: '_t',
  },
  meet: {
    a: '_er',
    g: '_ing',
    pst: 'met',
    prt: 'met',
  },
  miss: {
    pres: '_',
  },
  name: {
    g: 'naming',
  },
  pay: {
    pst: 'paid',
    prt: 'paid',
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
    pst: '_',
    prt: '_',
  },
  ride: {
    prt: 'ridden',
  },
  ring: {
    pst: 'rang',
    prt: 'rung',
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
    pst: 'said',
    prt: 'said',
    pres: '_s',
  },
  seat: {
    pst: 'sat',
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
    pst: 'sold',
    prt: 'sold',
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
    pst: 'shone',
    prt: 'shone',
  },
  shoot: {
    pst: 'shot',
    prt: 'shot',
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
    pst: 'slid',
    prt: 'slid',
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
    pst: 'spun',
    prt: 'spun',
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
    pst: 'stunk',
    prt: 'stunk',
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
  wed: {
    pst: 'wed',
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
