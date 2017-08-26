//sorry for the ad-hoc, space-saver key-mapping
const mapping = {
  ps: 'PastTense',
  pr: 'PresentTense',
  pe: 'PerfectTense',
  pa: 'Participle',
  pl: 'PluPerfectTense',
  ft: 'FuturePerfect',
  ac: 'Actor',
  g: 'Gerund'
}
let irreg = {
  take: {
    pe: 'have taken',
    pl: 'had taken',
    ps: 'took',
    ft: 'will have taken'
  },
  can: {
    g: '',
    pr: 'can',
    ps: 'could',
    pe: 'could',
    pl: 'could',
    ft: 'can',
    ac: ''
  },
  free: {
    g: 'freeing',
    ac: ''
  },
  puke: {
    g: 'puking'
  },
  arise: {
    ps: 'arose',
    pa: 'arisen'
  },
  babysit: {
    ps: 'babysat',
    ac: 'babysitter'
  },
  be: {
    ps: 'was',
    pa: 'been',
    pr: 'is',
    ac: '',
    g: 'am'
  },
  is: {
    ps: 'was',
    pr: 'is',
    ac: '',
    g: 'being'
  },
  beat: {
    g: 'beating',
    ac: 'beater',
    pa: 'beaten'
  },
  begin: {
    g: 'beginning',
    ps: 'began',
    pa: 'begun'
  },
  ban: {
    ps: 'banned',
    g: 'banning',
    ac: ''
  },
  bet: {
    ac: 'better',
    pa: 'bet'
  },
  bite: {
    g: 'biting',
    ps: 'bit',
    pa: 'bitten'
  },
  bleed: {
    ps: 'bled',
    pa: 'bled'
  },
  breed: {
    ps: 'bred'
  },
  bring: {
    ps: 'brought',
    pa: 'brought'
  },
  broadcast: {
    ps: 'broadcast'
  },
  build: {
    ps: 'built',
    pa: 'built'
  },
  buy: {
    ps: 'bought',
    pa: 'bought'
  },
  choose: {
    g: 'choosing',
    ps: 'chose',
    pa: 'chosen'
  },
  cost: {
    ps: 'cost'
  },
  deal: {
    ps: 'dealt',
    pa: 'dealt'
  },
  die: {
    ps: 'died',
    g: 'dying'
  },
  dig: {
    g: 'digging',
    ps: 'dug',
    pa: 'dug'
  },
  draw: {
    ps: 'drew',
    pa: 'drawn'
  },
  drink: {
    ps: 'drank',
    pa: 'drunk'
  },
  drive: {
    g: 'driving',
    ps: 'drove',
    pa: 'driven'
  },
  eat: {
    g: 'eating',
    ps: 'ate',
    ac: 'eater',
    pa: 'eaten'
  },
  fall: {
    ps: 'fell',
    pa: 'fallen'
  },
  feed: {
    ps: 'fed',
    pa: 'fed'
  },
  feel: {
    ps: 'felt',
    ac: 'feeler'
  },
  fight: {
    ps: 'fought',
    pa: 'fought'
  },
  find: {
    ps: 'found'
  },
  fly: {
    ps: 'flew',
    pa: 'flown'
  },
  blow: {
    ps: 'blew',
    pa: 'blown'
  },
  forbid: {
    ps: 'forbade'
  },
  forget: {
    g: 'forgeting',
    ps: 'forgot',
    pa: 'forgotten'
  },
  forgive: {
    g: 'forgiving',
    ps: 'forgave',
    pa: 'forgiven'
  },
  freeze: {
    g: 'freezing',
    ps: 'froze',
    pa: 'frozen'
  },
  get: {
    ps: 'got'
  },
  give: {
    g: 'giving',
    ps: 'gave',
    pa: 'given'
  },
  go: {
    ps: 'went',
    pr: 'goes',
    pa: 'gone'
  },
  hang: {
    ps: 'hung',
    pa: 'hung'
  },
  have: {
    g: 'having',
    ps: 'had',
    pr: 'has',
    pa: 'had'
  },
  hear: {
    ps: 'heard',
    pa: 'heard'
  },
  hide: {
    ps: 'hid',
    pa: 'hidden'
  },
  hold: {
    ps: 'held',
    pa: 'held'
  },
  hurt: {
    ps: 'hurt',
    pa: 'hurt'
  },
  lay: {
    ps: 'laid',
    pa: 'laid'
  },
  lead: {
    ps: 'led',
    pa: 'led'
  },
  leave: {
    ps: 'left',
    pa: 'left'
  },
  lie: {
    g: 'lying',
    ps: 'lay'
  },
  light: {
    ps: 'lit',
    pa: 'lit'
  },
  lose: {
    g: 'losing',
    ps: 'lost'
  },
  make: {
    ps: 'made',
    pa: 'made'
  },
  mean: {
    ps: 'meant',
    pa: 'meant'
  },
  meet: {
    g: 'meeting',
    ps: 'met',
    ac: 'meeter',
    pa: 'met'
  },
  pay: {
    ps: 'paid',
    pa: 'paid'
  },
  read: {
    ps: 'read',
    pa: 'read'
  },
  ring: {
    ps: 'rang',
    pa: 'rung'
  },
  rise: {
    ps: 'rose',
    g: 'rising',
    pl: 'had risen',
    ft: 'will have risen',
    pa: 'risen'
  },
  run: {
    g: 'running',
    ps: 'ran',
    pa: 'run'
  },
  say: {
    ps: 'said',
    pa: 'said',
    pr: 'says'
  },
  see: {
    ps: 'saw',
    pa: 'seen'
  },
  sell: {
    ps: 'sold',
    pa: 'sold'
  },
  shine: {
    ps: 'shone',
    pa: 'shone'
  },
  shoot: {
    ps: 'shot',
    pa: 'shot'
  },
  show: {
    ps: 'showed'
  },
  sing: {
    ps: 'sang',
    pa: 'sung'
  },
  sink: {
    ps: 'sank',
    pl: 'had sunk'
  },
  sit: {
    ps: 'sat'
  },
  slide: {
    ps: 'slid',
    pa: 'slid'
  },
  speak: {
    ps: 'spoke',
    pe: 'have spoken',
    pl: 'had spoken',
    ft: 'will have spoken',
    pa: 'spoken'
  },
  spin: {
    g: 'spinning',
    ps: 'spun',
    pa: 'spun'
  },
  stand: {
    ps: 'stood'
  },
  steal: {
    ps: 'stole',
    ac: 'stealer'
  },
  stick: {
    ps: 'stuck'
  },
  sting: {
    ps: 'stung'
  },
  stream: {
    ac: 'streamer'
  },
  strike: {
    g: 'striking',
    ps: 'struck'
  },
  swear: {
    ps: 'swore'
  },
  swim: {
    ps: 'swam',
    g: 'swimming'
  },
  swing: {
    ps: 'swung'
  },
  teach: {
    ps: 'taught',
    pr: 'teaches'
  },
  tear: {
    ps: 'tore'
  },
  tell: {
    ps: 'told'
  },
  think: {
    ps: 'thought'
  },
  understand: {
    ps: 'understood'
  },
  wake: {
    ps: 'woke'
  },
  wear: {
    ps: 'wore'
  },
  win: {
    g: 'winning',
    ps: 'won'
  },
  withdraw: {
    ps: 'withdrew'
  },
  write: {
    g: 'writing',
    ps: 'wrote',
    pa: 'written'
  },
  tie: {
    g: 'tying',
    ps: 'tied'
  },
  ski: {
    ps: 'skiied'
  },
  boil: {
    ac: 'boiler'
  },
  miss: {
    pr: 'miss'
  },
  act: {
    ac: 'ac'
  },
  compete: {
    g: 'competing',
    ps: 'competed',
    ac: 'competitor'
  },
  being: {
    g: 'are',
    ps: 'were',
    pr: 'are'
  },
  imply: {
    ps: 'implied',
    pr: 'implies'
  },
  ice: {
    g: 'icing',
    ps: 'iced'
  },
  develop: {
    ps: 'developed',
    ac: 'developer',
    g: 'developing'
  },
  wait: {
    g: 'waiting',
    ps: 'waited',
    ac: 'waiter'
  },
  aim: {
    ac: 'aimer',
    g: 'aiming',
    ps: 'aimed'
  },
  spill: {
    ps: 'spilt',
    pa: 'spilled'
  },
  drop: {
    g: 'dropping',
    ps: 'dropped'
  },
  log: {
    g: 'logging',
    ps: 'logged'
  },
  rub: {
    g: 'rubbing',
    ps: 'rubbed'
  },
  smash: {
    pr: 'smashes'
  },
  egg: {
    ps: 'egged'
  },
  suit: {
    g: 'suiting',
    ps: 'suited',
    ac: 'suiter'
  },
  age: {
    pr: 'ages',
    ps: 'aged',
    g: 'ageing'
  },
  shed: {
    pr: 'sheds',
    ps: 'shed',
    g: 'shedding'
  },
  break: {
    ps: 'broke'
  },
  catch: {
    ps: 'caught'
  },
  do: {
    ps: 'did',
    pr: 'does'
  },
  bind: {
    ps: 'bound'
  },
  spread: {
    ps: 'spread'
  },
  become: {
    pa: 'become'
  },
  bend: {
    pa: 'bent'
  },
  brake: {
    pa: 'broken'
  },
  burn: {
    pa: 'burned'
  },
  burst: {
    pa: 'burst'
  },
  cling: {
    pa: 'clung'
  },
  come: {
    pa: 'come'
  },
  creep: {
    pa: 'crept'
  },
  cut: {
    pa: 'cut'
  },
  dive: {
    pa: 'dived'
  },
  dream: {
    pa: 'dreamt'
  },
  flee: {
    pa: 'fled'
  },
  fling: {
    pa: 'flung'
  },
  got: {
    pa: 'gotten'
  },
  grow: {
    pa: 'grown'
  },
  hit: {
    pa: 'hit'
  },
  keep: {
    pa: 'kept'
  },
  kneel: {
    pa: 'knelt'
  },
  know: {
    pa: 'known'
  },
  leap: {
    pa: 'leapt'
  },
  lend: {
    pa: 'lent'
  },
  loose: {
    pa: 'lost'
  },
  prove: {
    pa: 'proven'
  },
  put: {
    pa: 'put'
  },
  quit: {
    pa: 'quit'
  },
  ride: {
    pa: 'ridden'
  },
  seek: {
    pa: 'sought'
  },
  send: {
    pa: 'sent'
  },
  set: {
    pa: 'set'
  },
  sew: {
    pa: 'sewn'
  },
  shake: {
    pa: 'shaken'
  },
  shave: {
    pa: 'shaved'
  },
  shut: {
    pa: 'shut'
  },
  seat: {
    pa: 'sat'
  },
  slay: {
    pa: 'slain'
  },
  sleep: {
    pa: 'slept'
  },
  sneak: {
    pa: 'snuck'
  },
  speed: {
    pa: 'sped'
  },
  spend: {
    pa: 'spent'
  },
  spit: {
    pa: 'spat'
  },
  split: {
    pa: 'split'
  },
  spring: {
    pa: 'sprung'
  },
  stink: {
    pa: 'stunk'
  },
  strew: {
    pa: 'strewn'
  },
  sware: {
    pa: 'sworn'
  },
  sweep: {
    pa: 'swept'
  },
  thrive: {
    pa: 'thrived'
  },
  undergo: {
    pa: 'undergone'
  },
  upset: {
    pa: 'upset'
  },
  weave: {
    pa: 'woven'
  },
  weep: {
    pa: 'wept'
  },
  wind: {
    pa: 'wound'
  },
  wring: {
    pa: 'wrung'
  }
}

//swap-in better tag keys, accumulate all words for lexicon
let lex = {}
let keys = Object.keys(irreg)
for (let i = 0; i < keys.length; i++) {
  let newObj = {}
  let inf = keys[i]
  let tags = Object.keys(irreg[inf])
  for (let o = 0; o < tags.length; o++) {
    let newTag = mapping[tags[o]]
    let str = irreg[inf][tags[o]]
    newObj[newTag] = str
    lex[str] = newTag
  }
  lex[inf] = 'Infinitive'
  irreg[inf] = newObj
}
module.exports = {
  lexicon: lex,
  irregulars: irreg
}
