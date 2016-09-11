//a list of exceptions to the verb rules
const irregular_verbs = {
  take: {
    PerfectTense: 'have taken',
    pluPerfectTense: 'had taken',
    FuturePerfect: 'will have taken'
  },
  can: {
    Gerund: '',
    PresentTense: 'can',
    PastTense: 'could',
    FutureTense: 'can',
    PerfectTense: 'could',
    pluPerfectTense: 'could',
    FuturePerfect: 'can',
    Actor: ''
  },
  free: {
    Gerund: 'freeing',
    Actor: ''
  },
  arise: {
    PastTense: 'arose',
    Participle: 'arisen'
  },
  babysit: {
    PastTense: 'babysat',
    Actor: 'babysitter'
  },
  be: { // this is crazy-hard and shouldn't be here
    PastTense: 'been',
    Participle: 'been',
    PresentTense: 'is',
    // FutureTense: 'will be',
    Actor: '',
    Gerund: 'am'
  },
  is: {
    PastTense: 'was',
    PresentTense: 'is',
    // FutureTense: 'will be',
    // PerfectTense: 'have been',
    // pluPerfectTense: 'had been',
    // FuturePerfect: 'will have been',
    Actor: '',
    Gerund: 'being'
  },
  beat: {
    Gerund: 'beating',
    Actor: 'beater'
  },
  begin: {
    Gerund: 'beginning',
    PastTense: 'began'
  },
  bet: {
    Actor: 'better'
  },
  bind: {
    PastTense: 'bound'
  },
  bite: {
    Gerund: 'biting',
    PastTense: 'bit'
  },
  bleed: {
    PastTense: 'bled'
  },
  break: {
    PastTense: 'broke'
  },
  breed: {
    PastTense: 'bred'
  },
  bring: {
    PastTense: 'brought'
  },
  broadcast: {
    PastTense: 'broadcast'
  },
  build: {
    PastTense: 'built'
  },
  buy: {
    PastTense: 'bought'
  },
  catch: {
    PastTense: 'caught'
  },
  choose: {
    Gerund: 'choosing',
    PastTense: 'chose'
  },
  cost: {
    PastTense: 'cost'
  },
  deal: {
    PastTense: 'dealt'
  },
  die: {
    PastTense: 'died',
    Gerund: 'dying',
  },
  dig: {
    Gerund: 'digging',
    PastTense: 'dug'
  },
  do: {
    PastTense: 'did',
    PresentTense: 'does'
  },
  draw: {
    PastTense: 'drew'
  },
  drink: {
    PastTense: 'drank',
    Participle: 'drunk'
  },
  drive: {
    Gerund: 'driving',
    PastTense: 'drove'
  },
  eat: {
    Gerund: 'eating',
    PastTense: 'ate',
    Actor: 'eater',
    Participle: 'eaten'
  },
  fall: {
    PastTense: 'fell'
  },
  feed: {
    PastTense: 'fed'
  },
  feel: {
    PastTense: 'felt',
    Actor: 'feeler'
  },
  fight: {
    PastTense: 'fought'
  },
  find: {
    PastTense: 'found'
  },
  fly: {
    PastTense: 'flew',
    Participle: 'flown'
  },
  blow: {
    PastTense: 'blew',
    Participle: 'blown'
  },
  forbid: {
    PastTense: 'forbade'
  },
  forget: {
    Gerund: 'forgeting',
    PastTense: 'forgot'
  },
  forgive: {
    Gerund: 'forgiving',
    PastTense: 'forgave'
  },
  freeze: {
    Gerund: 'freezing',
    PastTense: 'froze'
  },
  get: {
    PastTense: 'got'
  },
  give: {
    Gerund: 'giving',
    PastTense: 'gave'
  },
  go: {
    PastTense: 'went',
    PresentTense: 'goes'
  },
  hang: {
    PastTense: 'hung'
  },
  have: {
    Gerund: 'having',
    PastTense: 'had',
    PresentTense: 'has'
  },
  hear: {
    PastTense: 'heard'
  },
  hide: {
    PastTense: 'hid'
  },
  hold: {
    PastTense: 'held'
  },
  hurt: {
    PastTense: 'hurt'
  },
  lay: {
    PastTense: 'laid'
  },
  lead: {
    PastTense: 'led'
  },
  leave: {
    PastTense: 'left'
  },
  lie: {
    Gerund: 'lying',
    PastTense: 'lay'
  },
  light: {
    PastTense: 'lit'
  },
  lose: {
    Gerund: 'losing',
    PastTense: 'lost'
  },
  make: {
    PastTense: 'made'
  },
  mean: {
    PastTense: 'meant'
  },
  meet: {
    Gerund: 'meeting',
    PastTense: 'met',
    Actor: 'meeter'
  },
  pay: {
    PastTense: 'paid'
  },
  read: {
    PastTense: 'read'
  },
  ring: {
    PastTense: 'rang'
  },
  rise: {
    PastTense: 'rose',
    Gerund: 'rising',
    pluPerfectTense: 'had risen',
    FuturePerfect: 'will have risen'
  },
  run: {
    Gerund: 'running',
    PastTense: 'ran'
  },
  say: {
    PastTense: 'said'
  },
  see: {
    PastTense: 'saw'
  },
  sell: {
    PastTense: 'sold'
  },
  shine: {
    PastTense: 'shone'
  },
  shoot: {
    PastTense: 'shot'
  },
  show: {
    PastTense: 'showed'
  },
  sing: {
    PastTense: 'sang',
    Participle: 'sung'
  },
  sink: {
    PastTense: 'sank',
    pluPerfectTense: 'had sunk'
  },
  sit: {
    PastTense: 'sat'
  },
  slide: {
    PastTense: 'slid'
  },
  speak: {
    PastTense: 'spoke',
    PerfectTense: 'have spoken',
    pluPerfectTense: 'had spoken',
    FuturePerfect: 'will have spoken'
  },
  spin: {
    Gerund: 'spinning',
    PastTense: 'spun'
  },
  spread: {
    PastTense: 'spread'
  },
  stand: {
    PastTense: 'stood'
  },
  steal: {
    PastTense: 'stole',
    Actor: 'stealer'
  },
  stick: {
    PastTense: 'stuck'
  },
  sting: {
    PastTense: 'stung'
  },
  stream: {
    Actor: 'streamer'
  },
  strike: {
    Gerund: 'striking',
    PastTense: 'struck'
  },
  swear: {
    PastTense: 'swore'
  },
  swim: {
    PastTense: 'swam'
  },
  swing: {
    PastTense: 'swung'
  },
  teach: {
    PastTense: 'taught',
    PresentTense: 'teaches'
  },
  tear: {
    PastTense: 'tore'
  },
  tell: {
    PastTense: 'told'
  },
  think: {
    PastTense: 'thought'
  },
  understand: {
    PastTense: 'understood'
  },
  wake: {
    PastTense: 'woke'
  },
  wear: {
    PastTense: 'wore'
  },
  win: {
    Gerund: 'winning',
    PastTense: 'won'
  },
  withdraw: {
    PastTense: 'withdrew'
  },
  write: {
    Gerund: 'writing',
    PastTense: 'wrote'
  },
  tie: {
    Gerund: 'tying',
    PastTense: 'tied'
  },
  ski: {
    PastTense: 'skiied'
  },
  boil: {
    Actor: 'boiler'
  },
  miss: {
    PresentTense: 'miss'
  },
  act: {
    Actor: 'actor'
  },
  compete: {
    Gerund: 'competing',
    PastTense: 'competed',
    Actor: 'competitor'
  },
  being: {
    Gerund: 'are',
    PastTense: 'were',
    PresentTense: 'are'
  },
  imply: {
    PastTense: 'implied',
    PresentTense: 'implies'
  },
  ice: {
    Gerund: 'icing',
    PastTense: 'iced'
  },
  develop: {
    PastTense: 'developed',
    Actor: 'developer',
    Gerund: 'developing'
  },
  wait: {
    Gerund: 'waiting',
    PastTense: 'waited',
    Actor: 'waiter'
  },
  aim: {
    Actor: 'aimer'
  },
  spill: {
    PastTense: 'spilt'
  },
  drop: {
    Gerund: 'dropping',
    PastTense: 'dropped'
  },
  log: {
    Gerund: 'logging',
    PastTense: 'logged'
  },
  rub: {
    Gerund: 'rubbing',
    PastTense: 'rubbed'
  },
  smash: {
    PresentTense: 'smashes'
  },
  suit: {
    Gerund: 'suiting',
    PastTense: 'suited',
    Actor: 'suiter'
  },

  'arise': {
    Participle: 'arisen'
  },
  'beat': {
    Participle: 'beaten'
  },
  'become': {
    Participle: 'become'
  },
  'begin': {
    Participle: 'begun'
  },
  'bend': {
    Participle: 'bent'
  },
  'bet': {
    Participle: 'bet'
  },
  'bite': {
    Participle: 'bitten'
  },
  'bleed': {
    Participle: 'bled'
  },
  'brake': {
    Participle: 'broken'
  },
  'bring': {
    Participle: 'brought'
  },
  'build': {
    Participle: 'built'
  },
  'burn': {
    Participle: 'burned'
  },
  'burst': {
    Participle: 'burst'
  },
  'bought': {
    Participle: 'bought'
  },
  'caught': {
    Participle: 'caught'
  },
  'choose': {
    Participle: 'chosen'
  },
  'cling': {
    Participle: 'clung'
  },
  'come': {
    Participle: 'come'
  },
  'creep': {
    Participle: 'crept'
  },
  'cut': {
    Participle: 'cut'
  },
  'deal': {
    Participle: 'dealt'
  },
  'dig': {
    Participle: 'dug'
  },
  'dive': {
    Participle: 'dived'
  },
  'do': {
    Participle: 'done'
  },
  'draw': {
    Participle: 'drawn'
  },
  'dream': {
    Participle: 'dreamt'
  },
  'drive': {
    Participle: 'driven'
  },
  'eat': {
    Participle: 'eaten'
  },
  'fall': {
    Participle: 'fallen'
  },
  'feed': {
    Participle: 'fed'
  },
  'fight': {
    Participle: 'fought'
  },
  'flee': {
    Participle: 'fled'
  },
  'fling': {
    Participle: 'flung'
  },
  'forgot': {
    Participle: 'forgotten'
  },
  'forgive': {
    Participle: 'forgiven'
  },
  'freeze': {
    Participle: 'frozen'
  },
  'got': {
    Participle: 'gotten'
  },
  'give': {
    Participle: 'given'
  },
  'go': {
    Participle: 'gone'
  },
  'grow': {
    Participle: 'grown'
  },
  'hang': {
    Participle: 'hung'
  },
  'have': {
    Participle: 'had'
  },
  'hear': {
    Participle: 'heard'
  },
  'hide': {
    Participle: 'hidden'
  },
  'hit': {
    Participle: 'hit'
  },
  'hold': {
    Participle: 'held'
  },
  'hurt': {
    Participle: 'hurt'
  },
  'keep': {
    Participle: 'kept'
  },
  'kneel': {
    Participle: 'knelt'
  },
  'know': {
    Participle: 'known'
  },
  'lay': {
    Participle: 'laid'
  },
  'lead': {
    Participle: 'led'
  },
  'leap': {
    Participle: 'leapt'
  },
  'leave': {
    Participle: 'left'
  },
  'lend': {
    Participle: 'lent'
  },
  'light': {
    Participle: 'lit'
  },
  'loose': {
    Participle: 'lost'
  },
  'make': {
    Participle: 'made'
  },
  'mean': {
    Participle: 'meant'
  },
  'meet': {
    Participle: 'met'
  },
  'pay': {
    Participle: 'paid'
  },
  'prove': {
    Participle: 'proven'
  },
  'put': {
    Participle: 'put'
  },
  'quit': {
    Participle: 'quit'
  },
  'read': {
    Participle: 'read'
  },
  'ride': {
    Participle: 'ridden'
  },
  'ring': {
    Participle: 'rung'
  },
  'rise': {
    Participle: 'risen'
  },
  'run': {
    Participle: 'run'
  },
  'say': {
    Participle: 'said'
  },
  'see': {
    Participle: 'seen'
  },
  'seek': {
    Participle: 'sought'
  },
  'sell': {
    Participle: 'sold'
  },
  'send': {
    Participle: 'sent'
  },
  'set': {
    Participle: 'set'
  },
  'sew': {
    Participle: 'sewn'
  },
  'shake': {
    Participle: 'shaken'
  },
  'shave': {
    Participle: 'shaved'
  },
  'shine': {
    Participle: 'shone'
  },
  'shoot': {
    Participle: 'shot'
  },
  'shut': {
    Participle: 'shut'
  },
  'sing': {
    Participle: 'sung'
  },
  'sink': {
    Participle: 'sunk'
  },
  'seat': {
    Participle: 'sat'
  },
  'slay': {
    Participle: 'slain'
  },
  'sleep': {
    Participle: 'slept'
  },
  'slide': {
    Participle: 'slid'
  },
  'sneak': {
    Participle: 'snuck'
  },
  'speak': {
    Participle: 'spoken'
  },
  'speed': {
    Participle: 'sped'
  },
  'spend': {
    Participle: 'spent'
  },
  'spill': {
    Participle: 'spilled'
  },
  'spin': {
    Participle: 'spun'
  },
  'spit': {
    Participle: 'spat'
  },
  'split': {
    Participle: 'split'
  },
  'spread': {
    Participle: 'spread'
  },
  'spring': {
    Participle: 'sprung'
  },
  'stand': {
    Participle: 'stood'
  },
  'steal': {
    Participle: 'stolen'
  },
  'stick': {
    Participle: 'stuck'
  },
  'sting': {
    Participle: 'stung'
  },
  'stink': {
    Participle: 'stunk'
  },
  'strew': {
    Participle: 'strewn'
  },
  'strike': {
    Participle: 'struck'
  },
  'sware': {
    Participle: 'sworn'
  },
  'sweep': {
    Participle: 'swept'
  },
  'swim': {
    Participle: 'swum'
  },
  'swing': {
    Participle: 'swung'
  },
  'take': {
    Participle: 'taken'
  },
  'teach': {
    Participle: 'taught'
  },
  'tear': {
    Participle: 'torn'
  },
  'tell': {
    Participle: 'told'
  },
  'think': {
    Participle: 'thought'
  },
  'thrive': {
    Participle: 'thrived'
  },
  'throw': {
    Participle: 'thrown'
  },
  'undergo': {
    Participle: 'undergone'
  },
  'understand': {
    Participle: 'understood'
  },
  'upset': {
    Participle: 'upset'
  },
  'wake': {
    Participle: 'woken'
  },
  'wear': {
    Participle: 'worn'
  },
  'weave': {
    Participle: 'woven'
  },
  'weep': {
    Participle: 'wept'
  },
  'win': {
    Participle: 'won'
  },
  'wind': {
    Participle: 'wound'
  },
  'withdraw': {
    Participle: 'withdrawn'
  },
  'wring': {
    Participle: 'wrung'
  },
  'write': {
    Participle: 'written'
  }

};

module.exports = irregular_verbs;
